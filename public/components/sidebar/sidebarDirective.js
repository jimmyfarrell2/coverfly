app.directive('sidebar', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/sidebar/sidebarView.html',
		link: function(scope, element, attrs) {
			// scope.loadPlayist = function(playlist) {
			// 	scope.current.playlist = (scope.current.playlist !== playlist) ? playlist : null;
			// };
		}
	};
});