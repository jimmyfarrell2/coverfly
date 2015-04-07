app.controller('SignupController', function($scope, $location, UserFactory) {


	$scope.signup = function(userInput) {
		UserFactory.registerNewUser($scope.userInput)
		.then(function(newUser) {
			return;
			// $location.path('/home');
		});
	};
});