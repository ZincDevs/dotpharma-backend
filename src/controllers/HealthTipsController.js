import 'regenerator-runtime';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import HealthTips from '../database/models/HealthTips';
import { STATUSES } from '../constants/ResponseStatuses';
import { getPagination } from '../helpers';

const HealthTipController = {
  create: async (req, res) => {
    const data = [
      uuid(),
      req.body.title,
      req.body.image,
      req.body.category,
      req.body.content,
      moment(new Date()),
      req.body.uid,
    ];
    HealthTips.create(data)
      .then((result) => {
        if (result.tip) {
          res.status(STATUSES.CREATED).send({
            status: STATUSES.CREATED,
            messages: result.message,
            tip: result.tip,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            messages: result.message,
          });
        }
      })
      .catch((error) => {
        res.status(STATUSES.SERVERERROR).send({
          status: STATUSES.SERVERERROR,
          message: error.message,
          data: null,
        });
      });
  },
  update: async (req, res) => {
    const data = [
      req.params.hid,
      req.body.title,
      req.body.image,
      req.body.category,
      moment(new Date()),
      req.body.userid,
      req.body.content,
    ];
    HealthTips.update(data)
      .then((result) => {
        if (result.tip) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            messages: result.message,
            tip: result.tip,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            messages: result.message,
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
  delete: async (req, res) => {
    HealthTips.destroy(req.params.hid)
      .then((result) => {
        if (result.tip) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            messages: result.message,
          });
        } else {
          res.status(STATUSES.BAD_REQUEST).send({
            status: STATUSES.BAD_REQUEST,
            messages: result.message,
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
    HealthTips.findAll([limit, offset])
      .then((result) => {
        if (result.tip) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            messages: result.message,
            tips: result.tip,
            page: { limit, offset },
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            messages: result.message,
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
    HealthTips.findById(req.params.hid)
      .then((result) => {
        if (result.tip) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            messages: result.message,
            tips: result.tip,
          });
        } else {
          res.status(STATUSES.NO_CONTENT).send({
            status: STATUSES.NO_CONTENT,
            messages: result.message,
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

export default HealthTipController;
