/**
 * Browser-sync init
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {
		
		return $.browserSync({

			// Proxy site
			proxy: config.browserSync.proxy,

			// Proxy port
			port: config.browserSync.proxyPort,

			// Open proxied version in the following browsers
			browser: config.browserSync.browsers
			
		});

	};

};