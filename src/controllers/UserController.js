/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Jwt } from 'jsonwebtoken';
import { STATUSES } from '../constants/ResponseStatuses';
import {
  generatePassword, getErrorMessage, generateToken, decodeToken
} from '../helpers';
import { MESSAGES } from '../constants/ResponceMessages';
import { sendVerification } from '../services';
import { User, Doctor } from '../db/models';
import { serverConfig } from '../config';

const { httpOnlyCookieOptions: cookieOptions } = serverConfig;
const UserController = {
  login: async (req, res) => {
    const { user: { u_id, u_email, u_role } } = req;
    const userData = { u_id, u_email, u_role };
    const access_token = await generateToken(userData);
    const refresh_token = await generateToken(userData, '1d');
    await User.update({ refresh_token }, { where: { u_email } });
    res
      .cookie('jwt', refresh_token, { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
      .json({ access_token, userData });
  },
  refreshToken: async (req, res) => {
    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refresh_token = cookies.jwt;
    let user = await User.findOne({ where: { refresh_token } });
    user = user?.dataValues;
    if (!user) return res.sendStatus(403);
    const { u_id, u_email, u_role } = await decodeToken(refresh_token);
    if (!u_email) return res.sendStatus(403);
    const userData = { u_id, u_email, u_role };
    const access_token = await generateToken(userData);
    res.json({ access_token });
  },
  logout: async (req, res) => {
    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refresh_token = cookies.jwt;
    let result = await User.findOne({ where: { refresh_token } });
    result = result?.dataValues;
    const { u_email } = result;
    if (!u_email) {
      res.clearCookie('jwt', { ...cookieOptions });
      return res.sendStatus(204);
    }
    await User.update({ refresh_token: null }, { where: { u_email } });
    res
      .clearCookie('jwt', { ...cookieOptions })
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
    const verify_token = await generateToken({ u_email: newUser.u_email }, '5m');
    sendVerification({ email: req.body.email, token: verify_token });
    res.sendStatus(201);
  },
  findAll: async (req, res) => {
    const data = [req.query.page ? req.query.page : 1, 20];
    User.findAll(data)
      .then((results) => {
        if (results.users) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            users: results.users,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: MESSAGES.NOT_CONTENT,
          });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
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
  resetPassword: async (req, res) => {
    const data = [req.body.uid, req.body.oldpassword, req.body.newpassword];
    User.resetPassword(data)
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
  validateUserAccount: async (req, res) => {
    const { u_id } = req.user;
    User.activateUser(u_id)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: 'Account has been activated',
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            error: getErrorMessage('email', 'Account not activated')
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
  resendVerification: async (req, res) => {
    try {
      const token = await generateToken({
        email: req.body.email
      }, '5m');
      sendVerification({ email: req.body.email, token });
      res.status(STATUSES.OK).send({
        status: STATUSES.OK,
        message: 'Verification is sent',
      });
    } catch (e) {
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: e.message,
      });
    }
  },
};

export default UserController;
