/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import { v4 as uuid } from "uuid";
import moment from "moment";
import Appointment from "../database/models/Appointment";
import { STATUSES } from "../constants/ResponseStatuses";
import { getPagination } from "../utils/appUtils";

const AppointmentController = {
  createAppointment: async (req, res) => {
    try {
      const data = [
        uuid(),
        req.body.patid,
        req.body.docid,
        req.body.deasese,
        moment(new Date()),
        "pending",
      ];
      const createRes = await Appointment.create(data);
      if(createRes.data){
        res.status(STATUSES.CREATED).send({
          status: STATUSES.CREATED,
          message: createRes.message,
          data: createRes.data,
        });
      }else {
        res.status(STATUSES.BAD_REQUEST).send({
          status: STATUSES.BAD_REQUEST,
          message: createRes.message,
        });
      }
    } catch (e) {
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: e.message,
      });
    }
  },
  findAll: async (req, res) => {
    const { limit, offset } = getPagination(
      req.query.page ? req.query.page : 1,
      20
    );
    Appointment.findAll([limit, offset])
      .then((response) => {
        if (response.appointments) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            appointments: response.appointments,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: response.message,
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
  findApproved: async (req, res) => {
    const { limit, offset } = getPagination(
      req.query.page ? req.query.page : 1,
      20
    );
    Appointment.findApproved([limit, offset])
      .then((response) => {
        if (response.appointments) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            appointments: response.appointments,
          });
        } else {
          res.status(STATUSES.NOTFOUND).send({
            status: STATUSES.NO_CONTENT,
            message: response.message,
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
  findRejected: async (req, res) => {
    const { limit, offset } = getPagination(
      req.query.page ? req.query.page : 1,
      20
    );
    Appointment.findRejected([limit, offset])
      .then((response) => {
        if (response.appointments) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            appointments: response.appointments,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: response.message,
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
  reject: async (req, res) => {
    Appointment.reject(req.params.aid)
      .then((response) => {
        console.log(response.appointments)
        if (response.appointments) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
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
  approve: async (req, res) => {
    Appointment.approve(req.params.aid)
      .then((response) => {
        if (response.appointments) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            message: response.message,
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
};

export default AppointmentController;
