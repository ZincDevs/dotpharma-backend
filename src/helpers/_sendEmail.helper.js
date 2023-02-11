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
  PASSWORD_EMAIL_SENDER,
  MAIL_SENDER_HOST,
  MAIL_SENDER_PORT
} = process.env;
// const oAuth2Client = new google.auth.OAuth2(OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: OAUTH2_REFRESH_TOKEN });

const sentMail = async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const transporter = mailer.createTransport({
      name: 'dotpharma.rw',
      host: MAIL_SENDER_HOST,
      port: MAIL_SENDER_PORT,
      secure: false,
      auth: {
        user: EMAIL_SENDER,
        pass: PASSWORD_EMAIL_SENDER,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
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
  } catch (error) {
    return error;
  }
};

export default sentMail;
