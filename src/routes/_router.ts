import { Router } from 'express';
const router = Router();


import indexRouter from './index/_router';
router.use('/',indexRouter);

export default router;