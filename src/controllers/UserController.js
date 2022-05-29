/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { STATUSES } from '../constants/ResponseStatuses';
import {
  generatePassword,
  getErrorMessage,
  decodeJWT,
  generateRefreshToken,
  generateAccessToken,
  generateUserVerificationToken,
  generatePasswordResetToken,
} from '../helpers';
import { sendVerification, sendPasswordResetConfirmation } from '../services';
import {
  User, Doctor, Patient, Order, Cart, Medicine
} from '../db/models';
import { serverConfig } from '../config';

const { httpOnlyCookieOptions: cookieOptions } = serverConfig;
dotenv.config();
const UserController = {
  login: async (req, res) => {
    const { user: { u_id, u_email, u_role } } = req;
    const userData = { u_id, u_email, u_role };
    const access_token = await generateAccessToken(userData);
    const refresh_token = await generateRefreshToken(userData);
    const result = await User.update({ refresh_token }, { where: { u_email } });
    if (!result.includes(1)) {
      return res.sendStatus(500);
    }
    res
      .cookie('refresh_token', refresh_token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
      .json({ access_token, userData });
  },
  googleAuth: async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    const client = new OAuth2Client(process.env.OAUTH2_CLIENT_ID);
    client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH2_CLIENT_ID
    }, async (err, result) => {
      if (err || !result) return res.senStatus(403);
      const {
        payload: {
          email, email_verified, jti, name,
        }
      } = result;
      // Check if user exist or not
      let user = await User.findOne({ where: { u_email: email } });
      user = user?.dataValues;
      // If user does not exist, the create em
      if (!user) {
        const userObject = {
          u_id: uuid(),
          u_email: email,
          u_password: jti,
          u_role: 'PATIENT',
          verified: email_verified,
          blocked: false,
        };
        user = await User.create(userObject);
        user = user?.dataValues;
        if (!user) return res.sendStatus(500);
        const patientObject = {
          p_id: uuid(),
          p_name: name,
          p_email: user.u_email,
          u_id: user.u_id,
        };
        await Patient.create(patientObject);
      }
      const { u_id, u_email, u_role } = user;
      const userData = { u_id, u_email, u_role };
      const access_token = await generateAccessToken(userData);
      const refresh_token = await generateRefreshToken(userData);
      await User.update({ refresh_token }, { where: { u_email } });
      res
        .cookie('refresh_token', refresh_token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
        .json({ access_token, userData });
    });
  },
  refreshToken: async (req, res) => {
    const { cookies } = req;
    if (!cookies?.refresh_token) return res.sendStatus(401);
    const refresh_token = cookies.refresh_token;
    let user = await User.findOne({ where: { refresh_token } });
    user = user?.dataValues;
    if (!user) return res.sendStatus(403);
    decodeJWT(refresh_token, async (err, decoded) => {
      if (err || !decoded?.u_email || decoded?.u_email !== user.u_email) return res.sendStatus(403);
      const access_token = await generateAccessToken({ u_email: decoded?.u_email });
      res.json({
        access_token,
        userData: {
          u_id: user?.u_id,
          u_email: user?.u_email,
          u_role: user?.u_role,
        }
      });
    });
  },
  logout: async (req, res) => {
    const { cookies } = req;
    if (!cookies?.refresh_token) return res.sendStatus(204);
    const refresh_token = cookies.refresh_token;
    let result = await User.findOne({ where: { refresh_token } });
    result = result?.dataValues;
    const u_email = result?.email;
    if (!u_email) {
      res.clearCookie('refresh_token', { ...cookieOptions });
      return res.sendStatus(204);
    }
    await User.update({ refresh_token: null }, { where: { u_email } });
    res
      .clearCookie('refresh_token', { ...cookieOptions })
      .sendStatus(204);
  },
  createUser: async (req, res) => {
    const { authUser, body } = req;
    const password = generatePassword();
    const userObject = {
      u_id: uuid(),
      u_email: body.email,
      u_password: password,
      u_role: body.role.toUpperCase(),
      verified: false,
      blocked: false,
    };
    let newUser = await User.create(userObject);
    newUser = newUser?.dataValues;
    if (!newUser) return res.sendStatus(500);
    const doctorObject = {
      d_id: uuid(),
      d_name: body.name,
      d_email: body.email,
      d_phone: body.phone,
      d_speciality: body.speciality,
      d_clinic: body.clinic,
      d_image: body.image,
      u_id: newUser.u_id,
      creator: authUser.u_id
    };
    let newDoctor = await Doctor.create(doctorObject);
    newDoctor = newDoctor?.dataValues;
    if (!newDoctor) return res.sendStatus(500);
    res.sendStatus(201);
  },
  signup: async (req, res) => {
    const { body } = req;
    const userObject = {
      u_id: uuid(),
      u_email: body.email,
      u_password: generatePassword(false, body.password),
      u_role: body.role.toUpperCase(),
      verified: false,
      blocked: false,
    };
    let newUser = await User.create(userObject);
    newUser = newUser?.dataValues;
    if (!newUser) return res.sendStatus(500);
    if (newUser.u_role === 'PATIENT') {
      const patientObject = {
        p_id: uuid(),
        p_email: newUser.u_email,
        u_id: newUser.u_id,
      };
      await Patient.create(patientObject);
    }
    const verify_token = await generateUserVerificationToken({ u_email: newUser.u_email });
    sendVerification({ email: req.body.email, token: verify_token });
    res.sendStatus(201);
  },
  verifyUserAccount: async (req, res) => {
    const { u_id, u_email, u_role } = req.authUser;
    const result = await User.update({ verified: true }, { where: { u_id } });
    if (!result.includes(1)) {
      return res.status(500).json({
        error: getErrorMessage('email', 'Account not activated')
      });
    }
    const userData = { u_id, u_email, u_role };
    const access_token = await generateAccessToken(userData);
    const refresh_token = await generateRefreshToken(userData);
    res
      .cookie('refresh_token', refresh_token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
      .json({ access_token, userData });
  },
  resendVerification: async (req, res) => {
    const { email: u_email } = req.body;
    const verify_token = await generateUserVerificationToken({ u_email });
    sendVerification({ email: req.body.email, token: verify_token });
    res.json({
      message: 'Verification is sent',
    });
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const users = await User.findAll({
      attributes: ['u_id', 'u_email', 'u_role', 'verified', 'blocked', 'updatedAt', 'createdAt'],
      include: [{ model: Patient, as: 'patients' }, { model: Doctor, as: 'doctors' }],
      limit,
      offset
    });
    res.status(200).json({
      users,
    });
  },
  findOne: async (req, res) => {
    const { params: { u_id } } = req;
    let user = await User.findOne({
      where: { u_id },
      attributes: ['u_id', 'u_email', 'u_role', 'verified', 'blocked', 'updatedAt', 'createdAt'],
      include: [
        { model: Patient, as: 'patients' },
        { model: Doctor, as: 'doctors' },
      ],
    });
    user = user.dataValues;
    if (!user) return res.sendStatus(204);
    res.json({
      user,
    });
  },
  getMyProfile: async (req, res) => {
    try {
      const { authUser: { u_id } } = req;
      let user = await User.findOne({
        where: { u_id },
        attributes: ['u_id', 'u_email', 'u_role', 'verified', 'blocked', 'updatedAt', 'createdAt'],
        include: [
          { model: Cart, as: 'cart', include: [{ model: Medicine, as: 'medicine' }] },
          { model: Patient, as: 'patients' },
          { model: Doctor, as: 'doctors' },
          { model: Order, as: 'orders' },
        ],
      });
      user = user.dataValues;
      if (!user) return res.sendStatus(204);
      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res) => {
    const data = [
      req.params.uid,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.role,
      moment(new Date()),
    ];
    User.update(data)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            user: results.user.rows,
            message: results.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },
  destroy: async (req, res) => {
    User.destroy(req.params.uid)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: results.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: results.message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e.message,
        });
      });
  },

  // Password reset
  requestPasswordReset: async (req, res) => {
    const { u_email } = req.user;
    const passoword_reset_token = await generatePasswordResetToken({ u_email });
    sendPasswordResetConfirmation({ email: req.body.email, token: passoword_reset_token });
    res.json({
      message: 'Password reset confirmation is sent',
    });
  },
  confirmPasswordReset: async (req, res) => {
    const { u_email } = req.user;
    let { password: u_password, confirm } = req.body;
    if (u_password !== confirm) return res.sendStatus(400);
    u_password = generatePassword(false, u_password);
    const result = await User.update({ u_password }, { where: { u_email } });
    if (!result.includes(1)) {
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  },
  resendPasswordReset: async (req, res) => {
    const { u_email } = req.user;
    const passoword_reset_token = await generatePasswordResetToken({ u_email });
    sendPasswordResetConfirmation({ email: req.body.email, token: passoword_reset_token });
    res.json({
      message: 'Password reset confirmation is sent',
    });
  },
};

export default UserController;
