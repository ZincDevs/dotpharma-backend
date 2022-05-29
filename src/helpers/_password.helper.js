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
  console.log(passN);
  return bcrypt.hashSync(passN, 10);
};
