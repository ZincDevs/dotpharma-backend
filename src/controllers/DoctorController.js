import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Doctor from '../database/models/Doctor';
import { STATUSES } from '../constants/ResponseStatuses';

const DoctorController = {
  createNew: async (req, res) => {
    const data = [
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
    Doctor.create(data).then((response) => {
      res.status(response.status).send(
        {
          status: response.status,
          message: response.message,
          data: response.data,
        },
      );
    }).catch((error) => {
      res.status(STATUSES.SERVERERROR).send(
        {
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        },
      );
    });
  },
  updateDoctor: async (req, res) => {
    const data = [
      req.body.name,
      req.body.email,
      req.body.speciality,
      req.body.clinic,
      req.body.image,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      req.user.u_id,
      req.body.phone,
      req.params.did,
    ];
    Doctor.update(data).then((response) => {
      res.status(response.status).send(
        {
          status: response.status,
          message: response.message,
          data: response.data,
        },
      );
    }).catch((error) => {
      res.status(STATUSES.SERVERERROR).send(
        {
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        },
      );
    });
  },
  findAll: async (req, res) => {
    Doctor.findAll().then((response) => {
      res.status(response.status).send({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    }).catch((error) => {
      res.status(STATUSES.SERVERERROR).send(
        {
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        },
      );
    });
  },
  deleteDoctor: async (req, res) => {
    Doctor.destroy(req.params.did).then((response) => {
      res.status(response.status).send(
        {
          status: response.status,
          message: response.message,
          data: response.data,
        },
      );
    }).catch((error) => {
      res.status(STATUSES.SERVERERROR).send(
        {
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        },
      );
    });
  },
};

export default DoctorController;
