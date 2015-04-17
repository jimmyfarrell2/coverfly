app.directive('error', function() {
	return {
		restrict: 'E',
		transclude: true,
		templateUrl: 'shared/errorView.html'
	};
});