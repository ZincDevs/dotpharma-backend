import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 7890,
  env: process.env.NODE_ENV,
  host: process.env.SERVER
};
