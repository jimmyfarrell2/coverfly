app.controller('LoginController', function($scope, UserFactory) {

	$scope.login = function(userInput) {

		UserFactory.getUser(userInput)
		.then(function(userInfo) {
			console.log(userInfo);
			$scope.userInfo = userInfo;
		});
	};
});