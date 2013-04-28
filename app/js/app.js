'use strict';
/*
Define and configure all modules in app.js:
angular.module('yourAppName', ['yourAppDep']);
angular.module('yourAppDep');
Define controllers, services, etc. on modules like this:
angular.module('yourAppDep').controller('MyCtrl', function () {
  // ...
});
*/


// Declare app level module which depends on filters, and services
angular.module('WalkaboutSG', ['WalkaboutSG.filters', 'WalkaboutSG.services', 'WalkaboutSG.directives', 
	'WalkaboutSG.controllers', 'google-maps', 'ngResource', 'ui']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: 'MapCtrl'});
    $routeProvider.when('/walkabouts', {templateUrl: 'partials/walkabouts.html', controller: 'WalkaboutListCtrl'});
    // $routeProvider.when('/walkabouts', {templateUrl: 'partials/walkabouts.html', controller: 'WalkaboutCtrl'});
    $routeProvider.otherwise({redirectTo: '/map'});
  }]);
