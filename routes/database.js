var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('database', { title: 'Database', certifications: certifications });
});

module.exports = router;
