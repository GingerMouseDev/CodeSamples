(function () {
	
	/**
	 * User register confirm component
	 */

	angular
		.module('@appName@.users')
		.component('@dirPrefix@UserRegisterConfirm', getComponentConfig());

	// Component
	function getComponentConfig () {
		
		return {
			controller: 'UserRegisterConfirmController',
			templateUrl: '/views/site-user-register-confirm'
		};
		
	};
	
})();