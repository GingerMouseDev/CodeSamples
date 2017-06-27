/**
 * Copy individual (separates) and/or bundle vendor scripts to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.scripts.vendors,
			separates = taskConfig.separates || [],
			bundles = taskConfig.bundles || [],
			vendorDest = taskConfig.dest,
			stream = $.mergeStream();

		if (separates.length) {

			// Process scripts and store streams
			var srcSeparates = separates.map(function (item) {

				return gulp.src(item.src)
					.pipe($.stripComments())
					.pipe($.rename(item.destName))
					.pipe($.rename({ suffix: config.minSuffix }))
					.pipe(gulp.dest(vendorDest));

			});

			// Add new streams
			stream.add(srcSeparates);

		}

		if (bundles.length) {

			// Process scripts and store streams
			var srcBundles = bundles.map(function (item) {

				return gulp.src(item.src)
					.pipe($.concat(item.destName))
					.pipe($.stripComments({ trim: true }))
					.pipe($.rename({ suffix: config.minSuffix }))
					.pipe(gulp.dest(vendorDest));

			});

			// Add new streams
			stream.add(srcBundles);

		}

		return (stream.isEmpty() ? null : stream);

	};

};