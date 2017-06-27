/**
 * Delete files and folders from staging
 *
 *   - Config: './gulp/config.js'
 *   - Execute 'dry run' to confirm files/folders to delete
 */

module.exports = function (gulp, $, config) {

	return function () {

		var deletePaths = config.staging.init.clean;

		return $.del(deletePaths);

		// Dry run - retain for testing
		/*return $.del(deletePaths, { dryRun: true }).then(
			function (paths) {
				console.log('Staging files & folders to be removed:\n', paths.join('\n'));
			});*/

	};

};