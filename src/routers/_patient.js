import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import User from '../middleware/user';
import PatientController from '../controllers/PatientController';
import Paginate from '../middleware/Paginate';

const router = express.Router();

router.put(
  '/update/:p_id',
  Validator('patient'),
  Auth.verifyAccessToken,
  User.checkIsPatient,
  PatientController.update
);
router.get(
  '/allpatients',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  Paginate,
  PatientController.findAll
);
router.get(
  '/getbyid/:p_id',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  PatientController.findById
);

router.delete(
  '/deletepatient/:p_id',
  Auth.verifyAccessToken,
  User.checkISAdmin,
  PatientController.deletePatient
);
export default router;
