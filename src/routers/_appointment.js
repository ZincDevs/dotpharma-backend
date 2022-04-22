import 'regenerator-runtime';
import express from 'express';
import DataExistsChecks from '../middleware/CheckDataExists';
import AppointmentController from '../controllers/AppointmentController';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';

const router = express.Router();

router.post(
  '/makeappointment',
  Validator('appointment'),
  Auth.verifyToken,
  User.checkIsPatient,
  DataExistsChecks.checkDoctorExists,
  DataExistsChecks.checkPatientExists,
  AppointmentController.createAppointment
);

router.get(
  '/findall',
  Auth.verifyToken,
  User.checkISAdmin,
  AppointmentController.findAll
);

router.get(
  '/findrejected',
  Auth.verifyToken,
  User.checkISAdmin,
  AppointmentController.findRejected
);

router.get(
  '/findapproved',
  Auth.verifyToken,
  User.checkISAdmin,
  AppointmentController.findApproved
);

router.put(
  '/rejectappointment/:aid',
  Auth.verifyToken,
  User.checkISAdmin,
  AppointmentController.reject
);

router.put(
  '/approveappointment/:aid',
  Auth.verifyToken,
  User.checkISAdmin,
  AppointmentController.approve
);
export default router;