
import { Request,Response } from 'express';


const logoutRouter=async (req:Request,res:Response)=>{
    
    if(req.session.uid){
        delete req.session.uid;
    }
    res.redirect('/');
}


export {logoutRouter};