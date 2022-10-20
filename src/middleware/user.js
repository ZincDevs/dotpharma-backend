/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import 'regenerator-runtime';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import { User } from '../db/models';
import { getErrorMessage } from '../helpers';

export default {
  // Supper user
  checkISAdmin: async (req, res, next) => {
    const user = req.user || req.authUser;
    console.log(user);
    if (user?.u_role === 'SUPER_ADMIN') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send({
        status: STATUSES.UNAUTHORIZED,
        error: getErrorMessage('login', MESSAGES.UNAUTHORIZED),
      });
    }
  },
  checkIsPatient: async (req, res, next) => {
    const { authUser } = req;
    if (authUser?.u_role === 'PATIENT') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send({
        status: STATUSES.UNAUTHORIZED,
        error: getErrorMessage('login', MESSAGES.UNAUTHORIZED),
      });
    }
  },
  chekIsDoctor: async (req, res, next) => {
    const { authUser } = req;
    if (authUser?.u_role === 'DOCTOR') {
      next();
    } else {
      res.status(STATUSES.UNAUTHORIZED).send({
        status: STATUSES.UNAUTHORIZED,
        error: getErrorMessage('login', MESSAGES.UNAUTHORIZED),
      });
    }
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
};
