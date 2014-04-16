var express = require('express');
var cors = require('cors');
var favicon = require('static-favicon');
var logger = require('morgan');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var path = require('path');

var routes = require('./routes');
var user = require('./routes/user');
var routerTodo = require('./routes/todo');
var routerUser = require('./routes/user');
var db = require('./models');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.use(favicon());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cors({
  'origin' : true,
  'credentials' : true,
  'headers' : ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'],
  'methods' : ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  'maxAge' : 32000
}));
app.use(serveStatic(path.join(__dirname, 'public/app')));

// development only
if('development' == app.get('env')) {
  app.use(errorHandler());
}

app.all('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'public/app/', 'parker.html'));
});

app.use('/api/todos', routerTodo);
app.use('/api/users', routerUser);

db.sequelize.sync({ force : false }).complete(function(err) {
  if(err) {
    throw err;
  } else {
    var server = app.listen(app.get('port'), function() {
      console.log('Express server listening on port ' + server.address().port);
    });
  }
});