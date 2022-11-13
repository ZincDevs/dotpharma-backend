import 'regenerator-runtime';
import express from 'express';
import ClinicsController from '../controllers/ClinicsController';
// import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
// import User from '../middleware/user';
// import Paginate from '../middleware/Paginate';
// import CheckDataExists from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createclinic',
  // Validator('appointment'),
  Auth.verifyAccessToken,
  // User.checkIsPatient,
  // CheckDataExists.checkDoctorExists,
  ClinicsController.createClinic
);

router.get(
  '/findall',
  ClinicsController.findAll
);

export default router;
