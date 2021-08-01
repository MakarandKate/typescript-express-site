
import { Request,Response } from 'express';
import { queryAsync } from '../../app/Db';
import { setPage } from '../../app/Page';
import { DbConfig } from '../../config/Config';


const registerRouter=async (req:Request,res:Response)=>{
    let {username,name,password} = req.body;
    if(username){
        let row=await queryAsync(DbConfig.primary,`
            INSERT INTO 
                user
            (name,username,pass,created_stamp)
            VALUES
            ('${name}','${username}','${password}',${+new Date()})
        `);
        if(row.insertId){
            
            req.session.uid=row.insertId;
            res.redirect('/home');
        }else{
            res.send("error");
        }
    }else{
        setPage(req,res,{
            title:"AwesomeSite",
            description: '',
            view:"register"
        })
    }
    
}


export {registerRouter};