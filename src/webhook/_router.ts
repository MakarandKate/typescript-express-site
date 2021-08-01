import { Router } from 'express';
const router = Router();


import indexRouter from './index';
router.use('/',indexRouter);


export default router;