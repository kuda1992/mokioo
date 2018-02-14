///<reference path="./../../node_modules/@types/joi/index.d.ts"/>
import * as joi from 'joi';

export const LoginValidator = {
    payload: {
        username: joi.string().required(),
        password: joi.string().required()
    }
}