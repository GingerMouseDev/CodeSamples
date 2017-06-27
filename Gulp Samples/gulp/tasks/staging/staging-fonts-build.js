/**
 * Copy fonts to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.fonts;

		return gulp.src(taskConfig.src)
			.pipe(gulp.dest(taskConfig.dest));

	};

};