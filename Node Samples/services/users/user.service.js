/**
 * Load modules
 */

var path = require('path'),
    config = require(path.join(__dirname, '..', '..', 'config', 'config')),
    mailService = require(path.join(__dirname, '..', 'mail.service'));

/**
 * Assign exports
 */

exports.sendUserVerificationEmail = sendUserVerificationEmail;

/**
 * Send email to the registered user containing an account verification link
 *
 * @param {string} emailAddress - recipient email address
 * @param {string} token - user verification token
 * @param {object} req - express request object
 */

function sendUserVerificationEmail (emailAddress, token, req) {
    
    // Email templates config
    var verifyConfig = config.sendPulse.emailUserVerification,
        
        // Shared email config
        vmShared = {
            cache: false,
            pageTitle: verifyConfig.subject,
            siteName: config.site.name,
            siteBaseUrl: config.site.baseUrl,
            verifyUrl: verifyConfig.verifyUrl + token
        },
        
        // HTML email
        vmHTML = Object.assign(
            {
                layout: 'site-email-html-primary-layout',
                partialName: 'site-user-register-verify-email-html-partial',
                siteLogo: verifyConfig.siteLogo
            }, vmShared),
        
        // Text email
        vmText = Object.assign(
            {
                layout: false
            }, vmShared);

    // Render HTML email template
    req.app.render('site-generic-email-html-primary-view', vmHTML, function (err, emailHTML) {

        if (err) { return; }

        // Render text email template
        req.app.render(path.join('partials', 'site-user-register-verify-email-text-partial'), vmText, function (err, emailText) {

            if (err) { return; }

            // Email config
            var mailCb = function (res) {},
                mailOptions = {
                    subject: verifyConfig.subject,
                    from: verifyConfig.from,
                    to: [
                        {
                            email: emailAddress
                        }
                    ] ,
                    html: emailHTML,
                    text: emailText
                };
            
            // Send verification email
            mailService.sendMail(mailCb, mailOptions);

        });

    });
    
}