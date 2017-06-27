/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', '..', 'config', 'config')),
	routes = require('express').Router();

/**
 * Controllers
 */

var usersCtrl = require(path.join(__dirname, '..', '..', '..', 'controllers', 'users', 'users.controller'));

/**
 * User register verify routes
 */

// Register verify page
routes.get('/verify/:token?', function (req, res, next) {

	var vm = {
            pageTitle: config.states.userRegisterVerify.pageTitle,
			layout: 'site-primary-layout',
			ngTemplates: [
				{
					url: '/views/site-user-register-verify',
					partialName: 'site-user-register-verify-partial'
				}
			]
		};

	res.render('site-home-view', vm);

});

// Export routes
module.exports = routes;