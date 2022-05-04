/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import 'regenerator-runtime';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { decodeToken, getErrorMessage } from '../helpers';
import { User } from '../db/models';

dotenv.config();

const Auth = {
  verifyToken: async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const token = authorization.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
      const { u_email } = await decodeToken(token);
      try {
        let user = await User.findOne({ where: { u_email } });
        user = user?.dataValues;
        if (!user) {
          return res.status(403).json({
            error: {
              message: 'Invalid token',
            },
          });
        }
        req.authUser = user;
        next();
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
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
    if (!token) return res.sendStatus(401);
    try {
      const { u_email } = await decodeToken(token);
      let user = await User.findOne({ where: { u_email } });
      user = user?.dataValues;
      if (!user) {
        return res.status(400).json({
          status: 400,
          error: {
            message: 'Invalid token',
          },
        });
      }
      req.authUser = user;
      next();
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
  checkCredentials: async (req, res, next) => {
    const { user, body: { password }, } = req;
    const isCorrectPassword = bcrypt.compareSync(password, user.u_password);
    if (!isCorrectPassword) {
      return res.status(401).send({
        error: getErrorMessage('password', 'Password is incorrect'),
      });
    }
    next();
  },
};

export default Auth;
