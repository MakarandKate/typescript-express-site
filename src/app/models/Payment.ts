import { Jot } from "@makarandkate/amlogger";
import { DbConfig } from "../../config/Config";
import { queryAsync } from "../Db";

export enum IPaymentGateway{
    RazerPay='RazorPay'
}

export enum IPaymentStage{
    Generate='Generate',
    Init='Init',
    Success='Success',
    Failed='Failed'
}

export class IPayment{

    constructor(_id:number,loadData?:IPayment){
        this._id=_id;
        if(loadData){
            this.payementGateway=loadData.payementGateway
            this.amount=loadData.amount
            this.stage=loadData.stage
            this.formResponseStamp=loadData.formResponseStamp
            this.serverReponseStamp=loadData.serverReponseStamp
            this.completeStamp=loadData.completeStamp
        }
    }

    private _id:number;

    payementGateway:IPaymentGateway;
    amount:number;
    stage:IPaymentStage;
    formResponseStamp:number;
    serverReponseStamp:number;
    completeStamp:number;

    createStamp:number;
    updateStamp:number;
    deleteStamp:number;

    
    setId(id:number){
        this._id=id;
    }
    getId(){
        return this._id;
    }
}
export default class Payment{
    private static TABLE_NAME=`payment`;
    private static dbToClass(data:any):IPayment{
        const pY=new IPayment(data.id);

        pY.payementGateway=data.payment_gateway;
        pY.amount=data.amount;
        pY.stage=data.stage;
        pY.formResponseStamp=data.form_response_stamp;
        pY.serverReponseStamp=data.server_response_stamp;
        pY.completeStamp=data.complete_stamp;
        
        pY.createStamp=data.create_stamp;
        pY.updateStamp=data.update_stamp;
        pY.deleteStamp=data.delete_stamp;
        return pY;
    }

    private static classToDb(data:IPayment){
        const pY={
            id:data.getId() || null,

            payment_gateway:data.payementGateway,
            amount:data.amount,
            stage:data.stage,
            form_response_stamp:data.formResponseStamp,
            server_response_stamp:data.serverReponseStamp,
            complete_stamp:data.completeStamp,

            create_stamp:data.createStamp,
            update_stamp:data.updateStamp,
            delete_stamp:data.deleteStamp,
        }
        return pY;
    }

    public static async createRequest(pY:IPayment):Promise<IPayment>{
        let row=(await queryAsync(DbConfig.primary,`
                INSERT
                    INTO ${this.TABLE_NAME}
                    (payment_gateway,amount,stage,create_stamp)
                VALUES
                    ('${pY.payementGateway}','${pY.amount}','${pY.stage}','${+new Date()}')    
        `));
        if(row.insertId){
            return await this.getById(row.insertId);
        }
        return null;
    }

    public static async getById(_id:number):Promise<IPayment>{
        const data=(await queryAsync(DbConfig.primary,`
            SELECT
                *
            FROM
                ${this.TABLE_NAME}
            WHERE
                id='${_id}'
            `))[0];
        let uD=this.dbToClass(data);
        uD.setId(data.id);
        return uD;
    }


    public static async update(pY:IPayment):Promise<IPayment>{
        pY.updateStamp=+new Date();
        let py_obj:any=this.sanitizeUpdate(this.classToDb(pY));
        let setArr=[];
        for(let k in py_obj){
            if(py_obj[k]){
                setArr.push(`${k} = '${py_obj[k]}' `)
            }
        }
        await queryAsync(DbConfig.primary,`
            UPDATE
                ${this.TABLE_NAME}
            SET
                ${setArr.join(",")}
            WHERE
                id='${pY.getId()}'
        `);
        return await this.getById(pY.getId());
    }


    private static sanitizeUpdate(obj:any){
        delete obj.id;
        delete obj.phone;
        delete obj.create_stamp;
        delete obj.delete_stamp;
        return obj;
    }
}