import { Router } from 'express';
const router = Router();

router.get('/',(req,res)=>{
    res.send('webhook works');
});

export default router;