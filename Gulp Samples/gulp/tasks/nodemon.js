/**
 * Nodemon init
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function(cb){

		var called = false;
		
		return $.nodemon({

				// Nodemon server script path
				script: config.nodemon.script,

				// Watch file(s) that force server restart on change
				watch: config.nodemon.watch

			}).on('start', function onStart () {

				// Ensure start only gets called once
				if (!called) { cb(); }

				called = true;
			
			}).on('restart', function onRestart () {
		
				// Reload connected browsers after slight delay
				setTimeout(function reload () {

					$.browserSync.reload({ stream: false });

				}, config.browserSync.reloadDelay);
		
			});

	};

};