
import { Request,Response } from 'express';
import { setPage } from '../../app/Page';


const indexRouter=async (req:Request,res:Response)=>{
    if(req.session.uid){
        res.redirect('/home');
    }
    setPage(req,res,{
        title:"AwesomeSite",
        description: '',
        view:"index"
    })
}


export {indexRouter};