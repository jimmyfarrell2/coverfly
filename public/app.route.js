app.config(function($stateProvider, $locationProvider) {
	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'components/search/searchView.html',
		controller: 'SearchController'
	})

	.state('login', {
		url: '/login',
    	templateUrl: 'components/users/loginView.html',
    	controller: 'LoginController'
	})

	.state('logout', {
		url: '/logout',
    	templateUrl: 'components/users/loginView.html',
    	controller: 'LoginController'
	})

	.state('signup', {
		url: '/signup',
		templateUrl: 'components/users/signupView.html',
		controller: 'SignupController'
	});

	// $stateProvider.state('user', {
	// 	url: '/:username',
	// 	templateUrl: 'components/search/searchView.html',
	// 	controller: 'SearchController'
	// });

	$locationProvider.html5Mode(true);
});