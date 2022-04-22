/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
// import 'regenerator-runtime';
const mailer = require('nodemailer');
const dotenv = require('dotenv');
const { google } = require('googleapis');

dotenv.config();
const CLIENT_ID = '937522408556-v86n6sgj5t7bnru2tj2tqlrjnrojf9n0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//043eGUCffxiUiCgYIARAAGAQSNwF-L9IrCCoQWuvj68EHCToek45w6k4H3VfgoovQVdSixna_TbRNrFzQ5kvKmi4mIAS5dDZaaEs';
const USER = 'zincdevs@gmail.com';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sentMail = async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    const transport = mailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
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
