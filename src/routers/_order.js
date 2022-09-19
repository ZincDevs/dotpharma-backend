import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import OrderController from '../controllers/OrderController';
import DataExistsChecks from '../middleware/CheckDataExists';
import Auth from '../middleware/Auth';
import User from '../middleware/user';

const router = express.Router();

router.post(
  '/createorder',
  // Validator('order'),
  Auth.verifyAccessToken,
  // User.checkIsPatient,
  // DataExistsChecks.checkPharmacyExists,
  // DataExistsChecks.checkPatientExists,
  OrderController.createNewOrder
);

router.put(
  '/updateorder/:o_id',
  Validator('order'),
  Auth.verifyToken,
  User.checkISAdmin,
  DataExistsChecks.checkPharmacyExists,
  DataExistsChecks.checkPatientExists,
  OrderController.update
);

router.delete(
  '/deleteorder/:o_id',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.deleteOrder
);

router.get(
  '/findall',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  OrderController.findAll
);
router.get(
  '/findrejected',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  OrderController.findRejected
);
router.get(
  '/findapproved',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  OrderController.findApproved
);

router.put(
  '/rejectorder/:o_id',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  OrderController.reject
);

router.put(
  '/approveorder/:o_id',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  OrderController.approve
);

export default router;
