/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', '..', 'config', 'config')),
	routes = require('express').Router();

/**
 * Home route
 */

routes.get('/', function (req, res, next) {

    var vm = {
			pageTitle: config.defaultPageTitle,
            layout: 'site-primary-layout',
            ngTemplates: [
                {
                    url: '/views/site-user-register',
                    partialName: 'site-user-register-partial',
                    config: config.users
                }
            ]
		};
    
	res.render('site-home-view', vm);

});

// Export routes
module.exports = routes;