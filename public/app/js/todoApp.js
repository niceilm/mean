"use strict";
var meanTodoApp = angular.module('meanTodoApp', ['ngRoute', 'ngResource']);

meanTodoApp.
  factory('TodoService', ['$resource', function($resource) {
    return $resource('/todos/:todoId');
  }]);

meanTodoApp.
  controller('TodoCtrl', function($scope, TodoService) {
    $scope.todos = [
      {title : "Hello World1"},
      {title : "Hello World2"}
    ];
    $scope.todos = TodoService.query(function(results) {
      $scope.todos = results;
    });
//    $scope.add = add;
//    function add() {
//      TodoService.
//
//    }
  }).

  controller('TodoDetailCtrl', function($scope) {

  });

meanTodoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl : 'partials/todo/todo-list.html',
      controller : 'TodoCtrl'
    }).
    when('/detail/:todoId', {
      templateUrl : 'partials/todo/todo-detail.html',
      controller : 'TodoDetailCtrl'
    }).
    otherwise({
      redirectTo : '/'
    });
}]);