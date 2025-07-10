import express from 'express';
import { getPayment } from '../controllers/payment.js';

const router = express.Router();

router.post('/payment-service', getPayment);

export default router;
