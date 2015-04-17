app.controller('SignupController', function($scope, $state, UserFactory) {

	$scope.error = '';

	function makeSignupForm () {
		$scope.userInput = {
			username: null,
			password: null
		};
	}

	$scope.signup = function(userInput) {
		UserFactory.registerNewUser(userInput)
		.then(function(newUser) {
			if (typeof newUser === 'string') {
				$scope.error = newUser;
				makeSignupForm();
				$scope.signupForm.$submitted = false;
				return;
			}
			$scope.user.loggedIn = true;
			$scope.user.userInfo = newUser;
			$state.go('home');
		});
	};

	makeSignupForm();
});