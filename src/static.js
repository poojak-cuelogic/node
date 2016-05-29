exports.get = {
	auth: false,
	description: 'Static assets',
	handler: {
	    directory: {
	        path: './src/public',
	        index: false,
	        listing: false
	    }
	}
};

exports.login = {
	auth: false,
	description: 'Login Page',
	handler: {
	    directory: {
	        path: './src/public/login.html'
	    }
	}
};