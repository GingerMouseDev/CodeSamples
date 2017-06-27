(function () {

	/**
	 * Form errors service
     * 
     *  - Sets validity of given fields defined by server response 
     *  - Sets error message heading
	 */

	angular
		.module('@appName@.utils')
		.factory('formErrorsService', formErrorsService);
	
	// Factory
	function formErrorsService () {
		
		return {
			setInvalidFields: setInvalidFields,
			setErrorHeading: setErrorHeading
		};
		
		// Sets invalid fields - invalidated by server
		function setInvalidFields (form, errors) {
			
			for(var i = 0; i < errors.length; i++) {
				
				for(var j = 0; j < errors[i].failed.length; j++) {
					
					form[errors[i].name].$setValidity(errors[i].failed[j], false);
					
				}
				
			}

		}
		
		// Toggles main error heading - mostly used for operational errors
		function setErrorHeading (ctrl, message) {

			// Set error property
			ctrl.formErrorHeading = message;
			
		}
		
	}

})();