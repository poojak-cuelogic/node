'use strict';
require('dotenv').config();
var Routes = require('./src/routes');
var Config = require('./src/config/config');
var Hapi = require('hapi');
var Inert = require('inert');
var JWT2 = require('hapi-auth-jwt2');
var Db = require('./src/config/database');
var User = require('./src/model').User;


var server = new Hapi.Server();

server.connection(Config.server);

var validate = function (decoded, request, callback) {
	User.findOne({username: decoded.id}, function(err, user) {
		if(!user) {
	        return callback(null, false);
	    } else {
	    	callback(null, true);
	    }
	});
};

server.register([Inert, JWT2], (err) => {
    if(err){
      console.log(err);
    }
    server.auth.strategy('jwt', 'jwt',
    { 
    	key: process.env.SECRET,          
      	validateFunc: validate,            
      	verifyOptions: { algorithms: [ 'HS256' ] } 
    });
    server.route(Routes);
});

server.start(function() {
	console.log('Server running at: '+ server.info.uri);
});