app.controller('SearchController', function($scope, $sce, ResultsFactory) {
	$scope.currentService = 'spotify';
	$scope.services = ['spotify', 'soundcloud', 'youtube'];

	$scope.results = {};

	$scope.searchTerms = {
		artist: '',
		song: ''
	};

	$scope.setService = function(service) {
		$scope.currentService = service;
	};

	$scope.submit = function(userInput) {
		if (userInput.artist.toLowerCase() ===
				$scope.searchTerms.artist.toLowerCase() &&
			userInput.song.toLowerCase() ===
				$scope.searchTerms.song.toLowerCase()) return;
		
		$scope.searchTerms = angular.copy(userInput);

		ResultsFactory.getResults($scope.searchTerms, $scope.services)
		.then(function(allResults) {
			$scope.results.spotify = allResults[0];
			$scope.results.soundcloud = allResults[1];
			$scope.results.youtube = allResults[2];
		});
	};

	$scope.getResultUrl = function(result, service) {
		if (service === 'spotify') return $sce.trustAsResourceUrl(result.preview_url);
		if (service === 'soundcloud') return $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=' + result.uri + '&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false');
		if (service === 'youtube') return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + result.videoId);
	};
});