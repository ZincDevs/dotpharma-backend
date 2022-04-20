import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';
import HealthTipController from '../controllers/HealthTipsController';
import DataExistsChecks from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createnew',
  Validator('tips'),
  Auth.verifyToken,
  User.checkISAdmin,
  DataExistsChecks.checkUserExists,
  HealthTipController.create
);

router.put(
    '/updatetip/:hid',
    Validator('tips'),
    Auth.verifyToken,
    User.checkISAdmin,
    DataExistsChecks.checkUserExists,
    HealthTipController.update
  );
  router.get(
    '/getall',
    HealthTipController.findAll
  );
  router.get(
    '/getonetip/:hid',
    HealthTipController.findById
  );
  router.delete(
    '/deletetip/:hid',
    Auth.verifyToken,
    User.checkISAdmin,
    HealthTipController.delete
  );

export default router;