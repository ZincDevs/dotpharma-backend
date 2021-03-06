/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { Order } from '../db/models';

const OrderController = {
  createNewOrder: async (req, res) => {
    const orderPayload = {
      o_id: uuid(),
      p_id: req.body.patid,
      o_pharmacy: req.body.phid,
      o_medicine: req.body.mid,
      o_prescription: req.body.prescription,
      o_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      o_status: 'Pending',
      o_referencecode: req.body.refcode
    };

    const order = await Order.create(orderPayload);
    if (!order) {
      return res.sendStatus(400);
    }
    return res.sendStatus(201);
  },
  update: async (req, res) => {
    const orderPayload = {
      p_id: req.body.patid,
      o_pharmacy: req.body.phid,
      o_medicine: req.body.mid,
      o_prescription: req.body.prescription,
      o_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      o_status: 'Pending',
    };
    const { o_id } = req.params;
    const order = await Order.update(orderPayload, { where: o_id });
    if (order[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  deleteOrder: async (req, res) => {
    const { o_id } = req.params;
    const order = await Order.findOne({ where: { o_id } });
    if (!order) {
      return res.sendStatus(400);
    }
    await order.destroy();
    return res.sendStatus(200);
  },
  approve: async (req, res) => {
    const payload = {
      o_status: 'approved'
    };
    const { o_id } = req.params;
    const appointment = await Order.update(payload, { where: { o_id } });
    if (appointment[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  reject: async (req, res) => {
    const payload = {
      o_status: 'rejected'
    };
    const { o_id } = req.params;
    const appointment = await Order.update(payload, { where: { o_id } });
    if (appointment[0] === 0) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  },
  findAll: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const orders = await Order.findAll({
      limit,
      offset
    });
    return res.json(orders);
  },
  findRejected: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const o_status = 'rejected';
    const orders = await Order.findAll({
      limit,
      offset,
      where: { o_status }
    });
    return res.json(orders);
  },
  findApproved: async (req, res) => {
    const { paginate } = req;
    const limit = paginate?.limit;
    const offset = paginate?.offset;
    const o_status = 'approved';
    const orders = await Order.findAll({
      limit,
      offset,
      where: { o_status }
    });
    return res.json(orders);
  },
};

export default OrderController;
