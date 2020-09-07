var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var card = require('./routes/card');
var manager = require('./routes/manager');
var login = require('./routes/login');
var encryption = require('./routes/encryption');
var ajax = require('./routes/ajax');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules')));

//==================================================================================================================================
var passport = require('passport')

var session = require('express-session');

var flash = require('connect-flash');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000     // 1 hour        
    }
}));

app.use(express.urlencoded({ extended: false }));  // 클라이언트의 form값을 req.body에 넣음

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

//==================================================================================================================================

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/card', card)
app.use('/manager', manager)
app.use('/login', login)
app.use('/encryption', encryption)
app.use('/ajax', ajax)

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

module.exports = app;
