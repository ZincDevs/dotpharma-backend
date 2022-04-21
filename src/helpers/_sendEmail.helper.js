/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import 'regenerator-runtime';
// import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import transport from 'nodemailer-sendgrid-transport';
import sgMail from '@sendgrid/mail';

dotenv.config();
export default async (emailTo, subject, template, finish) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const email_option = {
    to: emailTo,
    replyTo: process.env.EMAIL_SENDER,
    from: `DotPharma <${process.env.EMAIL_SENDER}>`,
    subject,
    text: subject,
    html: template,
  };
  sgMail
    .send(email_option)
    .then((info) => {
      console.log(info, `PID: ${process.pid} === EMAIL SENT ===`);
      finish(email_option);
      // resolve(info);
    })
    .catch((error) => {
      console.log(error, `PID: ${process.pid} === EMAIL NOT SENT ===`);
      finish(email_option);
      // reject(error);
    });
  return email_option;
};
