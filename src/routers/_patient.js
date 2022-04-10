import express from "express";
import Validator from "../middleware/_validator";
import Auth from "../middleware/Auth";
import User from "../middleware/user";
import CheckDataExists from "../middleware/CheckDataExists";
import PatientController from "../controllers/PatientController";

const router = express.Router();

router.post(
  "/createnew",
  Validator("patient"),
  CheckDataExists.checkPatientExistsForCreate,
  PatientController.createNew
);

router.put(
  "/update/:pid",
  Validator("patient"),
  Auth.verifyToken,
  PatientController.update
);
router.get(
  "/allpatients",
  Auth.verifyToken,
  User.checkISAdmin,
  PatientController.findAll
);
router.get(
  "/getbyid/:pid",
  Auth.verifyToken,
  User.checkISAdmin,
  PatientController.findById
);

router.delete(
  "/deletepatient/:pid",
  Auth.verifyToken,
  User.checkISAdmin,
  PatientController.deletePatient
);
export default router;
