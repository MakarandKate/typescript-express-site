
import { Request,Response } from 'express';
import { queryAsync } from '../../app/Db';
import { setPage } from '../../app/Page';
import { DbConfig } from '../../config/Config';
import {Md5} from "md5-typescript";

const oviRouter=async (req:Request,res:Response)=>{
    let sid=req.params.sid;
    res.send({
        host:'https://esigning.in',
        sid,
        kyc:[
            {
                name:'firstName',
                required:true
            },
            {
                name:'lastName',
                required:true
            },
            {
                name:'email',
                required:true
            },
            {
                name:'dob',
                required:false
            }
        ]
    })
}

const ovLoginRouter=async (req:Request,res:Response)=>{
    let kyc=req.body.kyc;
    let kycObj=JSON.parse(kyc);
    let firstName=kycObj['firstName'];
    let lastName=kycObj['lastName'];
    let email=kycObj['email'];

    let checkUser=(await queryAsync(DbConfig.primary,`
        SELECT
            *
        FROM
            user
        WHERE
            username='${email}'
    `))[0];
    if(checkUser && checkUser.id){
        req.session.uid=checkUser.id;
        res.redirect('/home');
    }else{
        let row=await queryAsync(DbConfig.primary,`
            INSERT INTO 
                user
            (name,username,pass,created_stamp)
            VALUES
            ('${firstName+' '+lastName}','${email}','${Md5.init('~~'+email+'~~')}',${+new Date()})
        `);
        if(row.insertId){
            
            req.session.uid=row.insertId;
            res.redirect('/home');
        }else{
            res.send("error");
        }
    }
    
}


export {oviRouter,ovLoginRouter};