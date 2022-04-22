import 'regenerator-runtime';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

export default (app) => {
  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cors())
    .use(morgan('dev'));
};
