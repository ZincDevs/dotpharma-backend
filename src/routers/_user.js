import 'regenerator-runtime';
import express from 'express';
import User from '../controllers/UserController';
import Auth from '../middleware/Auth';
import Validator from '../middleware/_validator';
import UserMiddle from '../middleware/user';
import Paginate from '../middleware/Paginate';

const router = express.Router();
// Here user is added by admin
router.post('/createuser', Validator('createuser'), Auth.verifyToken, UserMiddle.checkUserExists, User.createUser);
// Here register them selves
router.post('/signup', Validator('signup'), UserMiddle.checkUserExists, User.signup);
router.put('/updateuser/:uid', Validator('updateuser'), Auth.verifyToken, User.update);
router.get('/allusers', Auth.verifyToken, Paginate, User.findAll);
router.delete('/deleteuser/:uid', Auth.verifyToken, User.destroy);

router.put('/request-password-reset', Validator('resetpass'), Auth.verifyToken, User.requestPasswordReset);

router.put('/activateuser/:token', Auth.verifyToken2, User.validateUserAccount);
router.post('/resendverification', UserMiddle.checkUserExists2, User.resendVerification);

// Authentication and authorization
router.post('/login', UserMiddle.checkUserExists2, Auth.checkCredentials, User.login);
router.get('/logout', User.logout);
router.get('/refresh-token', User.refreshToken);
router.post('/admin/login', UserMiddle.checkUserExists2, UserMiddle.checkISAdmin, User.login);

export default router;
