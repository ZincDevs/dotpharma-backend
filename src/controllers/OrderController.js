/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import Order from '../database/models/Order';
import { getPagination } from '../helpers';
import { sendEmail } from '../helpers/index';

const OrderController = {
  createNewOrder: async (req, res) => {
    try {
      const orderPayload = [
        uuid(),
        req.body.patid,
        req.body.phid,
        req.body.mid,
        req.body.prescription,
        moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        'Pending',
      ];
      const response = await Order.create(orderPayload);
      res.status(STATUSES.CREATED).send({
        status: STATUSES.CREATED,
        message: `Order ${MESSAGES.CREATED}`,
        data: response.data,
      });
      if (response.data) {
        const [emailSent] = await Promise.all([
          sendEmail(
            response.pharmacyEmail,
            'Dotpharma',
            `A patient named ${req.body.pname} made an order!`,
            'Medicine order from DotPharma'
          ),
        ]);
      }
    } catch (e) {
      res.status(STATUSES.SERVERERROR).send({
        status: STATUSES.SERVERERROR,
        message: e.message,
      });
    }
  },
  update: async (req, res) => {
    const orderPayload = [
      req.body.patid,
      req.body.phid,
      req.body.mid,
      req.body.prescription,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      req.params.oid,
    ];
    Order.update(orderPayload)
      .then((response) => {
        if (response.orders) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            order: response.orders,
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
  deleteOrder: async (req, res) => {
    Order.destroy(req.params.oid)
      .then((response) => {
        if (response.orders) {
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
    Order.approve(req.params.oid)
      .then((response) => {
        if (response.orders) {
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
  reject: async (req, res) => {
    Order.reject(req.params.oid)
      .then((response) => {
        if (response.orders) {
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
  findAll: async (req, res) => {
    const { limit, offset } = getPagination(
      req.query.page ? req.query.page : 1,
      20
    );
    Order.findAll([limit, offset])
      .then((response) => {
        if (response.orders) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            orders: response.orders,
            page: { limit, offset },
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
  findRejected: async (req, res) => {
    const { limit, offset } = getPagination(
      req.query.page ? req.query.page : 1,
      20
    );
    Order.findrejectedOrders([limit, offset])
      .then((response) => {
        if (response.orders) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            orders: response.orders,
            page: { limit, offset },
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
    Order.findAprovedOrders([limit, offset])
      .then((response) => {
        if (response.orders) {
          res.status(STATUSES.OK).send({
            status: STATUSES.OK,
            message: response.message,
            orders: response.orders,
            page: { limit, offset },
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
};

export default OrderController;
