import express from 'express';
import User from './_user';
import Pharmacy from './_pharmacy';
import Doctor from './_doctor';
import Medicine from './_medicine';
import Order from './_order';
import Appointment from './_appointment';

const api = express();

api.use('/api/user', User);
api.use('/api/pharmacy', Pharmacy);
api.use('/api/doctor', Doctor);
api.use('/api/medicine', Medicine);
api.use('/api/orders', Order);
api.use('/api/appointments', Appointment);
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
