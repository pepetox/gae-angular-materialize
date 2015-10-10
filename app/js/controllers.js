var App = angular.module('App.controllers', [])

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {

  $scope.invite = function() {
    $location.path('/invite');
  };

  $scope.update = function(guest) {
    $location.path('/update/' + guest.id);
  };

  $scope.delete = function(guest) {
    $rootScope.status = 'Deleting guest ' + guest.id + '...';
    $http.post('/rest/delete', {'id': guest.id})
    .success(function(data, status, headers, config) {
      for (var i=0; i<$rootScope.guests.length; i++) {
        if ($rootScope.guests[i].id == guest.id) {
          $rootScope.guests.splice(i, 1);
          break;
        }
      }
      $rootScope.status = '';
    });
  };

});

App.controller('InsertCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {

  $scope.submitInsert = function() {
    var course = {
      name : $scope.name,
      description : $scope.description,
      lang :  $scope.lang
    };
    $rootScope.status = 'Creating...';
    $http.post('/rest/insert', course)
    .success(function(data, status, headers, config) {
      $rootScope.courses.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  }
});

App.controller('UpdateCtrl', function($routeParams, $rootScope, $scope, $log, $http, $location) {

  for (var i=0; i<$rootScope.guests.length; i++) {
    if ($rootScope.guests[i].id == $routeParams.id) {
      $scope.guest = angular.copy($rootScope.guests[i]);
    }
  }

  $scope.submitUpdate = function() {
    $rootScope.status = 'Updating...';
    $http.post('/rest/update', $scope.guest)
    .success(function(data, status, headers, config) {
      for (var i=0; i<$rootScope.guests.length; i++) {
        if ($rootScope.guests[i].id == $scope.guest.id) {
          $rootScope.guests.splice(i,1);
          break;
        }
      }
      $rootScope.guests.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  };

});