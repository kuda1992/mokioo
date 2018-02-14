///<reference path="./../../node_modules/@types/express/index.d.ts"/>
///<reference path="./../../node_modules/@types/knex/index.d.ts"/>
///<reference path="./../../node_modules/@types/lodash/index.d.ts"/>
import {omit} from 'lodash';
import {Request, Response} from 'express';
import {knexConfig} from '../../connections/connections';
import {UserSchema} from '../../schemas/auth/register.schema';
import {removeIdsAndDateFieldsFromResponse} from '../../shared/utils';

/**
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {Function} next
 */
export const registerController = (request: Request, response: Response, next: Function) => {
    const body = request.body.payload;
    const password = body.password;
    const user = UserSchema(body);
    user.preSave();
    user.setPassword(password);
    const token = user.generateJWT(body['email']);

    const dataToSaveToDatabase = omit(user, ['password']);

    knexConfig
        .insert({
            client_name: dataToSaveToDatabase.client,
            client_address: dataToSaveToDatabase.address,
            client_postcode: dataToSaveToDatabase.postcode,
            client_email: dataToSaveToDatabase.email,
            client_number: dataToSaveToDatabase.number,
            created_at: dataToSaveToDatabase.created_at,
            updated_at: dataToSaveToDatabase.updated_at
        })
        .into('clients')
        .returning('client_id')
        .then(id => {
            return knexConfig.insert({
                client_id: parseInt(id),
                user_title: dataToSaveToDatabase.title,
                user_name: dataToSaveToDatabase.name,
                user_surname: dataToSaveToDatabase.surname,
                user_email: dataToSaveToDatabase.email,
                user_role: dataToSaveToDatabase.role,
                user_address: dataToSaveToDatabase.address,
                user_postcode: dataToSaveToDatabase.postcode,
                user_number: dataToSaveToDatabase.number,
                created_at: dataToSaveToDatabase.created_at,
                updated_at: dataToSaveToDatabase.updated_at,
                hash: dataToSaveToDatabase.hash,
                salt: dataToSaveToDatabase.salt,
            })
                .into('users')
                .returning('user_id')
                .then(() => {
                    const responsePayLoad = {
                        ... {
                            payload: {
                                ...removeIdsAndDateFieldsFromResponse(dataToSaveToDatabase)
                            },
                            error: null,
                            token
                        }
                    }

                    response.send(responsePayLoad);
                    response.status(201);

                    next();

                })
                .catch(console.error)
        });
}

