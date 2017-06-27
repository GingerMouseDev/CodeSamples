/**
 * Copy site root files to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.root;
		
		return gulp.src(taskConfig.src)
			.pipe(gulp.dest(taskConfig.dest))
			.pipe($.browserSync.reload({ stream: true }));

	};

};