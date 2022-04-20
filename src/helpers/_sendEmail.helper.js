/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import 'regenerator-runtime';
import mailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export default async (emailTo, subject, template) => {
  try {
    const transporter = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      from: process.env.EMAIL_SENDER,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_EMAIL_SENDER,
      },
    });

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log('=== SERVER IS READY TO SEND EMAIL ===');
          resolve(success);
        }
      });
    });

    const mailData = {
      from: {
        name: 'DotPharma',
        address: process.env.EMAIL_SENDER,
      },
      replyTo: process.env.EMAIL_SENDER,
      to: emailTo,
      subject,
      text: 'Hello',
      html: template
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);
          console.error(err);
          reject(err);
        } else {
          console.log(`PID: ${process.pid} === EMAIL SENT ===`);
          console.log(info);
          resolve(info);
        }
      });
    });
    return mailData;
  } catch (error) {
    return error;
  }
};
