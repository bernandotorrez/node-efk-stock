var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var flash = require('express-flash');
var session = require('express-session');
// Initial Route
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
var homeRouter = require('./routes/home');
// Initial Route

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "B3rnando'",
  resave: true,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours,
  saveUninitialized: true,
  //cookie: { secure: true, maxAge: 3600 }
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
