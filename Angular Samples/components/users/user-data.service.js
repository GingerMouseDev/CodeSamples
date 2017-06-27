(function () {

	/**
	 * User service
	 */

	angular
		.module('@appName@.users')
		.factory('UserDataService', UserDataService);

	// Factory DI
	UserDataService.$inject = [
		'$resource',
		'envConfig'
	];

	// Factory
	function UserDataService ($resource, envConfig) {

		// Resource params
		var url = envConfig.usersBaseUrl + '/:action',
			paramDefaults = {
				action: '@action'
			},
			actions = {

				// User register
				register: {
					method: 'POST',
					transformResponse: transformResponse
				},

				// User login
				login: {
					method: 'POST',
					transformResponse: transformResponse
				},

				// User forgot password
				forgot: {
					method: 'POST',
					transformResponse: transformResponse
				}

			};
		
		return $resource(url, paramDefaults, actions);
		
	}

	// Modify response to include headers
	function transformResponse (data, headersGetter) {

		return {
			data: angular.fromJson(data || "{}"),
			headers: headersGetter()
		};
		
	}
	
})();