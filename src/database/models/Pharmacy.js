/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import 'regenerator-runtime';
import {
  createPharmacy,
  deletePharmacy,
  disactivatePharmacy,
  getAllPharmacies,
  updatePharmacy,
  getOneById,
  searchByName,
  getByEmailOrPhone,
  addMedicineToPharmacy
} from '../queries/pharmacy';
import query from '../connection/_query';
import { MESSAGES } from '../../constants/ResponceMessages';
import { STATUSES } from '../../constants/ResponseStatuses';

const Pharmacy = {
  findAll: async () => {
    try {
      const pharmacies = await query.query(getAllPharmacies);
      if (pharmacies.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.FOUND,
          data: pharmacies.rows
        };
      }
      return {
        status: STATUSES.NO_CONTENT,
        message: MESSAGES.NOT_CONTENT,
        data: pharmacies.rows
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  },
  find: async () => {},
  create: async (data) => {
    try {
      const pharmacy = await query.query(getByEmailOrPhone, [data[2], data[3]]);
      if (pharmacy.rows[0]) {
        return {
          status: 400,
          message: MESSAGES.ALREDY_EXISTS
        };
      }
      try {
        const createdPharmacy = await query.query(createPharmacy, data);
        if (createdPharmacy.rows.length > 0) {
          return {
            status: STATUSES.CREATED,
            message: `Pharmacy ${MESSAGES.CREATED}`,
            data: createdPharmacy.rows,
          };
        }
        console.log('Hello check 2');
        return {
          status: STATUSES.BAD_REQUEST,
          message: MESSAGES.UNKNOWN_ERROR,
        };
      } catch (error) {
        console.log('Hello check 4', error);
        return {
          status: STATUSES.BAD_REQUEST,
          message: MESSAGES.UNKNOWN_ERROR,
        };
      }
    } catch (error) {
      console.log('Hello check 3', error);
      return {
        status: 400,
        message: MESSAGES.UNKNOWN_ERROR,
      };
    }
  },
  update: async (data) => {
    try {
      const pharmacies = await query.query(updatePharmacy, data);
      if (pharmacies.rows.length > 0) {
        return {
          status: STATUSES.OK,
          message: MESSAGES.UPDATED,
          data: pharmacies.rows[0]
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
  destroy: async (pid) => {
    try {
      const pharmacies = await query.query(deletePharmacy, [pid]);
      if (pharmacies.rows.length > 0) {
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
  addMedicineToPharmacy: async (data) => {
    try {
      const pharmacyMedicine = await query.query(addMedicineToPharmacy, data);
      if (pharmacyMedicine.rows.length > 0) {
        return {
          status: STATUSES.CREATED,
          message: 'Medicine added to pharmacy successfully!',
        };
      }
      return {
        status: STATUSES.BAD_REQUEST,
        message: 'Medicine not added to pharmacy!',
      };
    } catch (error) {
      return {
        status: STATUSES.SERVERERROR,
        message: error.message,
      };
    }
  }
};

export default Pharmacy;
