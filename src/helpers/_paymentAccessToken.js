/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const { PAY_PACK_API_LINK, PAYPACK_APPICATION_ID, PAYPACK_APPICATION_SECRET } = process.env;
export const getAccessToken = async () => {
  const response = await axios.post(
    `${PAY_PACK_API_LINK}/auth/agents/authorize`,
    {
      client_id: PAYPACK_APPICATION_ID,
      client_secret: PAYPACK_APPICATION_SECRET
    }
  );
  return response.data.access;
};
