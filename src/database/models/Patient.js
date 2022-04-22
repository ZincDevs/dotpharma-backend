/* eslint-disable require-jsdoc */
import 'regenerator-runtime';
import { MESSAGES } from '../../constants/ResponceMessages';
import { STATUSES } from '../../constants/ResponseStatuses';
import query from '../connection/_query';
import {
  createPatient, getAll, getByEmail, getById, updatePatient, deletPatient
} from '../queries/patient';

const Patient = {
  create: async (data) => {
    const patient = await query.query(createPatient, data);
    if (patient.rows.length > 0) {
      return {
        message: `patient ${MESSAGES.CREATED}`,
        patient: patient.rows,
      };
    }
    return {
      message: MESSAGES.NOT_CREATED,
    };
  },
  update: async (data) => {
    const patient = await query.query(updatePatient, data);
    if (patient.rows.length > 0) {
      return {
        message: `patient ${MESSAGES.UPDATED}`,
        patient: patient.rows,
      };
    }
    return {
      message: `Patient ${MESSAGES.NOT_UPDATED}`,
    };
  },
  findAll: async (data) => {
    const patients = await query.query(getAll, data);
    if (patients.rows.length > 0) {
      return {
        message: `patient ${MESSAGES.FOUND}`,
        patients: patients.rows,
      };
    }
    return {
      message: `Patient ${MESSAGES.NOT_CONTENT}`,
    };
  },
  destroy: async (pid) => {
    const patient = await query.query(deletPatient, [pid]);
    if (patient.rows.length > 0) {
      return {
        patient: patient.rows,
        message: `patient ${MESSAGES.DELETED}`,
      };
    }
    return {
      message: 'Patient not deleted',
    };
  },
  findById: async (pid) => {
    const patient = await query.query(getById, [pid]);
    if (patient.rows.length > 0) {
      return {
        patient: patient.rows,
        message: `patient ${MESSAGES.FOUND}`,
      };
    }
    return {
      message: MESSAGES.NOT_CONTENT,
    };
  },
};

export default Patient;
