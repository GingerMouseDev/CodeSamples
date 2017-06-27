(function () {
	
	/**
	 * Spinner controller
	 */

	angular
		.module('@appName@.users')
		.controller('SpinnerController', SpinnerController);

	// Controller DI
	SpinnerController.$inject = [
		'$scope',
		'$timeout',
		'spinnerService'
	];

	// Controller
	function SpinnerController ($scope, $timeout, spinnerService) {

		var ctrl = this,
			minDisplayTime,
			showStartTime,
			toggleBodyScroll;

		// Members
		ctrl.$onInit = onInit;

		function onInit () {

			// Minimum display time for spinner to display
			minDisplayTime = parseInt(ctrl.minDisplayTime || 0, 10);
			
			// Disable body scrollbars for certain spinners e.g. full screen spinner
			toggleBodyScroll = ctrl.toggleBodyScroll && ctrl.toggleBodyScroll === 'true' ? true : false; 

			// Default display state
			ctrl.show = false;

			// Spinner API
			var spinnerData = {
					name: ctrl.name,
					show: show,
					hide: hide
				};
			
			// Register spinner API
			spinnerService.register(spinnerData);

		}

		// Show spinner
		function show (data) {

			// Spinner message (optional)
			if (data.hasOwnProperty('message')) { ctrl.message = data.message; }

			// Time that the spinner was shown (in milliseconds)
			showStartTime = new Date().getTime();
			
			// Disable page body scroll
			if (toggleBodyScroll) { $scope.$emit('toggleBodyScroll', { noScrollActive: true }); }
			
			// Show spinner
			ctrl.show = true;

		}

		// Hide spinner
		function hide (cb) {
			
			var cb = cb || null;
			
			// Delay hiding spinner until given time has elapsed
			if (minDisplayTime > 0) {
				
				var timeRemainingBeforeHide = minDisplayTime - (new Date().getTime() - showStartTime);
				
				// Delay hide
				if (timeRemainingBeforeHide > 0) {
					
					$timeout(function() {
						
						execHide(cb);
						
					}, timeRemainingBeforeHide);
				
				// Time has already elapsed
				} else {

					execHide(cb);
					
				}
				
			// No delay specified
			} else {
				
				execHide(cb);
				
			}

			// Hide spinner helper
			function execHide (cb) {

				// Enable page body scroll
				if (toggleBodyScroll) { $scope.$emit('toggleBodyScroll', { noScrollActive: false }); }
				
				// Hide spinner
				ctrl.show = false;

				// Callback
				if (cb) { cb(); }

			}
			
		}

	}
	
})();