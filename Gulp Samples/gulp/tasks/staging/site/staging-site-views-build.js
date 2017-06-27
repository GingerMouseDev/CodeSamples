/**
 * Copy site views to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.site.views.copy,
			stream = $.mergeStream();

		// Process views and store stream
		stream.add(
			gulp.src(taskConfig.views.src)
				.pipe($.replace(config.staging.site.dirPrefixFindReplace.find, config.staging.site.dirPrefixFindReplace.replace))
				.pipe($.rename(function(path){
					path.basename = config.viewsSitePrefix + '-' + path.basename.replace('.view', '-view');
					path.dirname = '';
				}))
				.pipe(gulp.dest(taskConfig.views.dest))
		);				
		
		// Process layouts and store stream
		stream.add(
			gulp.src(taskConfig.layouts.src)
				.pipe($.replace(config.staging.site.dirPrefixFindReplace.find, config.staging.site.dirPrefixFindReplace.replace))
				.pipe($.rename(function(path){
					path.basename = config.viewsSitePrefix + '-' + path.basename.replace('.layout', '-layout');
					path.dirname = '';
				}))
				.pipe(gulp.dest(taskConfig.layouts.dest))
		);
		
		// Process partials and store stream
		stream.add(
			gulp.src(taskConfig.partials.src)
				.pipe($.replace(config.staging.site.dirPrefixFindReplace.find, config.staging.site.dirPrefixFindReplace.replace))
				.pipe($.rename(function(path){
					path.basename = config.viewsSitePrefix + '-' + path.basename.replace('.partial', '-partial');
					path.dirname = '';
				}))
				.pipe(gulp.dest(taskConfig.partials.dest))
		);
		
		return (stream.isEmpty() ? null : stream);

	};

};