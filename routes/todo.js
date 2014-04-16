var express = require('express');
var router = express.Router();
var db = require('../models');
router.route('/')
  .get(selectAll)
  .post(create);
router.route('/:todoId')
  .put(update)
  .delete(remove)
  .get(selectOne);

module.exports = router;

// select
function selectAll(req, res) {
  db.Todo.findAll().success(function(todos) {
    res.json(todos);
  });
}


// create
function create(req, res) {
  db.Todo.create(req.body).success(function(todo) {
    res.json();
  });
}

// update
function update(req, res) {
  var todoId = req.param('todoId');
  db.Todo.find(todoId).success(function(todo) {
    todo.updateAttributes(req.body, ['title', 'complete']).success(function() {
      res.json();
    });
  });
}

// delete
function remove(req, res) {
  var todoId = req.param('todoId');
  db.Todo.find(todoId).success(function(todo) {
    todo.destroy().success(function() {
      res.json();
    });
  });
}

// select target
function selectOne(req, res) {
  var todoId = req.param('todoId');
  db.Todo.find(todoId).success(function(todo) {
    res.json(todo);
  });
}

