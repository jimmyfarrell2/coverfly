app.controller('MainController', function($scope, $location) {
	$scope.currentPage = function(viewLocation) { 
        return viewLocation === $location.path();
    };
});