///<reference path="./../../node_modules/@types/joi/index.d.ts"/>
import * as joi from 'joi';

export const ContactValidator = {
    payload: {
        title: joi.string(),
        name: joi.string().required(),
        surname: joi.string().required(),
        phone: joi.string(),
        mobile: joi.string(),
        email: joi.string().required(),
        address: joi.string(),
        postcode: joi.string(),
        number: joi.string().required(),
    }
}