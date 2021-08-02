
import { Request,Response } from 'express';
import { queryAsync } from '../../app/Db';
import { setPage } from '../../app/Page';
import { DbConfig } from '../../config/Config';


const homeRouter=async (req:Request,res:Response)=>{
    if(!req.session.uid){
        res.redirect('/');
    }

    let uid=req.session.uid;
    let user=(await queryAsync(DbConfig.primary,`
        SELECT
            *
        FROM
            user
        WHERE
            id='${uid}'
    `))[0];
    user.created_stamp=new Date(user.created_stamp);
    setPage(req,res,{
        title:"AwesomeSite",
        description: '',
        view:"home",
        data:{
            user
        }
    })
}


export {homeRouter};