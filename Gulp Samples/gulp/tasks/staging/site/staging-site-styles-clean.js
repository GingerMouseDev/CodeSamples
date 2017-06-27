/**
 * Delete site css files from staging
 *
 *   - Config: './gulp/config.js'
 *   - Execute 'dry run' to confirm files to delete
 */

module.exports = function (gulp, $, config) {

	return function () {

		var deletePaths = config.staging.site.styles.clean;
		
		return $.del(deletePaths);

		// Dry run - retain for testing
		/*return $.del(deletePaths, { dryRun: true }).then(
			function (paths) {
				console.log('Style files to be removed:\n', paths.join('\n'));
			});*/

	};

};