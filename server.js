var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');
var fs = require('fs');
var routes = require('./routes/routes');
var passport = require('passport');
require('./settings/passport/login.passport')(passport);


var app = express();

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized : false
}));
app.use(flash());

logger.token('res', function getId(res) {
	return res;
});
var accessLogStream = fs.createWriteStream(__dirname + '/settings/logs/access.log', {flags: 'a'});
// setup the logger
app.use(logger(':req[body] :res[body]', {stream: accessLogStream}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

exports.httpMsgsFormat = "JSON";