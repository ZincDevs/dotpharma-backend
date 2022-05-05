/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { STATUSES } from '../constants/ResponseStatuses';
import {
  generatePassword, getErrorMessage, generateToken, decodeToken, decodeJWT
} from '../helpers';
import { MESSAGES } from '../constants/ResponceMessages';
import { sendVerification } from '../services';
import { User, Doctor, Patient } from '../db/models';
import { serverConfig } from '../config';

const { httpOnlyCookieOptions: cookieOptions } = serverConfig;
const UserController = {
  login: async (req, res) => {
    const { user: { u_id, u_email, u_role } } = req;
    const userData = { u_id, u_email, u_role };
    const access_token = await generateToken({ ...userData, isAccessToken: true });
    const refresh_token = await generateToken({ ...userData, isRefreshToken: true }, '1h');
    const result = await User.update({ refresh_token }, { where: { u_email } });
    if (!result.includes(1)) {
      return res.sendStatus(500);
    }
    res
      .cookie('refresh_token', refresh_token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
      .json({ access_token, userData });
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
      const access_token = await generateToken({ u_email: decoded?.u_email });
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
    const { u_email } = result;
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
    const userObject = {
      u_id: uuid(),
      u_email: body.email,
      u_password: generatePassword(),
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
  signup: async (req, res, next) => {
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
    const verify_token = await generateToken({ u_email: newUser.u_email }, '5m');
    sendVerification({ email: req.body.email, token: verify_token });
    res.sendStatus(201);
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
  requestPasswordReset: async (req, res) => {
    // const { email: u_email } = req.body;
    // const verify_token = await generateToken({ u_email }, '5m');
    // sendVerification({ email: req.body.email, token: verify_token });
    // res.status(200).json({
    //   message: 'Verification is sent',
    // });
    // const data = [req.body.uid, req.body.oldpassword, req.body.newpassword];
    // User.resetPassword(data)
    //   .then((results) => {
    //     if (results.user) {
    //       res.status(STATUSES.OK).send({
    //         status: STATUSES.OK,
    //         message: results.message,
    //       });
    //     } else {
    //       res.status(STATUSES.BAD_REQUEST).send({
    //         status: STATUSES.BAD_REQUEST,
    //         message: results.message,
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     res.status(STATUSES.SERVERERROR).send({
    //       status: STATUSES.SERVERERROR,
    //       message: e.message,
    //     });
    //   });
  },
  validateUserAccount: async (req, res) => {
    const { u_id } = req.authUser;
    const result = await User.update({ verified: true }, { where: { u_id } });
    if (!result.include(1)) {
      return res.status(200).json({
        error: getErrorMessage('email', 'Account not activated')
      });
    }
    res.status(200).json({
      message: 'Account has been activated',
    });
  },
  resendVerification: async (req, res) => {
    const { email: u_email } = req.body;
    const verify_token = await generateToken({ u_email }, '5m');
    sendVerification({ email: req.body.email, token: verify_token });
    res.status(200).json({
      message: 'Verification is sent',
    });
  },
};

export default UserController;
