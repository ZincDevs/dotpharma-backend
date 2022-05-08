/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import 'regenerator-runtime';
import express from 'express';
import User from '../controllers/UserController';
import Auth from '../middleware/Auth';
import Validator from '../middleware/_validator';
import UserMiddle from '../middleware/user';
import Paginate from '../middleware/Paginate';

const {
  verifyAccessToken,
  verifyUserVerificationToken,
  verifyUPasswordResetToken
} = Auth;

const router = express.Router();

// Authentication and authorization
router.post('/login', UserMiddle.checkUserExists2, Auth.checkCredentials, User.login);
router.get('/logout', User.logout);
router.get('/refresh-token', User.refreshToken);
router.post('/admin/login', UserMiddle.checkUserExists2, UserMiddle.checkISAdmin, User.login);
router.post('/googleauth', User.googleAuth);

// User verirication and confirmation
router.put('/activateuser/:token', verifyUserVerificationToken, User.verifyUserAccount);
router.post('/resendverification', UserMiddle.checkUserExists2, User.resendVerification);

// Users && signup
router.post('/createuser', Validator('createuser'), verifyAccessToken, UserMiddle.checkUserExists, User.createUser);
router.post('/signup', Validator('signup'), UserMiddle.checkUserExists, User.signup);
router.put('/updateuser/:uid', Validator('updateuser'), verifyAccessToken, User.update);
router.get('/allusers', verifyAccessToken, Paginate, User.findAll);
router.delete('/deleteuser/:uid', verifyAccessToken, User.destroy);

// Password reset
router.post('/request-password-reset', UserMiddle.checkUserExists2, User.requestPasswordReset);
router.put('/apply-password-reset/:token', Validator('resetpass'), verifyUPasswordResetToken, User.confirmPasswordReset);
router.post('/resend-password-reset', UserMiddle.checkUserExists2, User.resendPasswordReset);

export default router;
