/**
 * Build concatinated Angular script then save to staging
 *
 *   - Config: './gulp/config.js'
 */

module.exports = function (gulp, $, config) {

	return function () {

		var taskConfig = config.staging.site.angular,
			stream = $.mergeStream(),
			streams = [];

		/**
		 * Perform tasks in series due to the angular script file requiring
		 * the config module file to have been generated beforehand
		 */
		$.async.series([
			
            // Convert angular config file to JSON
			function (callback) {

                var fs = require('fs'),
                    srcObj = require(taskConfig.config.srcObj);
                
                // Save JSON file
                fs.writeFileSync(taskConfig.config.destJson, JSON.stringify(srcObj));
                
                callback();
                
            },
            
			// ...then build angular config module
			function (callback) {

				streams.push(gulp.src(taskConfig.config.destJson)
					.pipe($.ngConfig(taskConfig.appName + '.config', {
						environment: [
							'global',
							!config.env.production ? 'staging' : 'production'
						],
						wrap: '(function () {\n<%= module %>})();'
					}))
					.pipe($.rename(taskConfig.config.destName))
					.pipe(gulp.dest(taskConfig.config.dest))
					.on('end', callback)
				);

			},

			// ...then build angular script
			function (callback) {

				streams.push(gulp.src(taskConfig.src)
					.pipe($.concat(taskConfig.destName))
					.pipe($.replace(taskConfig.appNameFindReplace.find, taskConfig.appNameFindReplace.replace))
					.pipe($.replace(config.staging.site.dirPrefixFindReplace.find, config.staging.site.dirPrefixFindReplace.replace))
					.pipe($.wrap("(function(){\n\"use strict\";\n<%= contents %>\n})();"))
					.pipe(gulp.dest(taskConfig.dest))
					.pipe($.uglify().on('error', function(e){
						console.log(e);
					}))
					.pipe($.rename({ suffix: config.minSuffix }))
					.pipe(gulp.dest(taskConfig.dest))
					.pipe($.browserSync.reload({ stream: true }))
					.on('end', callback)
				);

			}],
		
			// ...then proceed with combining the streams
			function (err) {
				
				if (err) { return null; }
					
				// Add new streams
				stream.add(streams);
					
				return (stream.isEmpty() ? null : stream);
				
			}
			
		);
	
	};

};