import 'regenerator-runtime';
import dotenv from 'dotenv';

dotenv.config();

export default [
  process.env.STAGING_ORIGIN,
  process.env.PRODUCTION_ORIGIN,
  process.env.DEVELOPMENT_ORIGIN,
  'http://localhost:8000',
  'http://localhost:3000',
  'http://localhost:3001',
];
