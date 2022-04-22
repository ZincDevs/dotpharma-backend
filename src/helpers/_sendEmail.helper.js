/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import 'regenerator-runtime';
import mailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const transporter = mailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        clientId: '327280420092-o196gt7q0hcrdpj51c9vqhqb3tgn85pk.apps.googleusercontent.com',
        clientSecret: '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'
      }
    });

    const mailOptions = {
      from: `DotPharma<${process.env.EMAIL_SENDER}>`,
      to: emailTo,
      subject,
      text: 'Hello',
      html: template,
      auth: {
        user: process.env.EMAIL_SENDER,
        refreshToken: '1//04rAqukGDI78CCgYIARAAGAQSNwF-L9Ir99quhuUpBZpTbe85JOxm3b4jVmj5J7Ym5Napn4PZfVuBGsZGuIVbLxOEp5GTE8xXCFs',
        access_token: "ya29.A0ARrdaM9PYiy1Dk_PJKzSa4-J6DLoM_lOVC0S9ETOpZdRkT3lUVlZ6eKUGZkOvcZ-hvCy4UtjItBMk-3vChcCky1uV3_V3aCEZb32WTo99RXWhfF6VjaNRfwpaNkGDISVb6znYvhhjsNsqjwG-YaLT75HRAYi',",
        accessToken: 'ya29.A0ARrdaM9PYiy1Dk_PJKzSa4-J6DLoM_lOVC0S9ETOpZdRkT3lUVlZ6eKUGZkOvcZ-hvCy4UtjItBMk-3vChcCky1uV3_V3aCEZb32WTo99RXWhfF6VjaNRfwpaNkGDISVb6znYvhhjsNsqjwG-YaLT75HRAYi',
        expires: 1494388182480
      }
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);
      } else {
        console.log(response);
        console.log(`PID: ${process.pid} === EMAIL SENT ===`);
      }
      transporter.close();
    });

    return mailOptions;
  } catch (error) {
    return error;
  }
};
