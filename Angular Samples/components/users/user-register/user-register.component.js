(function () {
	
	/**
	 * User register component
	 */

	angular
		.module('@appName@.users')
		.component('@dirPrefix@UserRegister', getComponentConfig());

	// Component
	function getComponentConfig () {
		
		return {
			controller: 'UserRegisterController',
			templateUrl: '/views/site-user-register'
		};
		
	};
	
})();