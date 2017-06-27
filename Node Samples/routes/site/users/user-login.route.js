/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', '..', 'config', 'config')),
	routes = require('express').Router();

/**
 * User login routes
 */

// Login page
routes.get('/login', function (req, res, next) {

	var vm = {
            pageTitle: config.states.userLogin.pageTitle,
			layout: 'site-primary-layout',
			ngTemplates: [
				{
					url: '/views/site-user-login',
					partialName: 'site-user-login-partial'
				}
			]
		};

	res.render('site-home-view', vm);

});

// Login partial
routes.get('/views/site-user-login', function (req, res, next) {

	var vm = {
			layout: false
		};
	
	res.render(path.join('partials', 'site-user-login-partial'), vm);

});

// Export routes
module.exports = routes;