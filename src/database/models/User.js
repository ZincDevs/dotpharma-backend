import bcrypt from 'bcrypt';
import db from '../connection/_query';
import { generateToken } from '../../utils/_auth';
import {
  getByEmail,
  create,
  getAll,
  update,
  getById,
  deleteuser,
  updatePassword,
  actvateUser,
} from '../queries/User';
import { MESSAGES } from '../../constants/ResponceMessages';
import { getPagination, genPass } from '../../utils/appUtils';

const User = {
  login: async (data) => {
    try {
      const user = await db.query(getByEmail, [data[0]]);
      if (user.rowCount) {
        if (bcrypt.compareSync(data[1], user.rows[0].u_password)) {
          const payload = {
            email: user.rows[0].u_email,
            role: user.rows[0].u_name,
            userid: user.rows[0].u_id,
          };
          const token = await generateToken(payload);
          return {
            token,
            user: user.rows,
            message: 'sussesfully logged in',
          };
        }
        return {
          password: { message: 'password is incorrect' },
        };
      }
      return {
        email: { message: ['Invalid email'] },
      };
    } catch (error) {
      return error;
    }
  },
  findAll: async (data) => {
    const { limit, offset } = getPagination(data[0], data[1]);
    const users = await db.query(getAll, [limit, offset]);
    if (users.rows.length > 0) {
      return {
        users: users.rows,
        message: 'Data found',
      };
    }
    return {
      message: 'No data found',
    };
  },
  // create: async (data, doctorData) => {
  //   try {
  //     const user = await db.query(create, data);
  //     if (user.rows.length > 0) {
  //       delete user.rows[0].u_password;

  //       const doctor = await Doctor.create(doctorData);
  //       if (doctor.data) {
  //         return {
  //           user,
  //           doctor,
  //           message: `Doctor ${MESSAGES.CREATED}`,
  //         };
  //       }
  //       return {
  //         message: `Doctor not created due to ${doctor.message}`,
  //       };
  //     }
  //     return {
  //       message: `User not ${MESSAGES.NOT_CREATED}`,
  //     };
  //   } catch (e) {
  //     return {
  //       message: e.message,
  //       status: STATUSES.SERVERERROR,
  //     };
  //   }
  // },
  create: async (data) => {
    const user = await db.query(create, data);
    if (user.rows.length > 0) {
      const payload = {
        email: user.rows[0].u_email,
        role: user.rows[0].u_role,
        userid: user.rows[0].u_id,
      };
      const token = await generateToken(payload);
      return {
        token,
        user,
        message: `User ${MESSAGES.CREATED}`,
      };
    }
    return {
      message: `User not ${MESSAGES.NOT_CREATED}`,
    };
  },
  activateUser: async (uid) => {
    const userActivate = await db.query(actvateUser, [uid]);
    if (userActivate.rows.length > 0) {
      return {
        user: userActivate.rows,
        message: 'User is activated',
      };
    }
    return {
      message: 'User is not activated',
    };
  },
  update: async (data) => {
    const user = await db.query(update, data);
    if (user.rows.length > 0) {
      return {
        user,
        message: `User ${MESSAGES.UPDATED}`,
      };
    }
    return {
      message: `User not ${MESSAGES.NOT_UPDATED}`,
    };
  },
  destroy: async (uid) => {
    const user = await db.query(deleteuser, [uid]);
    if (user.rows.length > 0) {
      return {
        user,
        message: `User ${MESSAGES.DELETED}`,
      };
    }
    return {
      message: `User not ${MESSAGES.DELETED}`,
    };
  },
  resetPassword: async (data) => {
    const user = await db.query(getById, [data[0]]);
    if (user.rows.length > 0) {
      if (bcrypt.compareSync(data[1], user.rows[0].u_password)) {
        const userReset = await db.query(updatePassword, [
          data[0],
          genPass(false, data[2]),
        ]);
        if (userReset.rows.length > 0) {
          return {
            user: userReset.rows,
            message: 'Password resed sussesfully',
          };
        }
        return {
          message: 'Password not reset',
        };
      }
      return {
        message: 'password mismach',
      };
    }
    return {
      message: 'User not found',
    };
  }
};

export default User;
