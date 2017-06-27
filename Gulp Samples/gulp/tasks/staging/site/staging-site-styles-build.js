/**
 * Compile site SCSS then save to staging
 *
 * Order:
 *   - Compile SCSS
 *   - Vendor prefix CSS rules
 *   - Save non-optimised & optimised versions
 *   - Output errors to OS / console 
 *
 * Notes:
 *   - Config: './gulp/config.js'
 *   - Autoprefixer's browsers list defined within './package.json'
 */

module.exports = function (gulp, $, config) {

	var onError = function (err) {
			$.notify({
				title: 'Gulp Task Error',
				message: 'Check the console.'
			}).write(err);
			console.log(err.toString());
			this.emit('end');
		},
		taskConfig = config.staging.site.styles;

	return function () {

		return gulp.src(taskConfig.entry)
			.pipe($.plumber({ errorHandle: onError }))
			.pipe($.sass())
			.on('error', onError)
			.pipe($.rename(taskConfig.destName))
			.pipe($.postcss([ $.autoprefixer(config.autoprefixerOptions) ]))
			.pipe(gulp.dest(taskConfig.dest))
			.pipe($.cleanCss(config.cleanCssOptions))
			.pipe($.rename({ suffix: config.minSuffix }))
			.pipe(gulp.dest(taskConfig.dest))
			/*.pipe($.notify({
				title: 'Gulp Task Complete',
				message: 'Styles have been compiled'
			}))*/
			.pipe($.browserSync.reload({ stream: true }));

	};

};