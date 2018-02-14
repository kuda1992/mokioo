///<reference path="./node_modules/@types/express/index.d.ts"/>
///<reference path="./node_modules/@types/dotenv/index.d.ts"/>
///<reference path="./node_modules/@types/body-parser/index.d.ts"/>
///<reference path="./node_modules/@types/helmet/index.d.ts"/>
///<reference path="./node_modules/@types/express-jwt/index.d.ts"/>


'use strict';

import {config} from 'dotenv';
import * as express from 'express';
import {Application} from 'express';
import * as jwt from 'express-jwt';
import * as helmet from 'helmet';
import {urlencoded, json} from 'body-parser';
import {Routes} from './routes';

urlencoded({extended: false});

config();

class Server {

    app: Application;

    constructor() {
        this.app = express();
    }

    middleware() {

        this.app.use(json());
        this.app.use(urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(
            jwt({secret: process.env.SECRET})
                .unless({
                    path: ['/api/login', '/api/register', '/']
                })
        )
    }

    routes() {
        const routes = new Routes(this.app);
        routes.init();
    }

    start () {
        this.app.listen(3000, () => console.log('Mokioo app listening on port 3000'))
    }

}

export const app = {...{Server}};