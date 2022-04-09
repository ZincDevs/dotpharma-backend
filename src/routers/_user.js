import express from "express";
import User from "../controllers/UserController";
import Auth from "../middleware/Auth";
import Validator from "../middleware/_validator";
import UserMiddle from "../middleware/user";

const router = express.Router();
// Here user is added by admin
router.post(
  "/createuser",
  Validator("createuser"),
  Auth.verifyToken,
  UserMiddle.checkUserExists,
  User.createUser
);
//Here register them selves
router.post(
  "/signup",
  Validator("signup"),
  UserMiddle.checkUserExists,
  User.createUser
);

router.post("/login", Validator("login"), User.login);

export default router;
