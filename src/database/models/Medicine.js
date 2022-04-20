/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import query from '../connection/_query';
import {
  createMedicine,
  updateMedicine,
  findAllMedicines,
  searchByName,
  getById,
  deleteMedicine,
} from '../queries/medicine';
import { getMedicinesInPharmacy } from '../queries/pharmacy';
import { STATUSES } from '../../constants/ResponseStatuses';
import { MESSAGES } from '../../constants/ResponceMessages';

const Medicine = {
  findAll: async () => {
    try {
      const medicines = await query.query(findAllMedicines);
      if (medicines.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.FOUND,
          data: medicines.rows,
        };
      }
      return {
        status: STATUSES.NO_CONTENT,
        message: MESSAGES.NOT_CONTENT,
        data: [],
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  },
  findOne: async () => { },
  create: async (data) => {
    try {
      const createdMedicine = await query.query(createMedicine, data);
      if (createdMedicine.rows.length > 0) {
        return {
          status: STATUSES.CREATED,
          message: `Medicine ${MESSAGES.CREATED}`,
          data: createdMedicine.rows[0],
        };
      }
      return {
        status: STATUSES.BAD_REQUEST,
        message: `Medicine ${MESSAGES.NOT_CREATED}`,
        data: {},
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  },
  update: async () => {
    try {
      const createdMedicine = await query.query(updateMedicine, data);
      if (createdMedicine.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: `Medicine ${MESSAGES.UPDATED}`,
          data: createdMedicine.rows[0],
        };
      }
      return {
        status: STATUSES.BAD_REQUEST,
        message: `Medicine ${MESSAGES.NOT_FOUND}`,
        data: {},
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  },
  destroy: async (mid) => {
    try {
      const deletedRes = await query.query(deleteMedicine, [mid]);
      if (deletedRes.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.DELETED,
        };
      }
      return {
        status: STATUSES.BAD_REQUEST,
        message: MESSAGES.NOT_FOUND,
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  },
  getMedicinesInPharmacy: async (phid) => {
    try {
      const medicinesInPharmacy = await query.query(getMedicinesInPharmacy, [phid]);
      if (medicinesInPharmacy.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.FOUND,
          data: medicinesInPharmacy.rows,
        };
      }
      return {
        status: STATUSES.NO_CONTENT,
        message: MESSAGES.NOT_CONTENT,
        data: [],
      };
    } catch (error) {
      return {
        status: STATUSES.BAD_REQUEST,
        message: error.message,
      };
    }
  },
};

export default Medicine;
