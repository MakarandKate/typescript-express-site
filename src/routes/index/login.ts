
import { Request,Response } from 'express';


const loginRouter=async (req:Request,res:Response)=>{
    res.send({body:JSON.stringify(req.body)});
}


export {loginRouter};