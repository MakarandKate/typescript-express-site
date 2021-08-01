import {Request,Response} from 'express';
import Config, { Env } from '../config/Config';

function setPage(req:Request,res:Response,pageOptions:{
    title:string,
    description:string,
    view:string,
    data?:any
}){
    res.render(pageOptions.view,{
        isDev:Config.Env==Env.dev,
        title:pageOptions.title,
        description:pageOptions.description,
        data:pageOptions.data,
    })
}

export {setPage};