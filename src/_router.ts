import { Router } from 'express';

const router = Router();


import routesRouter from './routes/_router';
router.use('/',routesRouter);

import apiRouter from './api/_router';
router.use('/api',apiRouter);

import webHookRouter from './webhook/_router';
router.use('/webhook',webHookRouter);


export default router;