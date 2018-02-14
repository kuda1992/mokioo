///<reference path="./../../node_modules/@types/express/index.d.ts"/>
import {Application} from 'express';
import {LoginValidator} from '../../models/validations/login.schema';
import {loginController} from '../../controllers/auth/login.controller';
import {contactControllers} from '../../controllers/contacts/contact.controller';
import {ContactValidator} from '../../models/validations/contact.schema';

const expressJoi = require('express-joi');


export const getContactRoute = (app: Application) => {
    app
        .get('/api/contact', contactControllers.getContact);
}

export const getContactsRoute = (app: Application) => {
    app
        .get('/api/contacts', contactControllers.getContact);
}

export const createContactRoute = (app: Application) => {
    app
        .post('/api/contact', expressJoi.joiValidate(ContactValidator), contactControllers.createContact);
}

export const updateContactRoute = (app: Application) => {
    app
        .put('/api/contact', expressJoi.joiValidate(LoginValidator), loginController);
}

export const deleteContactRoute = (app: Application) => {
    app
        .delete('/api/contact', expressJoi.joiValidate(LoginValidator), loginController);
}