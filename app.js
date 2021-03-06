var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dxqRouter = require('./routes/dxq');

var app = express();

var http = require('http');
var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 可跨域 ,编码格式
app.all('*', function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With');
  response.header(
    'Access-Control-Allow-Methods',
    'PUT,POST,GET,DELETE,OPTIONS'
  );
  response.header('X-Powered-By', '3.2.1');
  response.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dxq', dxqRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen('3000');

module.exports = app;
