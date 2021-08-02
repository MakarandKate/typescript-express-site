import {Request,Response} from 'express';
import Config, { Env } from '../config/Config';

function setPage(req:Request,res:Response,pageOptions:{
    title:string,
    description:string,
    view:string,
    data?:any
}){
    let isLoggedIn=false;
    if(req.session.uid){
        isLoggedIn=true;
    }
    res.render(pageOptions.view,{
        isDev:Config.Env==Env.dev,
        title:pageOptions.title,
        description:pageOptions.description,
        isLoggedIn,
        data:pageOptions.data,
    })
}

export {setPage};