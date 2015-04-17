app.controller('SidebarController', function($scope) {
	$scope.loadPlayist = function(playlist) {
		$scope.current.playlist = ($scope.current.playlist !== playlist) ? playlist : null;
	};
});