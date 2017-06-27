// SendPulse API ref: https://login.sendpulse.com/manual/rest-api/

/**
 * Load modules
 */

var path = require('path'),
    config = require(path.join(__dirname, '..', 'config', 'config')),
    sendpulse = require('sendpulse-api');

/**
 * Init & settings
 */

var tokenRefreshInterval = null;

/**
 * Assign exports
 */

exports.init = init;
exports.sendMail = sendMail;

/**
 * SendPulse API initialisation
 *
 *  - Stores token (retreived via SendPulse API) then starts token refresh interval (hourly)
 *  - Invoked upon app start
 */

function init () {

    var mailConfig = config.sendPulse;
    
    // Initialise SendPulse
    sendpulse.init(mailConfig.userID, mailConfig.secret, mailConfig.tokenStorage);

    // Start token refresh interval
    tokenRefreshInterval = setInterval(refreshToken, mailConfig.getTokenInterval);

    function refreshToken () { sendpulse.getToken(); }

}

/**
 * Send email via SendPulse
 *
 * @param {function} cb - callback
 * @param {object} mailOptions - settings required by SendPulse
 */

function sendMail (cb, mailOptions) {

    // Send email via SMTP
    sendpulse.smtpSendMail(cb, mailOptions);
    
}