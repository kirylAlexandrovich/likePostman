const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/', express.static(__dirname + '/resources/static'));

server.use('/', routes);

module.exports = server;
