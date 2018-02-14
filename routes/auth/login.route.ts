///<reference path="./../../node_modules/@types/express/index.d.ts"/>
import {Application} from 'express';
import {LoginValidator} from '../../models/validations/login.schema';
import {loginController} from '../../controllers/auth/login.controller';

const expressJoi = require('express-joi');

export const loginRoute = (app: Application) => {
    app
        .post('/api/login', expressJoi.joiValidate(LoginValidator), loginController);
}