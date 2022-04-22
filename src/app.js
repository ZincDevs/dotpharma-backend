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
import { corsConfig, serverConfig, cloudConfigure } from './config';

dotenv.config();

const app = express();
const { port, env, host } = serverConfig;
cloudConfigure();
globlaMiddleWare(app);
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use('/', api)
  .use(logger('dev'))
  .set('port', port)
  .listen(port, () => console.log(`Primary mis is app and running on PORT ${port} on server ${host} in ${env} mode `),);
export default app;
