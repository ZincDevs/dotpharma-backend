import 'regenerator-runtime';
import express from 'express';
import Pharmacy from '../controllers/PharmacyController';
import Validator from '../middleware/_validator';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import DataExistsChecks from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createnew',
  Validator('pharmacy'),
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  Pharmacy.CreatePharmacy
);
router.put(
  '/updatepharmacy/:ph_id',
  Validator('pharmacy'),
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  Pharmacy.updatePharmacy
);
router.delete(
  '/deletepharmacy/:ph_id',
  Auth.verifyAccessToken,
  AccessLevel.checkISAdmin,
  Pharmacy.deletePharmacy
);
router.get(
  '/findall',
  // Auth.verifyToken,
  // AccessLevel.checkISAdmin,
  Pharmacy.findAll
);
router.post(
  '/addmedtopharma',
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  DataExistsChecks.checkPharmacyExists,
  DataExistsChecks.checkPatientExists,
  Pharmacy.addMedicineToPharma
);

export default router;
