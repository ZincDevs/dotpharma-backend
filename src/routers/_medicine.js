import 'regenerator-runtime';
import express from 'express';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import MedicineController from '../controllers/MedicineController';
import Paginate from '../middleware/Paginate';

const router = express.Router();

router.post(
  '/createnew',
  Validator('medicine'),
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  MedicineController.createMedicine
);

router.put(
  '/updatemedicine/:m_id',
  Validator('medicine'),
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  MedicineController.updateMedicine
);
router.get(
  '/getallmedicines',
  Paginate,
  MedicineController.findAll
);

router.delete(
  '/deletemedicine/:m_id',
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  MedicineController.deleteMedicine
);

router.get(
  '/findbyid/:m_id',
  MedicineController.findById
);

export default router;
