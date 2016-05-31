var Joi = require('joi'),
    Boom = require('boom'),
    Bcrypt = require('bcrypt'),
    async = require('async'),
    JWT = require('jsonwebtoken'),
    User = require('../model').User;

exports.login = {
	auth: false,
	validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        }
    },
    handler: function(request, reply) {
    	User.findOne({username: request.payload.username}, function(err, user) {
    		if(!user) {
		        reply('User does not exist').code(400);
		    }
    		Bcrypt.compare(request.payload.password, user.password, (err, isValid) => {
		        if(!err && isValid) {
		        	var secret = 'ThisIsASuperSecretKeyWith3Zeros000andaHas#';
					var obj   = { id:user.username, "name": user.firstname }; 
					var token = JWT.sign(obj, secret);
		          	reply('User authenticated with Token: ' + token);
		        } 
		        else {
		          	reply('User authentication failed').code(400);
		        }
		    });
    	});
    }
};