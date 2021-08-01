
import * as mysql from 'mysql';
import Config, {  DbConfig } from '../config/Config';
import { Jot } from '@makarandkate/amlogger';




const connectionConfigs:any=Config.connectionConfigs;

const connections:any={};

function initDb(){
        for(const c in connectionConfigs){
            if (connectionConfigs.hasOwnProperty(c)) {
                const host=connectionConfigs[c].host;
                const user=connectionConfigs[c].user;
                const password=connectionConfigs[c].password;
                const database=connectionConfigs[c].database;
                connections[c]=mysql.createPool({
                    connectionLimit: 20,
                    connectTimeout  : 60 * 60 * 1000,
                    acquireTimeout  : 60 * 60 * 1000,
                    timeout         : 60 * 60 * 1000,
                    host,
                    user,
                    password,
                    database,
                    multipleStatements:true,
                });
                Jot.info("Mysql Db "+database+" connected");
            }
        }
}


function queryAsync(dbconnection:DbConfig,query:string):Promise<any>{
    return new Promise((resolve,reject)=>{
        //Jot.verbrose(query);
        connections[dbconnection].query(query, (error:any, results:any, fields:any) =>{
            if (error) {
                Jot.error(error);
                reject(new Error(
                "-------------------------------s:db error--------------------------------------------\n"
                +error.sqlMessage
                +"------------------------------e:db error--------------------------------------------\n"
                +"------------------------------s:db error qury---------------------------------------\n"
                + query
                +"------------------------------e:db error query--------------------------------------\n"
                ));
            }
            resolve(results);
        });
    })
}

export {initDb,queryAsync}