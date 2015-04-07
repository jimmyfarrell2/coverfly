app.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'components/search/searchView.html',
		controller: 'SearchController'
	})

	.when('/home', {
		templateUrl: 'components/users/homeView.html',
		controller: 'HomeController'
	})

	.when('/login', {
    	templateUrl: 'components/users/loginView.html',
    	controller: 'LoginController'
	})
	
	.when('/signup', {
		templateUrl: 'components/users/signupView.html',
		controller: 'SignupController'
	});

	$locationProvider.html5Mode(true);
});