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
import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const {
  EMAIL_SENDER,
  OAUTH2_USER,
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_REDIRECT_URI,
  OAUTH2_REFRESH_TOKEN,
  PASSWORD_EMAIL_SENDER,
  MAIL_SENDER_HOST,
  MAIL_SENDER_PORT,
  MAIL_TRAP_TOKEN,
  MAIL_TRAP_ENDPOINT
} = process.env;

const client = new MailtrapClient({ endpoint: MAIL_TRAP_ENDPOINT, token: MAIL_TRAP_TOKEN });

const sentMail = async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  const sender = { name: 'Dotpharma', email: EMAIL_SENDER };
  client
    .send({
      from: sender,
      to: [{ email: emailTo }],
      subject,
      html: template,
    })
    .then(console.log, console.error);
};

export default sentMail;
