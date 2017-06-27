/**
 * Init
 *
 *   - Initialise gulp
 *   - Lazy load required plugins
 *   - Set tasks paths. Utilised by task module fetcher function below
 *   - Load configuration file
 *   - Set environment flags
 */

var gulp = require('gulp'),
	
	// Batch load (lazy) plugins, defined within package.json's devDependencies
	$ = require('gulp-load-plugins')({
		pattern: ['*'],
		scope: ['devDependencies']
	}),
	
	// Set tasks paths. Utilised by task module fetcher function below
	gulpDir = './gulp',
	tasksDir = gulpDir + '/tasks',
	tasksStagingDir = tasksDir + '/staging',
	tasksStagingSiteDir = tasksStagingDir + '/site',
	tasksStagingAppDir = tasksStagingDir + '/app',
	
	// Load configuration file
	config = require(gulpDir + '/config')($);

/**
 * Set environment flags
 */

// Production
config.env.production = !!$.util.env.prod;

// Debugging
config.env.debug = !!$.util.env.debug;

/**
 * Setup tasks
 *
 *   - Load required tasks
 *   - Tasks found within './gulp/tasks/'
 */

// staging: init
gulp.task('staging:init:clean', getTask(tasksStagingDir + '/staging-init-clean'));
gulp.task('staging:init:build', getTask(tasksStagingDir + '/staging-init-build'));

// staging > shared: root files
gulp.task('staging:root:clean', getTask(tasksStagingDir + '/staging-root-clean'));
gulp.task('staging:root:build', getTask(tasksStagingDir + '/staging-root-build'));

// staging > shared assets: fonts
gulp.task('staging:fonts:clean', getTask(tasksStagingDir + '/staging-fonts-clean'));
gulp.task('staging:fonts:build', getTask(tasksStagingDir + '/staging-fonts-build'));

// staging > shared assets: images
gulp.task('staging:images:clean', getTask(tasksStagingDir + '/staging-images-clean'));
gulp.task('staging:images:build', getTask(tasksStagingDir + '/staging-images-build'));

// staging > shared assets: vendor scripts
gulp.task('staging:scripts:vendors:clean', getTask(tasksStagingDir + '/staging-scripts-vendors-clean'));
gulp.task('staging:scripts:vendors:build', getTask(tasksStagingDir + '/staging-scripts-vendors-build'));

// staging > site: CSS (SCSS)
gulp.task('staging:site:styles:clean', getTask(tasksStagingSiteDir + '/staging-site-styles-clean'));
gulp.task('staging:site:styles:build', getTask(tasksStagingSiteDir + '/staging-site-styles-build'));

// staging > site: angular script files
gulp.task('staging:site:angular:clean', getTask(tasksStagingSiteDir + '/staging-site-angular-clean'));
gulp.task('staging:site:angular:build', getTask(tasksStagingSiteDir + '/staging-site-angular-build'));

// staging > site: views (handlebars)
gulp.task('staging:site:views:clean', getTask(tasksStagingSiteDir + '/staging-site-views-clean'));
gulp.task('staging:site:views:build', getTask(tasksStagingSiteDir + '/staging-site-views-build'));

// staging > app: CSS (SCSS)
gulp.task('staging:app:styles:clean', getTask(tasksStagingAppDir + '/staging-app-styles-clean'));
gulp.task('staging:app:styles:build', getTask(tasksStagingAppDir + '/staging-app-styles-build'));

// staging > app: angular script files
gulp.task('staging:app:angular:clean', getTask(tasksStagingAppDir + '/staging-app-angular-clean'));
gulp.task('staging:app:angular:build', getTask(tasksStagingAppDir + '/staging-app-angular-build'));

// staging > app: views (handlebars)
gulp.task('staging:app:views:clean', getTask(tasksStagingAppDir + '/staging-app-views-clean'));
gulp.task('staging:app:views:build', getTask(tasksStagingAppDir + '/staging-app-views-build'));

// staging: server files and folders
gulp.task('staging:server:clean', getTask(tasksStagingDir + '/staging-server-clean'));
gulp.task('staging:server:build', getTask(tasksStagingDir + '/staging-server-build'));

// nodemon
gulp.task('nodemon', getTask(tasksDir + '/nodemon'));

// browser sync
gulp.task('browser-sync', ['nodemon'], getTask(tasksDir + '/browser-sync'));

/**
 * Builds
 *
 * CLI:
 *
 *   'gulp' (default)
 *       - Builds entire site from src to staging including server
 *       - Starts staging server
 *
 *   'gulp --prod' (not implemented at present)
 *       - Builds entire site from staging to production including server
 *       - Starts production server
 */

gulp.task('default', function(){

	$.runSequence(
		
		// Run array items (in parallel)...
		[
			
			// Init
			'staging:init:clean'

		],

		// ...then (in parallel)
		[

			// Init
			'staging:init:build',
			
			// Shared
			'staging:root:build',
			'staging:fonts:build',
			'staging:images:build',
			'staging:scripts:vendors:build',

			// Site
			'staging:site:styles:build',
			'staging:site:angular:build',
			'staging:site:views:build',
			
			// App
			'staging:app:styles:build',
			'staging:app:angular:build',
			'staging:app:views:build',
			
			// Server
			'staging:server:build'

		],

		// ...then (in parallel)
		[
			'browser-sync'
		],
		
		// Watchers
		function(){

			// Site SCSS files
			gulp.watch(config.staging.site.styles.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:site:styles:clean'],

					// Then...
					['staging:site:styles:build']

				);
				
			});

			// Site Angular files
			gulp.watch(config.staging.site.angular.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:site:angular:clean'],

					// Then...
					['staging:site:angular:build']

				);
				
			});

			// Site views
			gulp.watch(config.staging.site.views.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:site:views:clean'],

					// Then...
					['staging:site:views:build']

				);
				
			});

			// App SCSS files
			gulp.watch(config.staging.app.styles.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:app:styles:clean'],

					// Then...
					['staging:app:styles:build']

				);
				
			});

			// App Angular files
			gulp.watch(config.staging.app.angular.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:app:angular:clean'],

					// Then...
					['staging:app:angular:build']

				);
				
			});

			// App views
			gulp.watch(config.staging.app.views.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:app:views:clean'],

					// Then...
					['staging:app:views:build']

				);
				
			});

			// Server files
			gulp.watch(config.staging.server.watch, function(){
				
				$.runSequence(

					// Run...
					['staging:server:clean'],

					// Then...
					['staging:server:build']

				);
				
			});

		}

	);
	
});

/**
 * Task module fetcher
 */

function getTask(task) {
	return require(task)(gulp, $, config);
}