angular.module('routerRoutes', ['ngRoute'])

//configure our routes
.config(function($routeProvider, $locationProvider){
	$routeProvider

		.when('/', {
			templateUrl :'app/views/home.html',
			controller : 'HomeController',
			controllerAs : 'home',
			title : 'Bienvenue sur Mon Application'
		})
		
		.otherwise({
			redirectTo : '/'
		});


	$locationProvider.html5Mode(true);
});