/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import 'regenerator-runtime';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import db from '../database/connection/_query';
import { User } from '../db/models';
import { getByEmail, checkExist, getById } from '../database/queries/User';
import { getErrorMessage } from '../helpers';

export default {
  // Supper user
  checkISAdmin: async (req, res, next) => {
    const { authUser } = req;
    if (authUser?.u_role === 'SUPER_ADMIN') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send({
        status: STATUSES.UNAUTHORIZED,
        error: getErrorMessage('login', MESSAGES.UNAUTHORIZED),
      });
    }
    // db.query(getByEmail, [email])
    //   .then(({ rows }) => {
    //     if (rows[0].u_role === 'SUPER_ADMIN') {
    //       next();
    //     } else {
    //       res.status(STATUSES.UNAUTHORIZED).send({
    //         status: STATUSES.UNAUTHORIZED,
    //         error: getErrorMessage('login', MESSAGES.UNAUTHORIZED),
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     res.status(STATUSES.BAD_REQUEST).send({
    //       error: err.message,
    //     });
    //   });
  },
  checkIsPatient: async (req, res, next) => {
    const { u_email } = req.user;
    db.query(getByEmail, [u_email])
      .then(({ rows }) => {
        if (rows[0].u_role === 'PATIENT') {
          next();
        } else {
          res.status(STATUSES.UNAUTHORIZED).send({
            status: STATUSES.UNAUTHORIZED,
            message: MESSAGES.UNAUTHORIZED,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.BAD_REQUEST).send({
          error: err.message,
        });
      });
  },
  chekIsDoctor: async (req, res, next) => {
    const { u_email } = req.user;
    db.query(getByEmail, [u_email])
      .then(({ rows }) => {
        if (rows[0].u_role === 'DOCTOR') {
          next();
        } else {
          res.status(STATUSES.UNAUTHORIZED).send({
            status: STATUSES.UNAUTHORIZED,
            message: MESSAGES.UNAUTHORIZED,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.BAD_REQUEST).send({
          error: err.message,
        });
      });
  },
  // check if user exists
  checkUserExists: async (req, res, next) => {
    const { email: u_email } = req.body;
    try {
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) {
        next();
      } else {
        res.status(409).send({
          error: getErrorMessage('email', 'Account already exists'),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkUserExists2: async (req, res, next) => {
    const { email: u_email } = req.body;
    try {
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(STATUSES.BAD_REQUEST).send({
          status: STATUSES.BAD_REQUEST,
          error: getErrorMessage('email', 'User email not exist'),
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  checkIsValidUser: async (req, res, next) => {
    const { u_id } = req.user;
    db.query(getById, [u_id])
      .then(({ rows }) => {
        if (rows[0].length > 0) {
          next();
        } else {
          res.status(STATUSES.UNAUTHORIZED).send({
            status: STATUSES.UNAUTHORIZED,
            message: MESSAGES.UNAUTHORIZED,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
};
