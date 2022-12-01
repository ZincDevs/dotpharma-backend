import 'regenerator-runtime';
import express from 'express';
import ClinicsController from '../controllers/ClinicsController';
import Auth from '../middleware/Auth';
import AccessLevel from '../middleware/user';

const router = express.Router();

router.post(
  '/createclinic',
  Auth.verifyAccessToken,
  ClinicsController.createClinic
);
router.get(
  '/findall',
  ClinicsController.findAll
);
router.put('/updateclinic/:c_id', Auth.verifyAccessToken, AccessLevel.checkISAdmin, ClinicsController.updatePharmacy);
router.delete('/deleteclinic/:c_id', Auth.verifyAccessToken, AccessLevel.checkISAdmin, ClinicsController.deletePharmacy);
export default router;
