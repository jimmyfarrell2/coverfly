app.controller('LoginController', function($scope, $state, UserFactory) {

	$scope.error = '';

	function makeLoginForm() {
		$scope.userInput = {
			username: null,
			password: null
		};
	}

	$scope.login = function(userInput) {
		UserFactory.getUser(userInput)
		.then(function(userInfo) {
			if (typeof userInfo === 'string') {
				$scope.error = userInfo;
				makeLoginForm();
				$scope.loginForm.$submitted = false;
				return;
			}
			$scope.user.loggedIn = true;
			$scope.user.userInfo = userInfo;
			$state.go('home');
		});
	};

	makeLoginForm();
});