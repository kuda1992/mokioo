///<reference path="./../node_modules/@types/knex/index.d.ts"/>

'use strict';

import * as knex from 'knex'


export const knexConfig = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'docker',
        password: 'docker',
        database: 'docker'
    },
    migrations: {
        directory: __dirname + '/migrations'
    }
})


