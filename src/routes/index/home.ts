
import { Request,Response } from 'express';
import { setPage } from '../../app/Page';


const homeRouter=async (req:Request,res:Response)=>{
    if(!req.session.uid){
        res.redirect('/');
    }
    setPage(req,res,{
        title:"AwesomeSite",
        description: '',
        view:"home"
    })
}


export {homeRouter};