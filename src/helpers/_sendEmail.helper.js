/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import mailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async (emailTo, subject, template) => {
  console.log(`PID: ${process.pid} === SENDING EMAIL ===`);
  try {
    const transporter = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      tls: {
        ciphers: 'SSLv3'
      },
      from: process.env.EMAIL_SENDER,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_EMAIL_SENDER,
      },
    });

    const res = await transporter.sendMail({
      from: `DotPharma<${process.env.EMAIL_SENDER}>`,
      to: emailTo,
      subject,
      text: 'Hello',
      html: template
    });

    res.accepted ? console.log(`PID: ${process.pid} === EMAIL SENT ===`)
      : console.log(`PID: ${process.pid} === EMAIL NOT SENT ===`);

    return res;
  } catch (error) {
    return error;
  }
};
