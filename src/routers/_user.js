import express from 'express';
import User from '../controllers/UserController';
import Auth from '../middleware/Auth';
import Validator from '../middleware/_validator';
import UserMiddle from '../middleware/user';

const router = express.Router();
// Here user is added by admin
router.post(
  '/createuser',
  Validator('createuser'),
  Auth.verifyToken,
  UserMiddle.checkUserExists,
  User.createUser
);
// Here register them selves
router.post(
  '/signup',
  Validator('signup'),
  UserMiddle.checkUserExists,
  User.signup
);

router.put(
  '/updateuser/:uid',
  Validator('updateuser'),
  Auth.verifyToken,
  User.update
);

router.put(
  '/resetpassword',
  Validator('resetpass'),
  Auth.verifyToken,
  User.resetPassword
);

router.delete(
  '/deleteuser/:uid',
  Auth.verifyToken,
  User.destroy
);

router.get(
  '/allusers',
  Auth.verifyToken,
  User.findAll
);
router.post('/login', Validator('login'), User.login);

router.put(
  '/activateuser/:token',
  Auth.verifyToken2,
  User.validateUserAccount
);

export default router;
