import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import DoctorController from '../controllers/DoctorController';
import Paginate from '../middleware/Paginate';

const router = express.Router();

router.put(
  '/updatedoctor/:d_id',
  Validator('doctor'),
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  DoctorController.updateDoctor
);

router.get(
  '/findall',
  Paginate,
  DoctorController.findAll
);
router.delete(
  '/deletedoctor/:did',
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  DoctorController.deleteDoctor
);

export default router;
