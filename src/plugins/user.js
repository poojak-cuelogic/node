var Joi = require('joi'),
    Boom = require('boom'),
    Bcrypt = require('bcrypt'),
    async = require('async'),
    User = require('../model').User;

exports.create = {
	auth: false,
	validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
		    firstname: Joi.string().min(3),
		    lastname: Joi.string().min(3)
        }
    },
    handler: function(request, reply) {
        var user = new User(request.payload);

		function generateSalt(callback) {
			Bcrypt.genSalt(9, function(err, salt) {
		        if (err) {
		        	callback(err, null); //reject
					return;
		        }
		    	callback(null, salt);	//respinse
		    });
		}

		function hashPassword(salt, callback) {
			Bcrypt.hash(user.password, salt, function(err, hash) {
		        if (err) {
		        	callback(err, null); //reject
					return;
		        }
		        user.password = hash;
		        callback(null, user);
		    });
		}

        function save(err, user) {
        	if(err) {
				next(err);
			}
	        user.save(function(err, user) {
	            if (!err) {
	                reply(user).created('/login'); // HTTP 201
	            } 
	            else {
	                if (11000 === err.code || 11001 === err.code) {
	                    reply(Boom.forbidden("Username already exists!!"));
	                } 
	                else {
		                reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
		            }
	            }
	        });
	    }

        //using async to generate the hashed password
        async.waterfall([
				generateSalt,
				hashPassword
			],
			save);
    }
};

exports.get = {
	auth: false,
	validate: {
        params: {
            username: Joi.string()
		}
    },
    handler: function(request, reply) {
        User.findOne({
            'username': request.params.username
        }, function(err, user) {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.getAll = {
	auth: false,
	handler: function(request, reply) {
        User.find({}, function(err, user) {
            if (!err) {
                reply(user);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};

exports.update = {
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
		    firstname: Joi.string().min(3),
		    lastname: Joi.string().min(3)
        }
    },
    handler: function(request, reply) {
        User.findOne({
            'username': request.params.username
        }, function(err, user) {

			function generateSalt(callback) {
				Bcrypt.genSalt(9, function(err, salt) {
			        if (err) {
			        	callback(err, null); //reject
						return;
			        }
			    	callback(null, salt);	//respinse
			    });
			}

			function hashPassword(salt, callback) {
				Bcrypt.hash(user.password, salt, function(err, hash) {
			        if (err) {
			        	callback(err, null); //reject
						return;
			        }
			        user.password = hash;
			        callback(null, user);
			    });
			}

			function save(err, user) {
	        	if (!err) {
	                user.save(function(err, user) {
	                    if (!err) {
	                        reply(user).updated('/user/' + user.username); // HTTP 201
	                    } else {
	                        if (11000 === err.code || 11001 === err.code) {
	                            reply(Boom.forbidden("Duplicate Username"));
	                        } 
	                        else  {
	                        	reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
	                        }
	                    }
	                });
	            } else {
	                reply(Boom.badImplementation(err)); // 500 error
	            }
			}

        	//using async to generate the hashed password
	        async.waterfall([
				generateSalt,
				hashPassword
			],
			save);      
        });
    }
};

// exports.remove = {
//     handler: function(request, reply) {
//         User.findOne({
//             'username': request.params.ususernamerId
//         }, function(err, user) {
//             if (!err && user) {
//                 user.remove();
//                 reply({
//                     message: "User deleted successfully"
//                 });
//             } else if (!err) {
//                 reply(Boom.notFound());
//             } else {
//                 reply(Boom.badRequest("Could not delete user"));
//             }
//         });
//     }
// };