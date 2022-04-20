/* eslint-disable no-unused-vars */
import db from '../connection/_query';
import {
  approveOrder,
  createOrder,
  deleteOrder,
  getAllOrders,
  getApprovedOrders,
  getRejectedOrders,
  rejectOrder,
  updateOrder,
} from '../queries/orders';
import { createPatient, getByEmail } from '../queries/patient';
import { getOneById } from '../queries/pharmacy';
import { STATUSES } from '../../constants/ResponseStatuses';
import { MESSAGES } from '../../constants/ResponceMessages';

const Order = {
  findAll: async (data) => {
    const orderRes = await db.query(getAllOrders, data);
    if (orderRes.rows.length > 0) {
      return {
        message: `Order ${MESSAGES.FOUND}`,
        orders: orderRes.rows,
      };
    }
    return {
      message: `Order ${MESSAGES.NOT_CREATED}`,
    };
  },
  findAprovedOrders: async (data) => {
    const orderRes = await db.query(getApprovedOrders, data);
    if (orderRes.rows.length > 0) {
      return {
        message: `Order ${MESSAGES.FOUND}`,
        orders: orderRes.rows,
      };
    }
    return {
      message: `Order ${MESSAGES.NOT_CREATED}`,
    };
  },
  findrejectedOrders: async (data) => {
    const orderRes = await db.query(getRejectedOrders, data);
    if (orderRes.rows.length > 0) {
      return {
        message: `Order ${MESSAGES.FOUND}`,
        orders: orderRes.rows,
      };
    }
    return {
      message: `Order ${MESSAGES.NOT_CREATED}`,
    };
  },
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
  update: async (data) => {
    const orderRes = await db.query(updateOrder, data);
    if (orderRes.rows.length > 0) {
      return {
        message: `Order ${MESSAGES.UPDATED}`,
        orders: orderRes.rows,
      };
    }
    return {
      message: 'Order not updated',
    };
  },
  destroy: async (oid) => {
    const orderRes = await db.query(deleteOrder, [oid]);
    if (orderRes.rows.length > 0) {
      return {
        message: `Order ${MESSAGES.DELETED}`,
        orders: orderRes.rows,
      };
    }
    return {
      message: 'Order not deleted',
    };
  },
  approve: async (oid) => {
    const orderRes = await db.query(approveOrder, [oid]);
    if (orderRes.rows.length > 0) {
      return {
        message: 'Order approved successfully',
        orders: orderRes.rows,
      };
    }
    return {
      message: 'Order not approved',
    };
  },
  reject: async (oid) => {
    const orderRes = await db.query(rejectOrder, [oid]);
    if (orderRes.rows.length > 0) {
      return {
        message: 'Order rejected successfully',
        orders: orderRes.rows,
      };
    }
    return {
      message: 'Order not rejected',
    };
  },
};

export default Order;
