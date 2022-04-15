/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import db from '../connection/_query';
import { create } from '../queries/User';

dotenv.config();
const user = [
  uuidv4(),
  process.env.ADMIN_EMAIL,
  bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
  'SUPER_ADMIN',
  moment(new Date()),
  'valid'
];

db.query(create, user).then((userResponse) => {
  console.log(userResponse.rows[0]);
}).catch((err) => {
  console.log(err);
});
