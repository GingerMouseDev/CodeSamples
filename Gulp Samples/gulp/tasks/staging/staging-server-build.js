/**
 * Copy src server files and folders to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.server;
		
		return gulp.src(taskConfig.src, { base: taskConfig.base })
			.pipe(gulp.dest(taskConfig.dest));

	};

};