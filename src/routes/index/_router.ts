import { Router } from 'express';
const router = Router();


import {indexRouter} from './index';
router.get('/',indexRouter);


import {oviRouter,ovLoginRouter} from './_ovi';
router.get('/_ovi/:sid',oviRouter);
router.post('/_ovi/login',ovLoginRouter);


import {logoutRouter} from './logout';
router.get('/logout',logoutRouter);


import {homeRouter} from './home';
router.get('/home',homeRouter);


import {loginRouter} from './login';
router.post('/login',loginRouter);


import {registerRouter} from './register';
router.get('/register',registerRouter);
router.post('/register',registerRouter);

export default router;