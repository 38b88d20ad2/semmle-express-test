var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var RateLimit = require('express-rate-limit');

var index = require('./routes/index');

// XSS examples.
var image = require('./routes/xss/image');
var cookie = require('./routes/xss/cookie');
var innerhtml = require('./routes/xss/innerhtml');

// CSRF examples.
var csrfp = require('./routes/csrf/protected');
var nocsrfp = require('./routes/csrf/unprotected');

// IDOR example.
var idor = require('./routes/idor/door');

// Rate limiter examples.
var limited = require('./routes/ratelimit/limited');
var unlimited = require('./routes/ratelimit/unlimited');

var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5,
  delayMs: 0 // disabled
});

var inject = require('./routes/rce/inject');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// The landing page.
app.use('/', index);
app.use('/index', index);

// XSS examples.
app.use('/xss/image', image);
app.use('/xss/cookie', cookie);
app.use('/xss/innerhtml', innerhtml);

// CSRF examples.
app.use('/csrf/protected', csrfp);
app.use('/csrf/unprotected', nocsrfp);

// IDOR example.
app.use('/idor/door', idor);

// Apply rate limiter only to /ratelimit/limited
app.use('/ratelimit/limited', limiter);
app.use('/ratelimit/limited', limited);
app.use('/ratelimit/unlimited', unlimited);

// RCE examples.
app.use('/rce/inject', inject);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
