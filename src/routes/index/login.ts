
import { Request,Response } from 'express';
import { queryAsync } from '../../app/Db';
import { DbConfig } from '../../config/Config';


const loginRouter=async (req:Request,res:Response)=>{
    let username=req.body.username;
    let password=req.body.password;

    let user=(await queryAsync(DbConfig.primary,`
        SELECT 
            *
        FROM
            user
        WHERE
            username='${username}' AND pass='${password}'
        LIMIT 1
    `))[0];
    if(user && user.id){
        req.session.uid=user.id;
        res.redirect('/home');
    }else{
        res.send("Wrong credentials");
    }
}


export {loginRouter};