import express from 'express';
import PaymentController from '../controllers/PaymentController';

const router = express.Router();

router.post('/createpayment', PaymentController.sendPayment);

router.post('/verifypayment', PaymentController.verifyPayment);

export default router;
