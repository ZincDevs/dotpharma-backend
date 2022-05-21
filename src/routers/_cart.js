/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import 'regenerator-runtime';
import express from 'express';
import Cart from '../controllers/CartController';
import Auth from '../middleware/Auth';

const {
  verifyAccessToken,
} = Auth;

const router = express.Router();

// Authentication and authorization
router.post('/:m_id', verifyAccessToken, Cart.create);
router.put('/:c_id', verifyAccessToken, Cart.update);
router.delete('/:c_id', verifyAccessToken, Cart.destroy);

export default router;
