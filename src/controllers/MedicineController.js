import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Medicine from '../database/models/Medicine';
import { STATUSES } from '../constants/ResponseStatuses';

const MedicineController = {
  createMedicine: async (req, res) => {
    const data = [
      uuid(),
      req.body.name,
      req.body.properties,
      req.body.description,
      req.body.image,
      req.body.price,
      '1',
      req.body.type,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      req.user.u_id,
    ];
    Medicine.create(data)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  },
  updateMedicine: async (req, res) => {
    const data = [
      req.body.name,
      req.body.properties,
      req.body.description,
      req.body.image,
      req.body.price,
      req.body.type,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      req.user.u_id,
      req.params.mid,
    ];
    Medicine.update(data)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  },
  findAll: async (req, res) => {
    Medicine.findAll()
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
        });
      });
  },
  deleteMedicine: async (req, res) => {
    Medicine.destroy(req.params.mid)
      .then((response) => {
        res.status(response.status).send({
          status: response.status,
          message: response.message,
          data: response.data,
        });
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        });
      });
  },
  getMedsInPharma: async (req, res) => {
    Medicine.getMedicinesInPharmacy(req.params.phid).then((response) => {
      res.status(response.status).send({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    }).catch((error) => {
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: error.message,
      });
    });
  },
};

export default MedicineController;
