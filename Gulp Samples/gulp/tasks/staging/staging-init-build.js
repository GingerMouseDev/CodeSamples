/**
 * Create staging directory structure
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function (done) {

		var taskConfig = config.staging.init;
		
		taskConfig.createDirs.forEach(function (dir) {
			
			$.mkdirp.sync(dir);

		});

		done();

	};

};