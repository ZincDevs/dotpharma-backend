/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import 'regenerator-runtime';
import mailer from 'nodemailer';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();
const CLIENT_ID = '937522408556-v86n6sgj5t7bnru2tj2tqlrjnrojf9n0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//043eGUCffxiUiCgYIARAAGAQSNwF-L9IrCCoQWuvj68EHCToek45w6k4H3VfgoovQVdSixna_TbRNrFzQ5kvKmi4mIAS5dDZaaEs';
const USER = 'dotpharma212@gmail.com';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async (emailTo, subject, template) => {
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

    //   const transporter = mailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       type: 'OAuth2',
    //       user: process.env.EMAIL_SENDER,
    //       clientId: '327280420092-o196gt7q0hcrdpj51c9vqhqb3tgn85pk.apps.googleusercontent.com',
    //       clientSecret: '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',
    //       accessToken: 'ya29.A0ARrdaM9PYiy1Dk_PJKzSa4-J6DLoM_lOVC0S9ETOpZdRkT3lUVlZ6eKUGZkOvcZ-hvCy4UtjItBMk-3vChcCky1uV3_V3aCEZb32WTo99RXWhfF6VjaNRfwpaNkGDISVb6znYvhhjsNsqjwG-YaLT75HRAYi',
    //     }
    //   });

    //   const mailOptions = {
    //     from: `DotPharma<${process.env.EMAIL_SENDER}>`,
    //     to: emailTo,
    //     subject,
    //     text: 'Hello',
    //     html: template,
    //     auth: {
    //       user: process.env.EMAIL_SENDER,
    //       refreshToken: '1//04rAqukGDI78CCgYIARAAGAQSNwF-L9Ir99quhuUpBZpTbe85JOxm3b4jVmj5J7Ym5Napn4PZfVuBGsZGuIVbLxOEp5GTE8xXCFs',
    //       accessToken: 'ya29.A0ARrdaM9PYiy1Dk_PJKzSa4-J6DLoM_lOVC0S9ETOpZdRkT3lUVlZ6eKUGZkOvcZ-hvCy4UtjItBMk-3vChcCky1uV3_V3aCEZb32WTo99RXWhfF6VjaNRfwpaNkGDISVb6znYvhhjsNsqjwG-YaLT75HRAYi',
    //       expires: 1494388182480
    //     }
    //   };

    //   transporter.sendMail(mailOptions, (error, response) => {
    //     if (error) {
    //       console.log(error);
    //       console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);
    //     } else {
    //       console.log(response);
    //       console.log(`PID: ${process.pid} === EMAIL SENT ===`);
    //     }
    //     transporter.close();
    //   });

    return res;
  } catch (error) {
    return error;
  }
};
