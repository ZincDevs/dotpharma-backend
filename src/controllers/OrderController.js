/* eslint-disable no-unused-vars */
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { MESSAGES } from '../constants/ResponceMessages';
import { STATUSES } from '../constants/ResponseStatuses';
import Order from '../database/models/Order';
import { sendEmail } from '../utils/appUtils';

const OrderController = {
  createNewOrder: async (req, res) => {
    try{

    }catch(e){
      
    }

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
          'Medicine order from DotPharma',
        ),
      ]);
    }
  },
};

export default OrderController;
