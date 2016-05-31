var Static = require('./static'),
	Auth = require('./plugins/auth'),
	User = require('./plugins/user');

var getSignUpHandler = function (request, reply) {
	reply.file('./src/public/signup.html');
}

module.exports = [
	{   method: 'GET', 		path: '/', 					handler: getSignUpHandler, config: {auth: false} },
	{   method: 'GET', 		path: '/public/{path*}', 	config: Static.get },
	{	method: 'POST', 	path: '/user', 				config: User.create },
	{	method: 'GET', 		path: '/user/{username}', 	config: User.get },
	{	method: 'GET', 		path: '/users', 			config: User.getAll },
	{ 	method: 'PUT', 		path: '/user/{username}', 	config: User.update },
	{	method: 'GET', 		path: '/login', 			config: Static.login },
	{	method: 'POST',		path: '/login', 			config: Auth.login },
];