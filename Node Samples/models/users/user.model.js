/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', 'config', 'config')),
	mongoose = require('mongoose'),
	validator = require('validator'),
	bcrypt = require('bcrypt-nodejs');

/**
 * Init
 */

var Schema = mongoose.Schema;

/**
 * Define schema
 */

var UserSchema = new Schema({

		local: {
			name: String,
			email: String,
			password: String,
			jwtJti: String,
            verified: Boolean
		}

	},
    {
        timestamps: true
    });

/**
 * Schema statics
 */

// Check name is valid
UserSchema.statics.validateName = function (name) {

	var errors = [];
	
	// Empty
	if(validator.isEmpty(name)){ errors.push('required'); }
	
	// Min length
	if(name.length < config.users.name.minLength){ errors.push('minlength'); }
	
	// Max length
	if(name.length > config.users.name.maxLength){ errors.push('maxlength'); }
	
	return errors;
	
};

// Check email is valid
UserSchema.statics.validateEmail = function (email) {

	var errors = [];
	
	// Empty
	if(validator.isEmpty(email)){ errors.push('required'); }
	
	// Validation
	if(!validator.isEmail(email, { require_tld: false })){ errors.push('validation'); }
	
	// Max length
	if(email.length > config.users.email.maxLength){ errors.push('maxlength'); }
	
	return errors;
	
};

// Check password is valid
UserSchema.statics.validatePassword = function (password) {

	var errors = [];
	
	// Empty
	if(validator.isEmpty(password)){ errors.push('required'); }
	
	// Min length
	if(password.length < config.users.password.minLength){ errors.push('minlength'); }
	
	// Max length
	if(password.length > config.users.password.maxLength){ errors.push('maxlength'); }
	
	return errors;
	
};

// Normalise email
UserSchema.statics.normalizeEmail = function (email) {

	return validator.normalizeEmail(email);
	
};

/**
 * Model instance methods
 */

// Generate password salted hash
UserSchema.methods.generatePasswordHash = function (password, cb) {
    
	bcrypt.genSalt(10, function (err, salt) {
	
        // Error
		if (err) { return cb(err); }
	
		bcrypt.hash(password, salt, null, function (err, hash) {
			
            // Error
			if (err) { return cb(err); }
			
            return cb(null, hash);
			
		});
	
	});
	
};

/**
 * Export model
 */

module.exports = mongoose.model('User', UserSchema);