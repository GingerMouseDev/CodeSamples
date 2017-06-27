(function () {

	/**
	 * User register confirm states
	 */

	angular
		.module('@appName@.users')
		.config(userRegisterConfirmStates);

	// Config DI
	userRegisterConfirmStates.$inject = [
		'$stateProvider',
        'config'
	];
	
	// States
	function userRegisterConfirmStates ($stateProvider, config) {
		
		// State definitions
		var states = [

			// Register confirm
			{
				name: 'users.registerConfirm',
				url: '^/register-confirm',
				component: '@dirPrefix@UserRegisterConfirm',
				data: {
					pageTitle: config.states.userRegisterConfirm.pageTitle
				}
			}

		];

		// Assign states
		angular.forEach(states, function (state) {

			$stateProvider.state(state);

		});

	}
	
})();