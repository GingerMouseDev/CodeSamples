(function () {
	
	/**
	 * User register controller
	 */

	angular
		.module('@appName@.users')
		.controller('UserRegisterController', UserRegisterController);

	// Controller DI
	UserRegisterController.$inject = [
		'$element',
		'$window',
        '$state',
		'UserDataService',
		'formErrorsService',
		'spinnerService'
	];

	// Controller
	function UserRegisterController ($element, $window, $state, UserDataService, formErrorsService, spinnerService) {

		var ctrl = this,
			spinnerName = 'fullScreen';

		// Members
		ctrl.$onInit = onInit;
		ctrl.$postLink = postLink;
		ctrl.register = register;

		function onInit () {
			
			// Default error heading
			formErrorsService.setErrorHeading(ctrl, null);
			
			// Default duplicate email value
            setEmailDuplicateValue();
		
		}
		
		function postLink () {

			// Add class selector to component element
			$element.addClass('card-form');
			
		}
			
		// Form submit
		function register () {
			
			// Form invalid, cancel submit
			if (ctrl.registerForm.$invalid) { return false; }
			
			// Clear error heading
			formErrorsService.setErrorHeading(ctrl, null);
			
            // Clear duplicate email value
            setEmailDuplicateValue();
            
			// Show spinner
			spinnerService.show(spinnerName, {
				message: 'Registering'
			});
			
			// Resource params
			var action = {
					action: 'register',
				},
				params = {
					name: ctrl.name || '',
					email: ctrl.email || '',
					password: ctrl.password || ''
				};
			
			// Send request
			UserDataService.register(action, params).$promise.then(successCallback, errorCallback);

			// Success
			function successCallback (res) {

                // Hide spinner with callback
				spinnerService.hide(spinnerName, function cb () {

                    // Invoke registration confirmation state
					$state.go('users.registerConfirm');

                });
	
			}
			
			// Error
			function errorCallback(res) {

				// Hide spinner with callback
				spinnerService.hide(spinnerName, function cb() {
					
					// Response errors
					var resErrors = res.data.data.error;
					
					// Operational error
					if (resErrors.type === 'operational') {

						// Set operational error heading
						formErrorsService.setErrorHeading(ctrl, resErrors.message);
						
					// Form fields error
					} else if (resErrors.type === 'fields') {
						
						// Set form fields from server errors array
						formErrorsService.setInvalidFields(ctrl.registerForm, resErrors.errors);
						
                        // Set duplicate email value
                        setEmailDuplicateValue(ctrl.registerForm.email.$error.duplicate ? ctrl.registerForm.email.$viewValue : '');
						
					}

				});

			}
			
		}
        
        // Duplicate email value used with custom 'duplicate' validator
        function setEmailDuplicateValue(val) {
            
            ctrl.emailDuplicate = val || '';

        }
		
	}
	
})();