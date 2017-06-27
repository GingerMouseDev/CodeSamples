/**
 * Delete vendor scripts from staging
 *
 *   - Config: './gulp/config.js'
 *   - Execute 'dry run' to confirm files to delete
 */

module.exports = function (gulp, $, config) {

	return function () {

		var deletePaths = config.staging.scripts.vendors.clean;
		
		return $.del(deletePaths);

		// Dry run - retain for testing
		/*return $.del(deletePaths, { dryRun: true }).then(
			function (paths) {
				console.log('Vendor scripts to be removed:\n', paths.join('\n'));
			});*/

	};

};