import express from 'express';
import Validator from '../middleware/_validator';
import OrderController from '../controllers/OrderController';
import DataExistsChecks from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createorder',
  Validator('patient'),
  DataExistsChecks.checkPharmacyExists,
  DataExistsChecks.checkPatientExists,
  OrderController.createNewOrder
);

export default router;
