/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import 'regenerator-runtime';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { generate } from 'generate-password';

dotenv.config();

export const genPass = (autoGen = true, pass = null) => {
  const passN = autoGen
    ? generate({
      length: 10,
      numbers: true,
    })
    : pass;
  return autoGen ? bcrypt.hashSync(passN, 10) : bcrypt.hashSync(passN, 10);
};

export const getPagination = (page, size) => {
  const limit = size || 20;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

export const getExpInMinutes = (minutes = 10) => 60 * minutes;

export const getErrorMessage = (key, message) => {
  const error = {};
  error[key] = { message };
  return error;
};
