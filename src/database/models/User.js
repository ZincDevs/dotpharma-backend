import bcrypt from "bcrypt";
import db from "../connection/_query";
import { generateToken } from "../../utils/_auth";
import { getByEmail, create ,getAll} from "../queries/User";
import { STATUSES } from "../../constants/ResponseStatuses";
import { MESSAGES } from "../../constants/ResponceMessages";

const User = {
  login: async (data) => {
    try {
      const user = await db.query(getByEmail, [data[0]]);
      if (user.rowCount) {
        if (bcrypt.compareSync(data[1], user.rows[0].u_password)) {
          const payload = {
            names: user.rows[0].u_name,
            email: user.rows[0].u_email,
            phonenumber: user.rows[0].u_phone,
            role: user.rows[0].u_name,
            userid: user.rows[0].u_id,
          };
          const token = await generateToken(payload);
          return {
            token,
            user: user.rows,
            message: "sussesfully logged in",
          };
        }
        return {
          message: "password is incorrect",
        };
      }
      return {
        message: "Invalid email",
      };
    } catch (error) {
      return error;
    }
  },
  findAll: async () => {
    try {
      const users = await db.query(getAll);
      if (users.rows.length>0) {
        return {
          user: users.rows,
          message: "Data found",
        };
      }
      return {
        message: "No data found",
      };
    } catch (error) {
      return error;
    }
  },
  create: async (data) => {
    try {
      const payload = {
        names: data[0],
        email: data[1],
        phonenumber: data[2],
        role: data[3],
      };
      const token = await generateToken(payload);
      const user = await db.query(create, data);
      if(user.rows.length>0){
       delete user.rows[0].u_password;
        return {
          user,
          token,
          message:`User ${MESSAGES.CREATED}`,
        };
      }else {
        return {
          message:`User not ${MESSAGES.NOT_CREATED}`,
        };
      }
      
    } catch (e) {
      return {
        message:e.message,
        status:STATUSES.SERVERERROR
      };
    }
  },
  update: async () => {},
  destroy: async () => {},
};

export default User;
