import 'regenerator-runtime';
import { v4 as uuid } from "uuid";
import moment from "moment";
import Patient from "../database/models/Patient";
import { STATUSES } from "../constants/ResponseStatuses";
import { getPagination } from "../utils/appUtils";
import { result } from "lodash";

const PatientController = {
  createNew: async (req, res) => {
    const patientPayload = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.country,
      req.body.town,
      req.body.city,
      req.body.street,
      req.body.nid,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    Patient.create(patientPayload)
      .then((response) => {
        if (response.patient) {
          res.status(STATUSES.CREATED).send({
            status: STATUSES.CREATED,
            message: response.message,
            patient: response.patient,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
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
    const patientPayload = [
      req.params.pid,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.country,
      req.body.town,
      req.body.city,
      req.body.street,
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    Patient.update(patientPayload)
      .then((response) => {
        if (response.patient) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            patient: response.patient,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
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
  findAll: async (req, res) => {
    const { limit, offset } = getPagination(
      req.query.page ? req.query.page : 1,
      20
    );
    Patient.findAll([limit, offset])
      .then((result) => {
        if (result.patients) {
          res.status(STATUSES.OK).send({
            message: result.message,
            patient: result.patients,
            page: { limit, offset },
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: result.message,
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
  deletePatient: async (req, res) => {
    Patient.destroy(req.params.pid)
      .then((result) => {
        if (result.patient) {
          res.status(STATUSES.OK).send({
            message: result.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: result.message,
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
  findById: async (req, res) => {
    Patient.findById(req.params.pid)
      .then((result) => {
        if (result.patient) {
          res.status(STATUSES.OK).send({
            patient: result.patient,
            message: result.message,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: result.message,
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
};

export default PatientController;
