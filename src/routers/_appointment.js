import express from 'express';
import DataExistsChecks from '../middleware/CheckDataExists';
import AppointmentController from '../controllers/AppointmentController';

const router = express.Router();

router.post(
  '/makeappointment',
  DataExistsChecks.checkDoctorExists,
  DataExistsChecks.checkPatientExists,
  AppointmentController.createAppointment
);

export default router;