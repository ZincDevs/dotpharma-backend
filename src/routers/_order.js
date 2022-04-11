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

router.put(
  '/updateorder/:oid',
  Validator('order'),
  Auth.verifyToken,
  User.checkISAdmin,
  DataExistsChecks.checkPharmacyExists,
  DataExistsChecks.checkPatientExists,
  OrderController.update
);

router.delete(
  '/deleteorder/:oid',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.deleteOrder
);

router.get(
  '/findall',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.findAll
);
router.get(
  '/findrejected',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.findRejected
);
router.get(
  '/findapproved',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.findApproved
);

router.put(
  '/rejectorder/:oid',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.reject
);

router.put(
  '/approveorder/:oid',
  Auth.verifyToken,
  User.checkISAdmin,
  OrderController.approve
);

export default router;
