app.controller('MainController', function($scope, $location, $state, ResultsFactory) {
	$scope.user = {
		loggedIn: false,
		userInfo: {}
	};

	$scope.current = {};

	$scope.results = ResultsFactory.results;

	$scope.currentPage = function(viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.logout = function() {
		$scope.user.loggedIn = false;
		$scope.user.userInfo = {};
		$state.go('home');
	};

	$scope.loadPlaylist = function(playlist) {
		$scope.current.playlist = ($scope.current.playlist !== playlist) ? playlist : null;
	};
});