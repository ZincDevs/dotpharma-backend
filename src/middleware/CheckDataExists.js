import 'regenerator-runtime';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import db from '../database/connection/_query';
import { getOneById } from '../database/queries/pharmacy';
import { getById } from '../database/queries/medicine';
import { getById as getPatientById,getByEmailOrPhone } from '../database/queries/patient';
import { getDoctorById } from '../database/queries/doctor';
import { getById as getUserById } from '../database/queries/User';

export default {
  // Pharmacy exists
  checkPharmacyExists:async (req, res, next) => {
    db.query(getOneById, [req.body.phid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Pharmacy ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
  // Medicine exists
  checkMedicineExists:async (req, res, next) => {
    db.query(getById, [req.body.mid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Medicine ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },

  // Doctor exists
  checkDoctorExists:async (req, res, next) => {
    db.query(getDoctorById, [req.body.docid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Doctor ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
  // Patient exists
  checkPatientExists:async (req, res, next) => {
    db.query(getPatientById, [req.body.patid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `Patient ${MESSAGES.NOT_FOUND}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
  checkPatientExistsForCreate:async (req, res, next) => {
    db.query(getByEmailOrPhone, [req.body.email,req.body.phone])
      .then(({ rows }) => {
        if (rows.length === 0) {
          next();
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: `Patient ${MESSAGES.ALREDY_EXISTS}`,
          });
        }
      })
      .catch((err) => {
        res.status(STATUSES.SERVERERROR).send({
          error: err.message,
        });
      });
  },
  checkUserExists:async (req, res, next) => {
    db.query(getUserById, [req.body.uid])
      .then(({ rows }) => {
        if (rows.length > 0) {
          next();
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NOTFOUND,
            message: `User ${MESSAGES.NOT_FOUND}`,
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
