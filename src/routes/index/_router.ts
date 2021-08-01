import { Router } from 'express';
const router = Router();


import {indexRouter} from './index';
router.get('/',indexRouter);


import {homeRouter} from './home';
router.get('/home',homeRouter);


import {loginRouter} from './login';
router.post('/login',loginRouter);


import {registerRouter} from './register';
router.get('/register',registerRouter);
router.post('/register',registerRouter);

export default router;