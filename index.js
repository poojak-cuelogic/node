'use strict';
var Hapi = require('hapi');
var Bcrypt = require('bcrypt');
var Basic = require('hapi-auth-basic');
var Inert = require('inert');
var Mongoose = require('mongoose');

var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 1338
});

server.register(Inert, (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/signup.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/public/style.css',
        handler: function (request, reply) {
            reply.file('./public/style.css');
        }
    });
});

server.start(function() {
	console.log('Server running at: '+ server.info.uri);
});