/* eslint-disable require-jsdoc */
import db from '../connection/_query';
import { createAppointment, } from '../queries/appointment';
import { STATUSES } from '../../constants/ResponseStatuses';
import { MESSAGES } from '../../constants/ResponceMessages';

const Appointment = {
  findAll: async () => {

  },
  create: async (data) => {
    try {
      const createRes = await db.query(createAppointment, data);
      if (createRes.rows.length > 0) {
        return {
          status: STATUSES.CREATED,
          message: `Appointment ${MESSAGES.CREATED}`,
          data: createRes.rows[0],
        };
      }
      return {
        status: STATUSES.BAD_REQUEST,
        message: `Appointment ${MESSAGES.NOT_CREATED}`,
        data: [],
      };
    } catch (e) {
      return {
        status: STATUSES.SERVERERROR,
        message: `Error: ${e.message}`,
      };
    }
  },
  update: async () => {

  },
  destroy: async () => {

  },
};

export default Appointment;
