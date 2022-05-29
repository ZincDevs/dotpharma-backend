import 'regenerator-runtime';
import express from 'express';
import AppointmentController from '../controllers/AppointmentController';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';
import Paginate from '../middleware/Paginate';

const router = express.Router();

router.post(
  '/makeappointment',
  Validator('appointment'),
  Auth.verifyAccessToken,
  User.checkIsPatient,
  AppointmentController.createAppointment
);

router.get(
  '/findall',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  Paginate,
  AppointmentController.findAll
);

router.get(
  '/doctorappointments',
  Auth.verifyAccessToken,
  User.chekIsDoctor,
  Paginate,
  AppointmentController.findDoctorAppointment
);

router.get(
  '/findrejected',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  AppointmentController.findRejected
);

router.get(
  '/findapproved',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  AppointmentController.findApproved
);

router.put(
  '/rejectappointment/:aid',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  AppointmentController.reject
);

router.put(
  '/approveappointment/:aid',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  AppointmentController.approve
);
export default router;
