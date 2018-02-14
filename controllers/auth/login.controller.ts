///<reference path="./../../node_modules/@types/express/index.d.ts"/>
///<reference path="./../../node_modules/@types/knex/index.d.ts"/>
///<reference path="./../../node_modules/@types/lodash/index.d.ts"/>
import {omit} from 'lodash';
import {Request, Response} from 'express';
import {knexConfig} from '../../connections/connections';
import {UserSchema} from '../../schemas/auth/register.schema';
import {removeTablePrefix} from '../../shared/utils';


/**
 *
 * @param {e.Request} request
 * @param {e.Response} response
 * @param {Function} next
 */
export const loginController = (request: Request, response: Response, next: Function) => {
    const {password, username} = request.body.payload;


    knexConfig
        .where({user_email: username})
        .from('users')
        .then(([user]) => {
            user = UserSchema(user);
            if(!user.validatePassword(password)) {
                response.send(401)
            }

            const token = user.generateJWT(username);
            const responsePayLoad = {
                ... {
                    payload: {
                        ...removeTablePrefix(omit(user, ['hash', 'salt', 'updated_at', 'created_at', 'user_id', 'client_id'])),
                    },
                    error: null,
                    token
                }
            }

            response
                .status(200)
                .send(responsePayLoad);

            next();

        })
        .catch(console.error)

}