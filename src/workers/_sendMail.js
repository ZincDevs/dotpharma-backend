/* eslint-disable no-unused-vars */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
import 'regenerator-runtime';
import { sendEmail } from '../helpers';

const sendMail = async (mail, subject, content, done) => {
  const res = await sendEmail(mail.email, subject, content);
  done(res);
};

module.exports = sendMail;
