/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', '..', 'config', 'config')),
	routes = require('express').Router();

/**
 * User register confirm routes
 */

// Register confirm page
routes.get('/register-confirm', function (req, res, next) {

	var vm = {
            pageTitle: config.states.userRegisterConfirm.pageTitle,
			layout: 'site-primary-layout',
			ngTemplates: [
				{
					url: '/views/site-user-register-confirm',
					partialName: 'site-user-register-confirm-partial'
				}
			]
		};

	res.render('site-home-view', vm);

});

// Register confirm partial
routes.get('/views/site-user-register-confirm', function (req, res, next) {

	var vm = {
			layout: false
		};
	
	res.render(path.join('partials', 'site-user-register-confirm-partial'), vm);

});

// Export routes
module.exports = routes;