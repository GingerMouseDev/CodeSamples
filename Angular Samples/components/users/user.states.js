(function () {

	/**
	 * User states
	 */

	angular
		.module('@appName@.users')
		.config(userStates);

	// Config DI
	userStates.$inject = [
		'$stateProvider',
		'config'
	];
	
	// States
	function userStates ($stateProvider, config) {
		
		// State definitions
		var states = [

			// User (abstract parent)
			{
				name: 'users',
				abstract: true,
				url: '/',
				template: '<div ui-view=""></div>',
				data: {
					pageTitle: config.defaultPageTitle
				}
			}

		];

		// Assign states
		angular.forEach(states, function (state) {

			$stateProvider.state(state);

		});

	}
	
})();