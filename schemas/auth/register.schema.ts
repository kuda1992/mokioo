///<reference path="./../../node_modules/@types/lodash/index.d.ts"/>

import {signToken} from '../../shared/utils';

const crypto = require('crypto');


const User = {

    preSave: function () {

        const currentDate = new Date();
        this.updated_at = currentDate;

        if (!this.created_at) {
            this.created_at = currentDate;
        }

    },

    setPassword: function (password) {

        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    },

    validatePassword: function (password) {

        let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
        return this.hash === hash;

    },

    generateJWT: signToken
}

export const UserSchema = (user) => {

    return Object.assign(user, User);
}