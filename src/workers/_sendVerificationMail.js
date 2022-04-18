/* eslint-disable no-unused-vars */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-console */
import { sendEmail } from '../helpers/email';
import verifyUserTemplate from '../helpers/email/templates/VerifyUser';

const sendVerificationMail = async (mail, callback) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  const link = `https://dotpharma.herokuapp.com/verify?token=${mail.token}`;
  const res = await sendEmail(mail.email, 'Account verification.', verifyUserTemplate(link));
  callback(null, res);
};

module.exports = sendVerificationMail;
