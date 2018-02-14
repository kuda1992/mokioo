///<reference path="./../../node_modules/@types/express/index.d.ts"/>
import {Application} from 'express';
import {registerController} from '../../controllers/auth/register.controller';
import {RegisterValidator} from '../../models/validations/register.validator';

const expressJoi = require('express-joi');


export const registerRoute = (app: Application) => {
    app
        .post('/api/register', expressJoi.joiValidate(RegisterValidator), registerController);
}