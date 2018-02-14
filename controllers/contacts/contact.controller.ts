///<reference path="./../../node_modules/@types/express/index.d.ts"/>
///<reference path="./../../node_modules/@types/knex/index.d.ts"/>
///<reference path="./../../node_modules/@types/lodash/index.d.ts"/>
import {Request, Response} from 'express';
import {knexConfig} from '../../connections/connections';
import {addCreatedAt, addUpdatedAt, decodeToken, getTokenFromRequest, mapObjWithTableName, removeIdsAndDateFieldsFromResponse, removeTablePrefix} from '../../shared/utils';
import {Helpers} from '../../shared/helpers';


/**
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {Function} next
 */
const createContact = (request: Request, response: Response, next: Function) => {
    const token = getTokenFromRequest(request);
    const username = decodeToken(token);
    const body = mapObjWithTableName(request.body.payload, 'contact');

    knexConfig
        .where({user_email: username})
        .from('users')
        .then(([user]) => {
            const user_id = user['user_id'];
            let row: {} = {...body, ...{user_id}};
            row = addCreatedAt(row);
            row = addUpdatedAt(row);
            knexConfig.insert(row)
                .into('contacts')
                .then(() => {
                    const responsePayLoad = {
                        ... {
                            payload: {
                                ...Helpers.compose(removeTablePrefix, removeIdsAndDateFieldsFromResponse)(body)
                            },
                            message: {
                                message: "Contact added successfully",
                                status: 201,
                            },
                            error: null
                        }
                    }
                    response.status(201)
                        .send(responsePayLoad);
                    next();
                })


        })
        .catch(console.error)

}

const getContact = (request: Request, response: Response, next: Function) => {

    const token = getTokenFromRequest(request);
    const username = decodeToken(token);

    console.log(username);

    response.status(200)
        .send(username)

}


export const contactControllers = {
    createContact,
    getContact
}