'use strict';


// Declare app level module which depends on filters, and services
angular.module('WalkaboutSG', ['WalkaboutSG.filters', 'WalkaboutSG.services', 'WalkaboutSG.directives', 'WalkaboutSG.controllers', 'google-maps']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: 'MapCtrl'});
    $routeProvider.otherwise({redirectTo: '/map'});
  }]);
