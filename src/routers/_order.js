import express from 'express';
import Validator from '../middleware/_validator';
import OrderController from '../controllers/OrderController';
import DataExistsChecks from '../middleware/CheckDataExists';
import Auth from '../middleware/Auth';
import User from '../middleware/user';

const router = express.Router();

router.post(
  '/createorder',
  Validator('order'),
  Auth.verifyToken,
  User.checkIsPatient,
  DataExistsChecks.checkPharmacyExists,
  DataExistsChecks.checkPatientExists,
  OrderController.createNewOrder
);

export default router;
