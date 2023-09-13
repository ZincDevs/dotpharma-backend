/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const sendSms = async (smsData) => {
  console.log(`PID: ${process.pid} === SENDING SMS ===`);
  await axios.post(
    process.env.PINDO_URL,
    {
      sender: smsData.sender,
      to: process.env.DOTPHARMA_PHONE_SMS_TO,
      text: smsData.body
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.PINDO_TOKEN}`,
      }
    }
  );
};
