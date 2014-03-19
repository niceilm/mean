"use strict";
var meanTodoApp = angular.module('meanTodoApp', ['ngRoute', 'ngResource']);

meanTodoApp.
  factory('TodoService', ['$resource', function($resource) {
    return $resource('/api/todos/:todoId', {todoId : '@id'}, {'update' : {method : 'PUT'}});
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

  controller('TodoDetailCtrl', function($scope, $routeParams, TodoService) {
    var todo = TodoService.get($routeParams, function() {
      todo.$get(function() {
        $scope.todo = todo;
      });
    });
  });

meanTodoApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl : '/partials/todo/todo-list.html'
    }).
    when('/detail/:todoId', {
      templateUrl : '/partials/todo/todo-detail.html'
    }).
    otherwise({
      redirectTo : '/'
    });
});