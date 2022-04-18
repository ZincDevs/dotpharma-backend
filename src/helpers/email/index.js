/* eslint-disable import/prefer-default-export */
import mailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (emailTo, subject, template) => {
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
    return res;
  } catch (error) {
    return error;
  }
};

export { sendEmail };
