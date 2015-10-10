var App = angular.module('App.controllers', [])

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route, userService) {

  $scope.invite = function() {
    $location.path('/invite');
  };

  $scope.update = function(course) {
    $location.path('/update/' + course.key);
  };

  $scope.delete = function(course) {
    $rootScope.status = 'Deleting guest ' + course.name + '...';
    $http.post('/rest/delete', {'key': course.key})
    .success(function(data, status, headers, config) {
      for (var i=0; i<$rootScope.courses.length; i++) {
        if ($rootScope.courses[i].key == course.key) {
          $rootScope.courses.splice(i, 1);
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

  for (var i=0; i<$rootScope.courses.length; i++) {
    if ($rootScope.courses[i].key == $routeParams.key) {
      $scope.course = angular.copy($rootScope.courses[i]);
    }
  }

  $scope.submitUpdate = function() {
    $rootScope.status = 'Updating...';
    $http.post('/rest/update', $scope.course)
    .success(function(data, status, headers, config) {
      for (var i=0; i<$rootScope.courses.length; i++) {
        if ($rootScope.courses[i].key == $scope.course.key) {
          $rootScope.courses.splice(i,1);
          break;
        }
      }
      $rootScope.courses.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  };

});