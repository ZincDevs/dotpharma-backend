/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { generate } from 'generate-password';

dotenv.config();

export const sendEmail = async (emailTo, sender, message, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.PASSWORD_EMAIL_SENDER,
      },
    });

    const info = await transporter.sendMail({
      from: `"${sender}" <${process.env.EMAIL_SENDER}>`,
      to: emailTo,
      subject,
      text: message,
    });
    return { status: 200, info };
  } catch (error) {
    console.log(error);
  }
};

export const genPass = (autoGen = true, pass = null) => {
  const passN = autoGen ? generate({
    length: 10,
    numbers: true,
  }) : pass;
  console.log(passN);
  return autoGen
    ? bcrypt.hashSync(
      passN,
      10
    )
    : bcrypt.hashSync(passN, 10);
};

export const getPagination = (page, size) => {
  const limit = size || 20;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};
