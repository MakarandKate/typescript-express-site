import {Request,Response} from 'express';
import Config, { Env } from '../config/Config';
import md5 from 'md5';
export default class Util{
    public static generateDigest(phone:string):string{
        return md5(phone+Config.sessionSecret);
    }
}


export {Util};