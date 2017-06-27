(function () {

	/**
	 * Spinner service
	 */

	angular
		.module('@appName@.utils')
		.factory('spinnerService', spinnerService);

	// Service DI
	spinnerService.$inject = [
		'$rootScope'
	];
	
	// Factory
	function spinnerService ($rootScope) {
		
		var spinners = {};
		
		return {
			register: register,
			show: show,
			hide: hide
		};
		
		// Register each unique spinner - identified by given spinner name
		function register (data) {
			
			// Name must be defined
			if (!data.hasOwnProperty('name')) { throw new Error('Spinner registration: name missing'); }
			
			// Name must be unique
			if (spinners.hasOwnProperty(data.name)) { throw new Error('Spinner registration: name already registered'); }
			
			// Store spinner
			spinners[data.name] = data;

		}

		// Show spinner
		function show (name, data) {
			
			var spinner = spinners[name];

			if (!spinner) { throw new Error('Spinner show: spinner with given name is not registered'); }
			
			spinner.show(data || {});
			
		}
		
		// Hide spinner
		function hide (name, cb) {
			
			var spinner = spinners[name];
			
			if (!spinner) { throw new Error('No spinner with that name is registered'); }
			
			spinner.hide(cb || null);
			
		}
		
	}

})();