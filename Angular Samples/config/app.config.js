(function () {

	/**
	 * App config
	 */

	angular
		.module('@appName@')
		.config(appConfig);

	// Config DI
	appConfig.$inject = [
		'$locationProvider',
        '$urlRouterProvider'
	];

	// Config
	function appConfig ($locationProvider, $urlRouterProvider) {

		// HTML5 mode
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

        // Path not matched, redirect to default 
        $urlRouterProvider.otherwise('/');
	}
	
})();