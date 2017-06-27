(function () {
	
	/**
	 * App module
	 */

	angular
		.module('@appName@', [
			
			// Config
			'@appName@.config',
		
			// Utilities
			'@appName@.utils',
		
			// Components
			'@appName@.users'

		]);

	/**
	 * Document ready
	 */

	angular.element(function () {

		// Bootstrap manually
		angular.bootstrap(document, ['@appName@']);

	});
	
})();