/* eslint-disable no-unused-vars */
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { STATUSES } from '../constants/ResponseStatuses';
import Order from '../database/models/Order';
import { sendEmail } from '../utils/appUtils';

const OrderController = {
  createNewOrder: async (req, res) => {

    const patientPayload = [
      uuid(),
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.country,
      req.body.town,
      req.body.district,
      req.body.street,
      req.body.nid,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    ];
    
    const orderPayload = [
      uuid(),
      req.body.phid,
      req.body.mid,
      req.body.prescription,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      'Pending',
    ];
    const response = await Order.createOrder(patientPayload, orderPayload);
    res.status(response.status).send({
      status: response.status,
      message: response.message,
      data: response.data,
    });
    if (response.data) {
      const [emailSent] = await Promise.all([
        sendEmail(
          response.data.pharmacyEmail,
          'Dotpharma',
          `A patient named ${response.data.p_name} made an order!`,
          'Medicine order from DotPharma',
        ),
      ]);
    }
  },
};

export default OrderController;
