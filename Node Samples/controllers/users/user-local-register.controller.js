/**
 * Load modules
 */

var path = require('path'),
	config = require(path.join(__dirname, '..', '..', 'config', 'config')),
    userService = require(path.join(__dirname, '..', '..', 'services', 'users', 'user.service')),
	validator = require('validator');

/**
 * Load models
 */

var User = require(path.join(__dirname, '..', '..', 'models', 'users', 'user.model')),
    UserVerify = require(path.join(__dirname, '..', '..', 'models', 'users', 'user-verify.model'));

/**
 * Exports
 */

module.exports = userLocalRegister;

/**
 * Register local user
 *
 * @param {object} req - express request object
 * @param {function} cb - callback
 */

function userLocalRegister (req, cb) {

	/**
	 * Validate user data
	 */
	
	var userParams = req.body || {},
        userData = {
			name: validator.trim(userParams.name || ''),
			email: validator.trim(userParams.email || ''),
			password: validator.trim(userParams.password || '')
		},
		errors = [];

	// Validate values using model methods
	[
		{ name: 'name', method: 'validateName', val: userData.name },
		{ name: 'email', method: 'validateEmail', val: userData.email },
		{ name: 'password', method: 'validatePassword', val: userData.password }
	].forEach(function (item) {
	
		// Validate
		var validationErrors = User[item.method](item.val);
		
		// Array of errors returned
		if(validationErrors.length){ errors.push({ name: item.name, failed: validationErrors }); }
	
	});
	
	// If email is invalid then email duplication query shouldn't be attempted
	if (errors.length) {
		
        var returnFlag = false;
        
		errors.forEach(function (item) {
	
			if (item.name === 'email') { returnFlag = true; }
	
		});
	
        if (returnFlag) { return cb({ type: 'fields', errors: errors }); }
        
	}

	/**
	 * Sanitise user data ready for querying then saving
	 */
	
	// Sanitise email
	userData.email = User.normalizeEmail(userData.email);
	
	/**
	 * Check if email already in use
	 */
	
	User.findOne({ 'local.email': userData.email }, function (err, userDoc) {
		
		// DB error
		if (err) { return cb({ type: 'operational', message: config.errors.msgDefaultOP }); }
		
        // Email already in use, add error
		if (userDoc) { errors.push({ name: 'email', failed: ['duplicate'] }); }

        // Validation errors exist
        if (errors.length) { return cb({ type: 'fields', errors: errors }); }
        
		/**
	 	 * Validation passed. Save new user
	 	 */
		
		// New user document
		var newUser = new User({
				local: userData
			});

        // Assign verified flag
        newUser.local.verified = false;
        
		// User password hash
		newUser.generatePasswordHash(newUser.local.password, function (err, hash) {
			
			// Hash error
			if (err) { return cb({ type: 'operational', message: config.errors.msgDefaultOP }); }

            // Assign hash
            newUser.local.password = hash;
                        
			// Save user document
			newUser.save(function (err, newUserDoc) {

				// Save error
				if (err) { return cb({ type: 'operational', message: config.errors.msgDefaultOP }); }

				/**
				 * Create user verification document
				 */
                
                // New verification document
                var newUserVerify = new UserVerify({
				    userId: newUserDoc._id
                });
                
                // Create verification token and save
                newUserVerify.createVerifyToken(function (err, token) {
                    
                    // Save error
				    if (err) { return cb({ type: 'operational', message: config.errors.msgDefaultOP }); }
                    
                    // Send verification email
                    process.nextTick(function () { userService.sendUserVerificationEmail(newUserDoc.local.email, token, req); });
                    
                    // User verification saved
				    return cb(null);
                    
                });
				
			});
			
		});
		
	});
	
}