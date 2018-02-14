///<reference path="./../../node_modules/@types/express/index.d.ts"/>
///<reference path="./../../node_modules/@types/knex/index.d.ts"/>
///<reference path="./../../node_modules/@types/lodash/index.d.ts"/>
import {Request, Response} from 'express';
import {Helpers} from '../../shared/helpers';
import {knexConfig} from '../../connections/connections';
import {UserSchema} from '../../schemas/auth/register.schema';
import {removeIdsAndDateFieldsFromResponse, removeTablePrefix} from '../../shared/utils';


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
            if (!user.validatePassword(password)) {
                return response.send(401)
            }

            const token = user.generateJWT(username);
            const responsePayLoad = {
                ... {
                    payload: {
                        ...Helpers.compose(removeTablePrefix, removeIdsAndDateFieldsFromResponse)(user),
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