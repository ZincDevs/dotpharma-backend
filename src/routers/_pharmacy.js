import Pharmacy from '../controllers/PharmacyController';
import Validator from '../middleware/_validator';
import express from 'express';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';
import DataExistsChecks from '../middleware/CheckDataExists';

const router = express.Router();

router.post(
  '/createnew',
  Validator('pharmacy'),
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  Pharmacy.CreatePharmacy
);
router.put(
  '/updatepharmacy/:phid',
  Validator('pharmacy'),
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  Pharmacy.updatePharmacy
);
router.delete(
  '/deletepharmacy/:pid',
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  Pharmacy.deletePharmacy
);
router.get('/findall', Pharmacy.findAll);
router.post(
  '/addmedtopharma',
  Auth.verifyToken,
  AccessLevel.checkISAdmin,
  DataExistsChecks.checkPharmacyExists,
  DataExistsChecks.checkPatientExists,
  Pharmacy.addMedicineToPharma
);

export default router;
