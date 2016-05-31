'use strict';
var Routes = require('./src/routes');
var Config = require('./src/config/config');
var Hapi = require('hapi');
var Inert = require('inert');
var JWT2 = require('hapi-auth-jwt2');
var Db = require('./src/config/database');


var server = new Hapi.Server();

server.connection(Config.server);

var validate = function (decoded, request, callback) {
	console.log('reached here');
	var users = User.getAll();
	const user = users[request.payload.username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {
        callback(err, isValid);
    });
};

server.register([Inert, JWT2], function (err) {
    if(err){
      console.log(err);
    }
    server.auth.strategy('jwt', 'jwt',
    { 
    	key: 'NeverShareYourSecret',          
      	validateFunc: validate,            
      	verifyOptions: { algorithms: [ 'HS256' ] } 
    });
    // server.auth.default('jwt');
    server.route(Routes);
});

server.start(function() {
	console.log('Server running at: '+ server.info.uri);
});