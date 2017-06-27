(function () {
	
	/**
	 * User email duplicate directive
	 *
	 *  - Toggles ngMessage 'duplicate' email validation after form submit
	 *  - Compares model email value with duplicate email value (returned from server)
	 */

	angular
		.module('@appName@.users')
		.directive('userEmailDuplicate', userEmailDuplicateDirective);

	// Directive
	function userEmailDuplicateDirective () {
		
		return {
			restrict: 'A',
			require: 'ngModel',
			link: userEmailDuplicateLink
		};
		
	};
	
	// Directive link
	function userEmailDuplicateLink (scope, elem, attrs, ctrl) {
		
		ctrl.$validators.duplicate = function (modelValue, viewValue) {

			// Set within 'UserRegister' controller
			var emailDuplicate = (scope.$ctrl && scope.$ctrl.emailDuplicate) || '';
			
			// Valid / invalid
			return ctrl.$isEmpty(viewValue) || !emailDuplicate || viewValue !== emailDuplicate ? true : false;
			
		};
		
	}
	
})();