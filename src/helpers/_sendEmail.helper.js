/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import 'regenerator-runtime';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import transport from 'nodemailer-sendgrid-transport';

dotenv.config();
export default async (emailTo, subject, template) => {
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
      });
    });

    // const transporter = mailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   from: process.env.EMAIL_SENDER,
    //   auth: {
    //     user: process.env.EMAIL_SENDER,
    //     pass: process.env.PASSWORD_EMAIL_SENDER,
    //   },
    // });

    // const mailer = nodemailer.createTransport(
    //   transport({
    //     auth: {
    //       api_key: process.env.SENDGRID_API_KEY,
    //     },
    //   })
    // );

    // const mailData = {
    //   from: {
    //     name: 'DotPharma',
    //     address: process.env.EMAIL_SENDER,
    //   },
    //   replyTo: process.env.EMAIL_SENDER,
    //   to: emailTo,
    //   subject,
    //   text: 'Hello',
    //   html: template
    // };

    // await new Promise((resolve, reject) => {
    //   mailer.sendMail(mailData, (err, info) => {
    //     if (err) {
    //       console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);
    //       console.error(err);
    //       reject(err);
    //     } else {
    //       console.log(`PID: ${process.pid} === EMAIL SENT ===`);
    //       console.log(info);
    //       resolve(info);
    //     }
    //   });
    // });
    return email_option;
  } catch (error) {
    return error;
  }
};
