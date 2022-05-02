/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';

export const getErrorMessage = (key, message) => {
  const error = {};
  error[key] = { message };
  return error;
};
