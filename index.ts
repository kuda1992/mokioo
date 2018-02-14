///<reference path="./node_modules/@types/dotenv/index.d.ts"/>

'use strict';

import {config} from 'dotenv';
import {app} from './server';

require('./connections/connections');


config();
const Application = new app.Server();
Application.middleware();
Application.routes();
Application.start();