///<reference path="./../../node_modules/@types/joi/index.d.ts"/>
import * as joi from 'joi';

export const RegisterValidator = {
    payload: {
        name: joi.string().required(),
        surname: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        number: joi.string().required(),
        title: joi.string().required(),
        client: joi.string().required(),
        address: joi.string().required(),
        country: joi.string().required(),
        postcode: joi.string().required(),
        role: joi.string().required()
    }
}