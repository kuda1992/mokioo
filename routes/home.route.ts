///<reference path="./../node_modules/@types/express/index.d.ts"/>
import {Application} from 'express';


export const homeRoute = (app: Application) => {
    app
        .get('/', (req, res) => res.send('hello world'));
}