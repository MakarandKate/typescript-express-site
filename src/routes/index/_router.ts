import { Router } from 'express';
const router = Router();


import {indexRouter} from './index';
router.get('/',indexRouter);

export default router;