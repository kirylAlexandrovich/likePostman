import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes.js';

const __dirname = path.resolve();

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/', express.static(`${__dirname}/src/public/static`));
server.use(express.static(`${__dirname}/src/common`));

server.use('/', routes);

export default server;
