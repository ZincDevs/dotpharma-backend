/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import 'regenerator-runtime';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import transport from 'nodemailer-sendgrid-transport';

dotenv.config();
export default async (emailTo, subject, template, finish) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const mailer = nodemailer.createTransport(
      transport({
        auth: {
          api_key: process.env.SENDGRID_API_KEY,
        },
      })
    );

    const email_option = {
      to: emailTo,
      replyTo: process.env.EMAIL_SENDER,
      from: `DotPharma <${process.env.EMAIL_SENDER}>`,
      subject,
      text: subject,
      html: template,
    };

    await new Promise((resolve, reject) => {
      mailer.sendMail(email_option, (err, info) => {
        if (err) {
          console.log(err, `PID: ${process.pid} === EMAIL NOT SENT ===`);
          reject(err);
        } else {
          console.log(info, `PID: ${process.pid} === EMAIL SENT ===`);
          resolve(info);
        }
        finish(email_option);
      });
    });

    return email_option;
  } catch (error) {
    return error;
  }
};
