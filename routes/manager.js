var express = require('express');
var router = express.Router();

const authenticateUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(301).redirect('/login');
  }
};

/* GET manager page. */
router.get('/', authenticateUser, function (req, res, next) {
  res.render('manager', { title: 'Manager', certifications: certifications });
});

module.exports = router;
