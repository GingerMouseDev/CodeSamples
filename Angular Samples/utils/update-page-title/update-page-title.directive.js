(function () {
	
	/**
	 * Update page title directive
	 *
	 *   - Update page title after successful state change
	 *   - Usage: <title data-update-page-title=""></title>
	 */

	angular
		.module('@appName@.utils')
		.directive('updatePageTitle', updatePageTitleDirective);

	// Directive DI
	updatePageTitleDirective.$inject = [
		'$transitions',
		'$state',
		'$timeout',
		'config'
	];
	
	// Directive
	function updatePageTitleDirective ($transitions, $state, $timeout, config) {
		
		return {
		
			scope: {},
			restrict: 'A',
			link: function(scope, element) {

				// State change successful
				$transitions.onSuccess({}, listener);

				// Transition Listener
				function listener () {

					// Title via state or default
					var data = $state.current.data || null,
						title = (data && data.pageTitle ? data.pageTitle : config.defaultPageTitle);

					$timeout(function () {
						
						element.text(title);
					
					}, 0, false);

				}

			}
		
		};
		
	};
	
})();