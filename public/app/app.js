var app = angular.module('myapp',['routerRoutes', 'ui.bootstrap']);

app.controller('HomeController', [function(){
  var vm=this;

  vm.message="Proudly propulsed by Come's Stack"
}]);