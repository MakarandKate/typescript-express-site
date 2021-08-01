import Config, {Env} from "./config/Config";
import express from "express";
import {json} from 'body-parser';
import path from "path";
import * as expressHbs from 'express-handlebars';
import {Jot} from '@makarandkate/amlogger';
import session from "express-session";
import * as expressSession from "express-session";
import expressMySqlSession from "express-mysql-session";






const app = express();

import {initDb} from './app/Db';

initDb();


const hbs = expressHbs.create({
    // helpers: require('./src/models/helpers')(),
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: [path.join(__dirname, 'views/partials')],
    extname: '.hbs'
});

app.use( express.static( path.join( __dirname, "public" ) ) );


app.set( "views", path.join( __dirname, "views" ) );
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(json());
app.use(express.urlencoded());


const MySQLStore   = expressMySqlSession(expressSession);


const mysqlstoreOptions:any=Config.connectionConfigs.primary;
mysqlstoreOptions.schema={
    tableName: 'z_session'
};


const sessionStore = new MySQLStore(mysqlstoreOptions);

app.use(session({
    secret: Config.sessionSecret,
    saveUninitialized:true,
    resave:false,
    cookie:{
        maxAge:(86400000)
    },
    store:sessionStore,
}));



const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let socketUsers:any={};

io.on('connection', (socket:any) => {
    Jot.debug("new connection : ",socket.id);
    socketUsers[socket.id]=socket;
    socket.on('disconnect', () => {
        delete socketUsers[socket.id];
    });
});

if(Config.Env===Env.dev){
    const reload = require('reload');
    const watch = require('watch');
    reload(app).then((reloadReturned:any) =>{
        // Jot.info(`reloadReturned1:`,reloadReturned);
        server.listen( Config.port, () => {
            Jot.info(`info:Server started at ${Config.port}`);
        })

        watch.watchTree(__dirname, (f:any, curr:any, prev:any) =>{
            // Fire server-side reload event
            reloadReturned.reload();
        });
    }).catch((err:any)=> {
        Jot.error('Reload could not start, could not start server/sample app', err)
    });
}else{
    server.listen( Config.port, () => {
        Jot.info(`info:Server started at ${Config.port}`);
    })
}

import baseRouter from './_router';


app.use('/',baseRouter);
