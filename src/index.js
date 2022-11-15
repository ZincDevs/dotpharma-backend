/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routers';
import credentials from './middleware/Credentials';
import { allowCORS, serverConfig, cloudConfigure } from './config';
import db from './db/models/index';

dotenv.config();

const { sequelize: dbCon } = db;
const app = express();
const { port } = serverConfig;
cloudConfigure();
app
  .use(express.json())
  .use(express.json({ limit: '25mb' }))
  .use(express.urlencoded({ limit: '25mb', extended: true }))
  .use(express.urlencoded({ extended: false }))
  .use(credentials)
  .use(allowCORS)
  .use(logger('dev'))
  .use(cookieParser())
  .use('/', api)
  .set('port', port);

dbCon
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database succesfully connected ✅\nPID: ${process.pid} Server listening on port: ${port} in ${process.env.NODE_ENV} mode 😊`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
