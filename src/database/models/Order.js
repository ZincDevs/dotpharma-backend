/* eslint-disable no-unused-vars */
import db from "../connection/_query";
import {
  approveOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getApprovedOrders,
  getRejectedOrders,
  rejectOrder,
  updateOrder,
} from "../queries/orders";
import { createPatient, getByEmail } from "../queries/patient";
import { getOneById } from "../queries/pharmacy";
import { STATUSES } from "../../constants/ResponseStatuses";
import { MESSAGES } from "../../constants/ResponceMessages";
import { createOrder as orderHandler } from "../../utils/appUtils";

const Order = {
  findAll: async () => {},
  create: async (dataOrder) => {
      const orderRes = await db.query(createOrder, dataOrder);
      if (orderRes.rows.length > 0) {
        const pharmaRes = await db.query(getOneById, [
          orderRes.rows[0].o_pharmacy,
        ]);
        return {
          message: `Order ${MESSAGES.CREATED}`,
          data: orderRes.rows[0],
          pharmacyEmail: pharmaRes.rows[0].ph_email,
        };
      }
      return {
        message: `Order ${MESSAGES.NOT_CREATED}`,
      };
  },
  update: async () => {},
  destroy: async () => {},
};

export default Order;
