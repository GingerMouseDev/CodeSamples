(function () {

	/**
	 * Body service
	 */

	angular
		.module('@appName@.utils')
		.factory('bodyService', bodyService);
	
	// Factory
	function bodyService () {
		
		return {
			subscribe: subscribe
		};
		
		// Listen for named event
		function subscribe (scope, eventName, cb) {
			
			// Assign listener
			var handler = scope.$on(eventName, function (event, data) {
				
					cb(data);
				
				});
			
			// Clean up
			scope.$on('$destroy', handler);

		}
		
	}

})();