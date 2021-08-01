import { Jot } from '@makarandkate/amlogger';
import { Request,Response } from 'express';
import Payment, { IPayment, IPaymentGateway, IPaymentStage } from '../../app/models/Payment';
import Util from '../../app/Utils';
import Config, { Env } from '../../config/Config';

const createPaymentRequestRouter=async (req:Request,res:Response)=>{
    Jot.debug("createPaymentRequestRouter:1");
    const amount:number=req.body.amount;
    Jot.debug("createPaymentRequestRouter:2",amount);

    let paymentRequest=new IPayment(null);
    Jot.debug("createPaymentRequestRouter:3",paymentRequest);


    paymentRequest.amount=amount;
    paymentRequest.stage=IPaymentStage.Generate;
    paymentRequest.payementGateway=IPaymentGateway.RazerPay;

    let pR=await Payment.createRequest(paymentRequest);
    Jot.debug("createPaymentRequestRouter:4",pR);

    if(pR){
        res.send({
            status:"success",
            pR
        })
    }else{
        res.send({
            status:"failed"
        })
    }
    
    
}


export {
    createPaymentRequestRouter
};