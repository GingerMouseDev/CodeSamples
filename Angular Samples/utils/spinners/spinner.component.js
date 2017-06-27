(function () {
	
	/**
	 * Spinner component
	 *
	 * Usage: <ua-spinner data-type="fullScreen" data-name="fullScreen" data-show-on-load="false" data-min-display-time="1000"></ua-spinner>
	 *
	 * @param {string} data-name - Unique name of spinner.
	 * @param {string} data-type - Type of custom spinner used to serve correct template e.g. 'fullScreen' (overlays entire page), 'inline'.
	 * @param {integer} [data-min-display-time = 0] - Minimum number of milliseconds to display spinner before hiding.
	 * @param {boolean} [data-toggle-body-scroll = false] - Flag indicating whether <body> scrollbar should be disabled during spinner show.
	 */

	angular
		.module('@appName@.users')
		.component('@dirPrefix@Spinner', getComponentConfig());

	// Component
	function getComponentConfig () {
		
		return {
			template: spinnerTemplate,
			bindings: {
				name: '@',
				minDisplayTime: '@?',
				toggleBodyScroll: '@?'
			},
			controller: 'SpinnerController'
		};
		
	};
	
	// Spinner template DI
	spinnerTemplate.$inject = [
		'$attrs'
	];
	
	function spinnerTemplate ($attrs){

		// Spinner type must be defined
		if (!$attrs.type) { throw new Error('Spinner template: type missing'); }

		// Define spinner templates
		var templates = {
				
				// Full screen overlay spinner
				fullScreen: [
						'<div data-ng-show="$ctrl.show" class="spinner-full">',
							'<div class="spinner-pane"></div>',
							'<div class="spinner-wrap">',
								'<div class="spinner-inner">',
									'<div class="spinner-icon"></div>',
									'<div data-ng-if="$ctrl.message" data-ng-bind="$ctrl.message" class="spinner-message"></div>',
								'</div>',
							'</div>',
						'</div>'
					].join('')

			};
		
		return templates[$attrs.type]; 

	}

})();