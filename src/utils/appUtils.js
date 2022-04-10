/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { generate } from "generate-password";

import { STATUSES } from "../constants/ResponseStatuses";
import { MESSAGES } from "../constants/ResponceMessages";

dotenv.config();

export const sendEmail = async (emailTo, sender, message, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
    return info;
  } catch (error) {
    console.log(error);
  }
};

export const genPass = (autoGen = true, pass = null) => {
  let passN=autoGen?  generate({
    length: 10,
    numbers: true,
  }):pass;
  console.log(passN);
  return autoGen
    ? bcrypt.hashSync(
      passN,
        10
      )
    : bcrypt.hashSync(passN, 10);
};

export const getPagination = (page, size) => {
  const limit = size ? size : 20;
  const offset = page ? (page-1) * limit : 0;
  return { limit, offset };
};

export const createOrder = async (patientRes, dataOrder, db, ...queries) => {
  const mDataOrder = [
    ...dataOrder.slice(0, 1),
    patientRes.rows[0].p_id,
    ...dataOrder.slice(1),
  ];
  const orderRes = await db.query(queries[0], mDataOrder);
  if (orderRes.rows.length > 0) {
    const pharmaRes = await db.query(queries[1], [orderRes.rows[0].o_pharmacy]);
    const resData = patientRes.rows[0];
    resData.order = orderRes.rows[0];
    resData.pharmacyEmail = pharmaRes.rows[0].ph_email;
    return {
      status: STATUSES.CREATED,
      message: `Order ${MESSAGES.CREATED}`,
      data: resData,
    };
  }
  return {
    status: STATUSES.BAD_REQUEST,
    message: `Order ${MESSAGES.NOT_CREATED}`,
    data: [],
  };
};
