///<reference path="./../node_modules/@types/express/index.d.ts"/>
///<reference path="./../node_modules/@types/jsonwebtoken/index.d.ts"/>
///<reference path="./../node_modules/@types/lodash/index.d.ts"/>

import {Request, Response} from 'express';
import {sign, verify, decode} from 'jsonwebtoken'
import {reduce, omit} from 'lodash'

export function errorHandler(error: Error, request: Request, response: Response) {
    response.statusCode = 500;
    console.error('Error: ', error);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(error));
}

/**
 *
 * @param {string} password
 * @description sign a password to create a token with a secret key
 * @returns {string}
 */
export function signToken(password: string) {
    return sign(password, process.env.SECRET);
}

/**
 *
 * @param {string} token
 * @description verifies the token is still valid
 * @returns {object | string}
 */
export function verifyToken(token: string) {
    return verify(token, process.env.SECRET);
}

/**
 *
 * @param {string} token
 * @description decodes the token
 * @returns {object | string}
 */
export function decodeToken(token: string) {
    return decode(token);
}

/**
 *
 * @param {{}} row
 * @description removes columin prefixes for example client_id should become id
 * @returns {{}}
 */
export function removeTablePrefix(row: {}): {} {
    return reduce(Object.keys(row), (acc, prop) => ({
        ...acc,... {
            [prop.split('_')[1]]: row[prop]
        }
    }), {})
}

export function getTokenFromRequest(request: Request) {
    return request.headers.authorization['split'](' ')[1]
}

/**
 * @description adds an created_at field to the existing object
 * @param {{}} obj
 * @returns {{}}
 */
export function addCreatedAt(obj: {}): {} {
    return {
        ...obj, ... {
            created_at: new Date()
        }
    }
}

/**
 * @description adds an updated_at field to the existing object
 * @param {{}} obj
 * @returns {{}}
 */
export function addUpdatedAt(obj: {}): {} {
    return {
        ...obj, ... {
            updated_at: new Date()
        }
    }
}

/**
 * @description adds table column name to the object property
 * @param {{}} obj
 * @param {string} tableName
 * @returns {{}}
 */
export function mapObjWithTableName(obj: {}, tableName: string): {} {
    return reduce(Object.keys(obj), (acc, prop) =>  ({
        ...acc, ...{
            [`${tableName}_${prop}`]: obj[prop]
        }
    }), {})
}

/**
 * @description removes the unnecessary object properties which are not required on the client
 * @param {{}} obj
 * @returns {{}}
 */
export function removeIdsAndDateFieldsFromResponse(obj: {}): {} {
    return omit(obj, ['created_at', 'user_id', 'client_id', 'updated_at', 'hash', 'salt'])
}
