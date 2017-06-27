/**
 * Load modules
 */

var mongoose = require('mongoose');

/**
 * Init & settings
 */

var dbConn = null;

// Use native promises instead of deprecated mpromise
mongoose.Promise = global.Promise;

/**
 * Assign exports
 */

exports.dbConn = dbConn = mongoose.connection;
exports.connect = connect;

/**
 * Connect to specified database
 *
 * @param {string} uri - database identifier
 * @param {object} options - database options
 */

function connect (uri, options) {

	// Connect to database
	mongoose.connect(uri, options, function (err) {

		// Connection error
		if(err){

			console.log('DB connection error upon startup. Terminating app...');

			process.exit(0);
			
		}
		
	});
	
}

/**
 * Events
 */

// Connection successful
dbConn.on('connected', function () {

	console.log('DB connection success');

});


// Error occurred on connection
dbConn.on('error', function (err) {

	console.log('DB connection error: ' + err);

}); 

// Connection disconnected
dbConn.on('disconnected', function () {

	console.log('DB connection disconnected');

});

// Connected, disconnected then connected again
dbConn.on('reconnected', function () {

	console.log('DB connection reconnected');

});

// Node process ended. Close Mongoose connection 
process.on('SIGINT', function () {

	dbConn.close(function () {

		console.log('DB connection disconnected through app termination');
		process.exit(0);

	});

});