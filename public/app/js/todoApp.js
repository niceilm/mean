"use strict";
var meanTodoApp = angular.module('meanTodoApp', ['ngRoute', 'ngResource']);

meanTodoApp.
  factory('TodoService', ['$resource', function($resource) {
    return $resource('/todos/:id', {id : '@id'}, {'update' : {method : 'PUT'}});
  }]);

meanTodoApp.
  controller('TodoCtrl', function($scope, TodoService) {
    $scope.todos = [];
    $scope.addTodo = addTodo;
    $scope.updateTodo = updateTodo;
    $scope.delTodo = delTodo;
    load();

    function load() {
      $scope.todos = TodoService.query(function(results) {
        $scope.todos = results;
      });
    }

    function addTodo() {
      TodoService.save({title : $scope.title}, function() {
        load();
      });
    }

    function updateTodo(todo) {
      todo.$update({title : $scope.title});
    }

    function delTodo(todo) {
      todo.$remove(function() {
        load();
      });
    }
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