import 'regenerator-runtime';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export const generateToken = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '40d' });
  return token;
};

export const decodeToken = async (token) => {
  const user = await jwt.verify(token, JWT_SECRET);
  return user;
};
