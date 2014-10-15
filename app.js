
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', require('hogan-express'));

app.use(express.favicon(__dirname +'/public/images/favicon.ico'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.cookieParser());
app.use(express.cookieSession({
  key: 'datahero.sess',
  secret: 'dataheroRocks!'
}));
app.use(app.router);

['./routes/api/employee-groups/'].forEach(function(routePath){
  require(routePath)(app);
});
//404s are handled by frontend
app.get('*', function(req, res) {
  res.sendfile('public/index.html', {root: __dirname })
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

