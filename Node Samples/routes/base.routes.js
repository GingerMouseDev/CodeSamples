/**
 * Load modules
 */

var path = require('path'),
    basePathRoutes = path.join(__dirname),
    routes = require('express').Router();

/**
 * Site routes
 */

// Home
routes.use('/', require(path.join(basePathRoutes, 'site', 'home', 'home.routes')));

// Users
routes.use('/', require(path.join(basePathRoutes, 'site', 'users', 'users.routes')));