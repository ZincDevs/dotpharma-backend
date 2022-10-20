import 'regenerator-runtime';
import express from 'express';
import User from './_user';
import Pharmacy from './_pharmacy';
import Doctor from './_doctor';
import Medicine from './_medicine';
import Order from './_order';
import Appointment from './_appointment';
import Patient from './_patient';
import Tip from './_healthtips';
import UploadFile from './_fileappload';
import Cart from './_cart';
import Tag from './_tags';

const api = express();

api.use('/user', User);
api.use('/pharmacy', Pharmacy);
api.use('/doctor', Doctor);
api.use('/medicine', Medicine);
api.use('/orders', Order);
api.use('/appointments', Appointment);
api.use('/patient', Patient);
api.use('/healthtips', Tip);
api.use('/tags', Tag);
api.use('/cart', Cart);
api.use('/file', UploadFile);
api.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    message: 'Welcome to primary mis',
  });
});
api.use('/', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Page not found',
  });
});

export default api;
