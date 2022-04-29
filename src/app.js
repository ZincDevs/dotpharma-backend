/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routers';
import globlaMiddleWare from './middleware/_global_middle_ware';
import {
  corsConfig,
  serverConfig,
  cloudConfigure
} from './config';
import db from './db/models/index';

dotenv.config();

const {
  sequelize: dbCon
} = db;
const app = express();
const {
  port,
} = serverConfig;
cloudConfigure();
globlaMiddleWare(app);
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cors())
  .use('/', api)
  .use(logger('dev'))
  .set('port', port);

dbCon.sync().then(() => {
  app.listen(port, () => {
    console.log(`Database succesfully connected ✅\nPID: ${process.pid} Server listening on port: ${port} in ${process.env.NODE_ENV} mode 😊`);
  });
}).catch((error) => {
  console.log(error);
});

export default app;
