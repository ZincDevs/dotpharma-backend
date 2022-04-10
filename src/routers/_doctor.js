import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import DoctorController from '../controllers/DoctorController';

const router = express.Router();

router.post(
  '/createnew',
  Validator('doctor'),
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  DoctorController.createNew
);

router.put(
  '/updatedoctor/:did',
  Validator('doctor'),
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  DoctorController.updateDoctor
);

router.get(
  '/findall',
  DoctorController.findAll
);
router.delete(
  '/deletedoctor/:did',
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  DoctorController.deleteDoctor
);

export default router;
