(function () {
	
	/**
	 * Body controller
	 */

	angular
		.module('@appName@.users')
		.controller('BodyController', BodyController);

	// Controller DI
	BodyController.$inject = [
		'$scope',
		'bodyService'
	];

	// Controller
	function BodyController ($scope, bodyService) {

		var ctrl = this;

		// No scroll default
		ctrl.noScrollActive = false;
		
		// Subscribe
		bodyService.subscribe($scope, 'toggleBodyScroll', function toggleBodyScroll (data) {
			
			ctrl.noScrollActive = data.noScrollActive;
			
		});
		
	}
	
})();