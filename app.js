/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var cors = require('cors');
var db = require('./models');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cors({
  'origin' : true,
  'credentials' : true,
  'headers' : ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Versioneh '],
  'methods' : ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  'maxAge' : 32000
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public/app')));

// development only
if('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'public/app/', 'parker.html'));
});

// select
app.get('/api/todos', function(req, res) {
  db.Todo.findAll().success(function(todos) {
    res.json(todos);
  });
});

// create
app.post('/api/todos', function(req, res) {
  db.Todo.create(req.body).success(function(todo) {
    res.json();
  });
});

// update
app.put('/api/todos/:todoId', function(req, res) {
  var todoId = req.param('todoId');
  db.Todo.find(todoId).success(function(todo) {
    todo.updateAttributes(req.body, ['title']).success(function() {
      res.json();
    });
  });
});

// delete
app.del('/api/todos/:todoId', function(req, res) {
  var todoId = req.param('todoId');
  db.Todo.find(todoId).success(function(todo) {
    todo.destroy().success(function() {
      res.json();
    });
  });
});

// select target
app.get('/api/todos/:todoId', function(req, res) {
  var todoId = req.param('todoId');
  db.Todo.find(todoId).success(function(todo) {
    res.json(todo);
  });

});

db.sequelize.sync({ force : false }).complete(function(err) {
  if(err) {
    throw err;
  } else {
    http.createServer(app).listen(app.get('port'), function() {
      console.log('Express server listening on port ' + app.get('port'));
    });
  }
});