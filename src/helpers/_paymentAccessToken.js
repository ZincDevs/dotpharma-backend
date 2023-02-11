/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const { PAY_PACK_REFRESH_TOKEN, PAY_PACK_API_LINK } = process.env;
export const getAccessToken = async () => {
  const response = await axios.get(`${PAY_PACK_API_LINK}/auth/refresh/${PAY_PACK_REFRESH_TOKEN}`);
  return response.data.access;
};
