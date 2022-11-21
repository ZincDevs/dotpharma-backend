/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable max-len */
// const path = require('path');
// const mailer = require('nodemailer');
// const { google } = require('googleapis');
// const dotenv = require('dotenv');
import 'regenerator-runtime';
import mailer from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const {
  EMAIL_SENDER,
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_REDIRECT_URI,
  OAUTH2_REFRESH_TOKEN,
  PASSWORD_EMAIL_SENDER
} = process.env;
const oAuth2Client = new google.auth.OAuth2(OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: OAUTH2_REFRESH_TOKEN });

const sentMail = async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const transporter = mailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      pool: true,
      auth: {
        user: EMAIL_SENDER,
        pass: PASSWORD_EMAIL_SENDER,
      }
    });

    const mailOptions = {
      from: `DotPharma <${process.env.EMAIL_SENDER}>`,
      to: emailTo,
      subject,
      html: template,
      generateTextFromHTML: true,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
    // const res = await transport.sendMail(mailOptions);
    // res.accepted ? console.log(`PID: ${process.pid} === EMAIL SENT ===`)
    //   : console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);
  } catch (error) {
    return error;
  }
};

// sentMail('ericrukundo005@gmai.com', 'Email', '<h1>Hire here</h1>').then((res) => {
//   console.log(res);
// }).catch((error) => {
//   console.log(error);
// });

export default sentMail;
