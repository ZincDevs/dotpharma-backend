/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import workerfarm from 'worker-farm';
import User from '../database/models/User';
import { STATUSES } from '../constants/ResponseStatuses';
import { genPass, sendEmail } from '../utils/appUtils';
import { MESSAGES } from '../constants/ResponceMessages';
import { sendVerification } from '../workers';

const UserController = {
  login: async (req, res) => {
    const data = [req.body.email, req.body.password];
    User.login(data)
      .then((results) => {
        if (results.user) {
          res.status(200).send({
            token: results.token,
            status: 200,
            message: results.message,
            user: results.user.rows,
          });
        } else {
          res.status(401).send({
            status: 401,
            ...results,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          status: 400,
          error: err,
        });
      });
  },
  createUser: async (req, res) => {
    const pass = genPass();
    const data = [
      uuid(),
      req.body.email,
      pass,
      req.body.role,
      moment(new Date()),
      'valid',
    ];
    const doctorData = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.speciality,
      req.body.clinic,
      req.body.image,
      '1',
      moment(new Date()),
      req.user.u_id,
    ];

    User.create(data, doctorData)
      .then((results) => {
        if (results.user) {
          res.status(STATUSES.CREATED).send({
            token: results.token,
            status: STATUSES.CREATED,
            user: results.user.rows,
            doctor: results.doctor.data,
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
  signup: async (req, res, next) => {
    const data = [
      uuid(),
      req.body.email,
      genPass(false, req.body.password),
      req.body.role.toUpperCase(),
      moment(new Date()),
      'invalid',
    ];
    User.create(data)
      .then(({ user, token, message }) => {
        if (user) {
          sendVerification({ email: req.body.email, token }, () => {
            workerfarm.end(sendVerification);
          });
          res.status(STATUSES.CREATED).send({
            status: STATUSES.CREATED,
            message,
            token
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message,
          });
        }
      })
      .catch((e) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: e,
        });
      });
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
  sendMail: async (req, res) => {
    try {
      const mailRes = await sendEmail(
        req.user.u_email,
        'Dotpharma notification',
        'Dear patient, please click <a href="">here</a> to activate your account your account',
        'Dotpharma signup'
      );
    } catch (error) {
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: error.message,
      });
    }
  },
};

export default UserController;
