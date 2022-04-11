/* eslint-disable camelcase */
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import db from '../database/connection/_query';
import { getByEmail,checkExist ,getById} from '../database/queries/User';

export default {
  // Supper user
  checkISAdmin: async (req, res, next) => {
    const { u_email } = req.user;
    db.query(getByEmail, [u_email])
      .then(({ rows }) => {
        if (rows[0].u_role === 'SUPER_ADMIN') {
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
    const { email,phone } = req.body;
    db.query(checkExist, [email,phone])
      .then(({ rows }) => {
        if (rows.length==0) {
          next();
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: MESSAGES.ALREDY_EXISTS,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.BAD_REQUEST).send({
          error: err.message,
        });
      });
  },
  checkIsValidUser: async (req, res, next) => {
    const { u_id } = req.user;
    db.query(getById, [u_id])
      .then(({ rows }) => {
        if (rows[0].length>0) {
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
  }

};
