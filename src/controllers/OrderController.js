/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import dotev from 'dotenv';
import { sendOrderRequestEmail, sendOrderSucccesToPatientEmail } from '../services';
import { User, Order } from '../db/models';
import { productList } from '../helpers/_products.helper';

dotev.config();

const { DOPHARMA_EMAIL } = process.env;

const OrderController = {
  createNewOrder: async (req, res) => {
    const orderPayload = {
      o_id: uuid(),
      p_id: req.body.patid,
      o_pharmacy: req.body.phid,
      o_medicines: req.body.medicines,
      o_prescription: req.body.prescription,
      o_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      o_status: 'Pending',
      o_address: req.body.address,
      o_referencecode: req.body.refcode,
      o_paymentamout: req.body.totalamount,
      o_payment_ref: req.body.ref,
      o_paid: true,
      o_type: req.body.type,
    };

    const order = await Order.create(orderPayload);

    if (!order) {
      return res.sendStatus(400);
    }
    sendOrderRequestEmail({
      email: DOPHARMA_EMAIL,
      orderid: order.o_id,
      name: req.body.name,
      phonenumber: req.body.address.split(',')[0],
    });
    const products = await productList(req.body.medicines);
    sendOrderSucccesToPatientEmail({
      email: req.body.p_email, orderid: req.body.refcode, products, totalamount: req.body.totalamount
    });
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
      o_status: 'approved',
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
      o_status: 'rejected',
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
      offset,
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
      where: { o_status },
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
      where: { o_status },
    });
    return res.json(orders);
  },
};

export default OrderController;
