/**
 * Copy images to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.images;

		return gulp.src(taskConfig.src)
			.pipe(gulp.dest(taskConfig.dest));

	};

};