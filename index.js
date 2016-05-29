'use strict';
var Routes = require('./src/routes');
var Config = require('./src/config/config');
var Hapi = require('hapi');
var Inert = require('inert');
var Db = require('./src/config/database');

var server = new Hapi.Server();

server.connection(Config.server);

server.register(Inert, function(err) {
    server.route(Routes);
});

server.start(function() {
	console.log('Server running at: '+ server.info.uri);
});