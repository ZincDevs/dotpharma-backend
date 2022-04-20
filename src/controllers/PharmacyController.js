/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import {v4 as uuid} from 'uuid';
import {MESSAGES} from '../constants/ResponceMessages';
import {STATUSES} from '../constants/ResponseStatuses';
import Pharmacy from '../database/models/Pharmacy';

const PharmacyController = {
  CreatePharmacy: async (req, res) => {
    const payload = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.website,
      req.body.address,
      '1',
      moment(new Date()),
      req.user.u_id,
    ];
    Pharmacy.create(payload)
      .then((response) => {
        if (response.status === STATUSES.CREATED) {
          res.status(STATUSES.CREATED).send({
            status: STATUSES.CREATED,
            message: response.message,
            data: response.data,
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
  updatePharmacy: async (req, res) => {
    const payload = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.website,
      req.body.address,
      moment(new Date()),
      req.user.u_id,
      req.params.phid,
    ];
    Pharmacy.update(payload)
      .then((response) => {
        if (response.status === STATUSES.OK) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            data: response.data,
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
  deletePharmacy: async (req, res) => {
    Pharmacy.destroy(req.params.pid)
      .then((response) => {
        if (response.status === STATUSES.OK) {
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
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  },
  findAll: async (req, res) => {
    Pharmacy.findAll()
      .then((response) => {
        if (response.status === STATUSES.OK) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            data: response.data,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            message: response.message,
            data: response.data,
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
  addMedicineToPharma: async (req, res) => {
    Pharmacy.addMedicineToPharmacy([req.body.phid, req.body.mid]).then((response)=>{
      res.status(response.status).send({
        status: response.status,
        message: response.message,
      });
    }).catch((error)=>{
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: error.message,
      });
    });
  }
};

export default PharmacyController;
