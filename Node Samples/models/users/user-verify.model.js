/**
 * Load modules
 */

var mongoose = require('mongoose');

/**
 * Init & settings
 */

var Schema = mongoose.Schema;

/**
 * Define schema
 */

var UserVerifySchema = new Schema({

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
		token: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '3d'
        }

	});

/**
 * Schema methods
 */

// Create verify token
UserVerifySchema.methods.createVerifyToken = function (cb) {
    
    var userVerify = this,
        token = require('uuid/v4')();
    
    // Assign token
    userVerify.token = token;
    
    // Save new userVerify doc
    userVerify.save(function (err) {
    
        if (err) { return cb(err); }

        return cb(null, token);

    });

};

/**
 * Export model
 */

module.exports = mongoose.model('UserVerify', UserVerifySchema);