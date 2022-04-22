/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable max-len */
import 'regenerator-runtime';
import mailer from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const {
  OAUTH2_USER,
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_REDIRECT_URI,
  OAUTH2_REFRESH_TOKEN
} = process.env;
console.log(OAUTH2_USER, OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REDIRECT_URI, OAUTH2_REFRESH_TOKEN);
// const OAUTH2_USER = 'zincdevs@gmail.com';
// const OAUTH2_CLIENT_ID = '937522408556-v86n6sgj5t7bnru2tj2tqlrjnrojf9n0.apps.googleusercontent.com';
// const OAUTH2_CLIENT_SECRET = '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';
// const OAUTH2_REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const OAUTH2_REFRESH_TOKEN = '1//043eGUCffxiUiCgYIARAAGAQSNwF-L9IrCCoQWuvj68EHCToek45w6k4H3VfgoovQVdSixna_TbRNrFzQ5kvKmi4mIAS5dDZaaEs';
const oAuth2Client = new google.auth.OAuth2(OAUTH2_CLIENT_ID, OAUTH2_CLIENT_SECRET, OAUTH2_REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: OAUTH2_REFRESH_TOKEN });

const sentMail = async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const OAUTH2_ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    const transport = mailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: OAUTH2_USER,
        clientId: OAUTH2_CLIENT_ID,
        clientSecret: OAUTH2_CLIENT_SECRET,
        refreshToken: OAUTH2_REFRESH_TOKEN,
        accessToken: OAUTH2_ACCESS_TOKEN,
      }
    });

    const mailOptions = {
      from: `DotPharma <${process.env.EMAIL_SENDER}>`,
      to: emailTo,
      subject,
      html: template,
      generateTextFromHTML: true,
    };

    const res = await transport.sendMail(mailOptions);
    res.accepted ? console.log(`PID: ${process.pid} === EMAIL SENT ===`)
      : console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);

    return res;
  } catch (error) {
    return error;
  }
};

export default sentMail;

// sentMail('ericrukundo005@gmail.com', 'Greetings', '<H1>Hello There</h1>').then((results) => {
//   console.log(results);
// }).catch((error) => {
//   console.log(error);
// });
