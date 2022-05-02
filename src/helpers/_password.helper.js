/* eslint-disable import/prefer-default-export */
import 'regenerator-runtime';
import bcrypt from 'bcrypt';
import { generate } from 'generate-password';

export const generatePassword = (autoGen = true, pass = null) => {
  const passN = autoGen
    ? generate({
      length: 10,
      numbers: true,
    })
    : pass;
  return autoGen ? bcrypt.hashSync(passN, 10) : bcrypt.hashSync(passN, 10);
};
