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
  Auth.verifyAccessToken,
  ClinicsController.createClinic
);
router.get(
  '/findall',
  ClinicsController.findAll
);
router.put('/updateclinic/:c_id', ClinicsController.updatePharmacy);
router.delete('/deleteclinic/:c_id', ClinicsController.deletePharmacy);
export default router;
