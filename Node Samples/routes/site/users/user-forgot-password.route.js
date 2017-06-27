/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', '..', 'config', 'config')),
    routes = require('express').Router();

/**
 * User forgot password routes
 */

// Forgot password page
routes.get('/forgot-password', function (req, res, next) {

	var vm = {
            pageTitle: config.states.userForgotPassword.pageTitle,
			layout: 'site-primary-layout',
			ngTemplates: [
				{
					url: '/views/site-user-forgot-password',
					partialName: 'site-user-forgot-password-partial'
				}
			]
		};

	res.render('site-home-view', vm);

});

// Forgot password partial
routes.get('/views/site-user-forgot-password', function (req, res, next) {

	var vm = {
			layout: false
		};

	res.render(path.join('partials', 'site-user-forgot-password-partial'), vm);

});

// Export routes
module.exports = routes;