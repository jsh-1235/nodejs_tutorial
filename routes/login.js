var express = require('express');
var router = express.Router();
var path = require('path')

var fs = require('fs');

var passport = require('passport')

var LocalStrategy = require('passport-local').Strategy;

/* GET manager page. */
router.get('/', function (req, res) {
  var root = path.resolve();

  var filename = root + "/public/html/login.html"

  fs.readFile(filename, function (error, data) {
    res.send(data.toString());
  });
});

router.post('/:state', function (req, res, next) {

  var state = req.param('state');

  console.log(state);

  if (state == 'in') {

    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(500).json(err);
      }

      if (!user) {
        return res.status(401).json(info.message)
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        else {
          res.redirect('/manager');
        }
      });
    })(req, res, next);
  } else if (state == 'out') {
    req.logout();

    res.redirect('/');
  }
});

passport.use('local', new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, id, password, done) {
  if (id === 'user' && password === '12345') {
    return done(null, {
      'id': id,
      'password': password
    });
  } else {
    return done(null, false, { message: 'Inorrect ID or Password' });
  }
}));

passport.serializeUser(function (user, done) {
  console.log('passport session save : ' + user.id + " : " + user.password)

  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  console.log('passport session get username : ', id)

  done(null, id);
});

module.exports = router;
