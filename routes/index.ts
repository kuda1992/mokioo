///<reference path="./../node_modules/@types/express/index.d.ts"/>
import {Application} from 'express';
import {homeRoute} from './home.route';
import {loginRoute} from './auth/login.route';
import {registerRoute} from './auth/register.route';
import {createContactRoute, getContactRoute} from './contacts/contacts.route';

export class Routes {

    constructor(private app: Application) {
    }

    init() {
        homeRoute(this.app);
        registerRoute(this.app);
        loginRoute(this.app);
        createContactRoute(this.app);
        getContactRoute(this.app);
    }

}