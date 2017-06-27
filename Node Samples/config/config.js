/**
 * Load modules
 */

var path = require('path');

/**
 * Config values and settings
 */

var env = process.env.NODE_ENV || 'development',
	envConfig = {
		development: {
            baseUrl: 'http://localhost:4000/',
			dbURI: 'mongodb://**********'
		},
		production: {
            baseUrl: '',
			dbURI: ''
		}
	},
    siteName = 'Sample',
    siteDomain = '**********';

module.exports = {
	
	// Environment
	env: env,
	
    // Site info
    site: {
        name: siteName,
        baseUrl: envConfig[env].baseUrl
    },
    
	// Databases
	db: {
		uri: envConfig[env].dbURI,
		options: {
			server: {
				socketOptions: {
					keepAlive: 300000,
					connectTimeoutMS: 30000
				}
			},
			replset: {
				socketOptions: {
					keepAlive: 300000,
					connectTimeoutMS: 30000
				}
			}
		}
	},
    
    // Page titles
    defaultPageTitle: 'Sample',

    // States - for Angular and route pages
    states: {
        userRegister: {
            pageTitle: 'Create Account'
        },
        userRegisterConfirm: {
            pageTitle: 'Account Created'
        },
        userRegisterVerify: {
            pageTitle: 'Account Verification'
        },
        userLogin: {
            pageTitle: 'Sign In'
        },
        userForgotPassword: {
            pageTitle: 'Forgotten Password'
        }
    },
	
	// User model / forms
	users: {
		name: {
			minLength: 2,
			maxLength: 25,
			errors: {
				required: 'Name is required.',
				minMaxLength: 'Your name must be 2 to 25 characters long.'
			}
		},
		email: {
			maxLength: 254,
			errors: {
				required: 'Email is required.',
				invalid: 'Please enter a valid email.',
				maxLength: 'Your email cannot be more than 254 characters long.',
				duplicate: 'Email address is already registered.'
			}
		},
		password: {
			minLength: 6,
			maxLength: 30,
			errors: {
				required: 'Password is required.',
				minMaxLength: 'Passwords must be 6 to 30 characters long.'
			}
		}
	},

    // SendPulse email API
    sendPulse: {
        userID: '**********',
        secret: '**********',
        tokenStorage: path.join(__dirname, '..', 'sendpulse', '/'),
        getTokenInterval: 3600 * 1000, // 1 hour
        emailUserVerification: {
            subject: siteName + ' - Verify Account',
            from: {
                name: siteName,
                email: '**********@gmail.com'
            },
            siteLogo: envConfig[env].baseUrl + 'assets/images/**********.gif',
            verifyUrl: envConfig[env].baseUrl + 'verify/'
        }
    },
    
	// Errors
	errors: {
		
		// Default operational message
		msgDefaultOP: 'Something went wrong. Please try again.'

	}

};