app.factory('ResultsFactory', function($http, $q) {
	return {

		getResults: function(searchTerms, services) {
			var promiseForAllResults = services.map(function(service) {
				return $http.get('/' + service, {
					params: searchTerms
				});
			});
			
			return $q.all(promiseForAllResults).then(function(responses) {
				return responses.map(function(response) {
					return response.data;
				});
			});
		}
	};
});