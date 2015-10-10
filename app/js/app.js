'use strict';


var App = angular.module('App', ['ngRoute', 'App.controllers', 'App.services']);



App.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller : 'MainCtrl',
    templateUrl: '/partials/main.html',
    resolve    : { 'courseService': 'courseService' },
  });
  $routeProvider.when('/invite', {
    controller : 'InsertCtrl',
    templateUrl: '/partials/insert.html',
  });
  $routeProvider.when('/update/:key', {
    controller : 'UpdateCtrl',
    templateUrl: '/partials/update.html',
    resolve    : { 'courseService': 'courseService' },
  });
  $routeProvider.otherwise({
    redirectTo : '/'
  });
});

App.config(function($httpProvider) {
  $httpProvider.interceptors.push('myHttpInterceptor');
});



