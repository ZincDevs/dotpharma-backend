/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import dotenv from 'dotenv';
import db from '../database/connection/_query';
import { getByEmail } from '../database/queries/User';
import { decodeToken } from '../utils/_auth';

dotenv.config();

const Auth = {
  verifyToken: async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: {
          message: 'Token is missing',
        },
      });
    }
    try {
      const { email } = await decodeToken(token);
      try {
        const user = await db.query(getByEmail, [email]);
        if (!user.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: {
              message: 'Invalid token',
            },
          });
        }
        req.token = token;
        req.user = user.rows[0];
        next();
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error
        });
      }
    } catch (error) {
      if (error.name && error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 401,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  },
  verifyToken2: async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      return res.status(401).json({
        status: 401,
        error: {
          message: 'Token is missing',
        },
      });
    }
    try {
      const { email } = await decodeToken(token);
      try {
        const user = await db.query(getByEmail, [email]);
        if (!user.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: {
              message: 'Invalid token',
            },
          });
        }
        req.token = token;
        req.user = user.rows[0];
        next();
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error
        });
      }
    } catch (error) {
      if (error.name && error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 401,
          message: error.message,
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
  // refreshToken: async (req, res) => {

  // }
};

export default Auth;
