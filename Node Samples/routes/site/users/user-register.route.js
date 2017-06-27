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
 * User register routes
 */

// Register page
routes.get('/register', function (req, res, next) {

	var vm = {
            pageTitle: config.states.userRegister.pageTitle,
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

// Register partial
routes.get('/views/site-user-register', function (req, res, next) {

	var vm = {
			layout: false,
            config: config.users
		};
	
	res.render(path.join('partials', 'site-user-register-partial'), vm);

});

// Register POST
routes.post('/users/register', function (req, res, next) {

    // User register (local)
	usersCtrl.userLocalRegister(req, function (err) {

		// Errors
		if (err) { return res.status(400).json({ error: err }); }

		// User register success
		return res.status(201).json({ success: true });

	});

});

// Export routes
module.exports = routes;