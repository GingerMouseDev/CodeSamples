/**
 * Load modules
 */

var path = require('path'),
    basePathRoutes = path.join(__dirname),
	routes = require('express').Router();

/**
 * Init
 */

var loadRoutes = [
		{
			mountPath: '/',
			fileName: 'user-register'
		},
        {
			mountPath: '/',
			fileName: 'user-register-confirm'
		},
        {
			mountPath: '/',
			fileName: 'user-register-verify'
		},
		{
			mountPath: '/',
			fileName: 'user-login'
		},
		{
			mountPath: '/',
			fileName: 'user-forgot-password'
		}
	];

/**
 * Load user routes
 */

loadRoutes.forEach(function (item) {

	routes.use(item.mountPath, require(path.join(basePathRoutes, item.fileName + '.route')));

});

// Export routes
module.exports = routes;