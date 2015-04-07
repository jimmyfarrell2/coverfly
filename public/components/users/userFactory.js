app.factory('UserFactory', function($http) {
	return {

		registerNewUser: function(userCredentials) {

			return $http.post('/register', userCredentials)
			.then(function(response) {
				return response.data;
			});
		},

		getUser: function(userCredentials) {
			
			return $http.post('/' + userCredentials.username, {
				password: userCredentials.password
			})
			.then(function(response) {
				return response.data;
			});
		}
	};
});