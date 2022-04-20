import 'regenerator-runtime';
import db from '../connection/_query';
import {
  createHealthTip,
  deleteTip,
  findAllTip,
  findById,
  upadateHealthTip,
} from '../queries/healthtips';
import { MESSAGES } from '../../constants/ResponceMessages';

const HealthTips = {
  create: async (data) => {
    const tip = await db.query(createHealthTip, data);
    if (tip.rows.length > 0) {
      return {
        message: `Health tip ${MESSAGES.CREATED}`,
        tip: tip.rows,
      };
    }
    return {
      message: 'Health not created',
    };
  },
  update: async (data) => {
    const tip = await db.query(upadateHealthTip, data);
    if (tip.rows.length > 0) {
      return {
        message: `Health tip ${MESSAGES.UPDATED}`,
        tip: tip.rows,
      };
    }
    return {
      message: 'Health not updated',
    };
  },
  findAll: async (data) => {
    const tip = await db.query(findAllTip, data);
    if (tip.rows.length > 0) {
      return {
        message: `Health tip ${MESSAGES.FOUND}`,
        tip: tip.rows,
      };
    }
    return {
      message: `${MESSAGES.NOT_CONTENT}`,
    };
  },
  destroy: async (hid) => {
    const tip = await db.query(deleteTip, [hid]);
    if (tip.rows.length > 0) {
      return {
        message: `Health tip ${MESSAGES.FOUND}`,
        tip: tip.rows,
      };
    }
    return {
      message: 'Not deleted',
    };
  },
  findById: async (hid) => {
    const tip = await db.query(findById, [hid]);
    if (tip.rows.length > 0) {
      return {
        message: `Health tip ${MESSAGES.FOUND}`,
        tip: tip.rows,
      };
    }
    return {
      message: `${MESSAGES.NOT_CONTENT}`,
    };
  },
};

export default HealthTips;
