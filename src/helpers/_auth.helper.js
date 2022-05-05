import 'regenerator-runtime';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateToken = async (payload, expiration = '15m') => {
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: expiration });
  return token;
};

export const decodeToken = async (token, callback) => {
  const user = await jwt.verify(token, JWT_SECRET, callback);
  return user;
};

export const decodeJWT = (token, callback) => jwt.verify(token, JWT_SECRET, callback);
