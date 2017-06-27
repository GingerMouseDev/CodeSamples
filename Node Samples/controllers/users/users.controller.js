/**
 * Load modules
 */

var path = require('path'),
    basePathControllers = path.join(__dirname);

/**
 * Assign controllers
 */

// User local register
exports.userLocalRegister = require(path.join(basePathControllers, 'user-local-register.controller'));