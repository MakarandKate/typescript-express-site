export enum Env{
    dev="dev",
    prod="prod"
}
export enum DbConfig{
    primary="primary",
    logs="logs"
}
export default class Config{
    static Env=Env.dev;
    static port=3030;
    static sessionSecret="sessionSecret";
    static connectionConfigs={
        primary:{
            host:'127.0.0.1',
            user:'root',
            password:'',
            database:'primary_db'
        },
        logs:{
            host:'127.0.0.1',
            user:'root',
            password:'',
            database:'logs_db'
        }
    }
}