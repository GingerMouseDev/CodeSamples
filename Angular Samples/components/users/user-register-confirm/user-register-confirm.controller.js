(function () {
	
	/**
	 * User register confirm controller
	 */

	angular
		.module('@appName@.users')
		.controller('UserRegisterConfirmController', UserRegisterConfirmController);

	// Controller DI
	UserRegisterConfirmController.$inject = [
		'$element'
	];

	// Controller
	function UserRegisterConfirmController ($element) {

		var ctrl = this;

		// Members
		ctrl.$postLink = postLink;
		
		// Add class selector to component element
		function postLink () { $element.addClass('card-info'); }
		
	}
	
})();