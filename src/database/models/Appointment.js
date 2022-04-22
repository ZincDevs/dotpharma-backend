/* eslint-disable require-jsdoc */
import 'regenerator-runtime';
import db from '../connection/_query';
import {
  createAppointment,
  approveAppointment,
  rejectAppointment,
  getAllAppointments,
  deleteAppointment,
  getApprovedAppointments,
  getRejectedAppointments
} from '../queries/appointment';
import { STATUSES } from '../../constants/ResponseStatuses';
import { MESSAGES } from '../../constants/ResponceMessages';

const Appointment = {
  findAll: async (data) => {
    const appointments = await db.query(getAllAppointments, data);
    if (appointments.rows.length > 0) {
      return {
        message: `Appointment ${MESSAGES.FOUND}`,
        appointments: appointments.rows,
      };
    }
    return {
      message: 'Appointment not found',
    };
  },
  create: async (data) => {
    const createRes = await db.query(createAppointment, data);
    if (createRes.rows.length > 0) {
      return {
        message: `Appointment ${MESSAGES.CREATED}`,
        data: createRes.rows[0],
      };
    }
    return {
      status: STATUSES.BAD_REQUEST,
      message: `Appointment ${MESSAGES.NOT_CREATED}`,
    };
  },
  update: async () => {},
  destroy: async (aid) => {
    const appointments = await db.query(deleteAppointment, [aid]);
    if (appointments.rows.length > 0) {
      return {
        message: `Appointment ${MESSAGES.DELETED}`,
        appointments: appointments.rows,
      };
    }
    return {
      message: `Appointment ${MESSAGES.CREATED}`,
    };
  },
  approve: async (aid) => {
    const appointments = await db.query(approveAppointment, [aid]);
    if (appointments.rows.length > 0) {
      return {
        message: 'Appointment approved successfully',
        appointments: appointments.rows,
      };
    }
    return {
      message: 'Appointment not approved',
    };
  },
  reject: async (aid) => {
    const appointments = await db.query(rejectAppointment, [aid]);
    if (appointments.rows.length > 0) {
      return {
        message: 'Appointment rejected successfully',
        appointments: appointments.rows,
      };
    }
    return {
      message: 'Appointment not rejected',
    };
  },
  findApproved: async (data) => {
    const appointments = await db.query(getApprovedAppointments, data);
    if (appointments.rows.length > 0) {
      return {
        message: `Appointment ${MESSAGES.FOUND}`,
        appointments: appointments.rows,
      };
    }
    return {
      message: 'Appointment not found',
    };
  },
  findRejected: async (data) => {
    const appointments = await db.query(getRejectedAppointments, data);
    if (appointments.rows.length > 0) {
      return {
        message: 'Appointment found',
        appointments: appointments.rows,
      };
    }
    return {
      message: 'Appointment not found',
    };
  }
};

export default Appointment;
