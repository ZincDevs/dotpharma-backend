import 'regenerator-runtime';
import express from 'express';
import AppointmentController from '../controllers/AppointmentController';
// import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';
import Paginate from '../middleware/Paginate';
// import CheckDataExists from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/makeappointment',
  // Validator('appointment'),
  Auth.verifyAccessToken,
  // User.checkIsPatient,
  // CheckDataExists.checkDoctorExists,
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
  '/doctorappointments/:d_id',
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
  '/rejectappointment/:a_id',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  AppointmentController.reject
);

router.put(
  '/approveappointment/:a_id',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  AppointmentController.approve
);
export default router;
