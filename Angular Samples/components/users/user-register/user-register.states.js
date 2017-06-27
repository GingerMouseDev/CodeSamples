(function () {

	/**
	 * User register states
	 */

	angular
		.module('@appName@.users')
		.config(userRegisterStates);

	// Config DI
	userRegisterStates.$inject = [
		'$stateProvider',
		'config'
	];
	
	// States
	function userRegisterStates ($stateProvider, config) {
		
		// State definitions
		var states = [

			// Register (homepage default)
			{
				name: 'users.home',
				url: '^/',
				component: '@dirPrefix@UserRegister',
				data: {
					pageTitle: config.defaultPageTitle
				}
			},

			// Register (verbose URL)
			{
				name: 'users.register',
				url: '^/register',
				component: '@dirPrefix@UserRegister',
				data: {
					pageTitle: config.states.userRegister.pageTitle
				}
			}

		];

		// Assign states
		angular.forEach(states, function (state) {

			$stateProvider.state(state);

		});

	}
	
})();