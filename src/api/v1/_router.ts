import { Router } from 'express';
const router = Router();

import {createPaymentRequestRouter} from './createPaymentRequest';
router.post('/createPaymentRequest',createPaymentRequestRouter);


export default router;