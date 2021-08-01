import { Jot } from '@makarandkate/amlogger';
import { Request,Response } from 'express';
import Payment, { IPaymentStage } from '../../app/models/Payment';
import { setPage } from '../../app/Page';
import Config from '../../config/Config';


const indexRouter=async (req:Request,res:Response)=>{
    setPage(req,res,{
        title:"AwesomeSite",
        description: '',
        view:"index"
    })
}


export {indexRouter};