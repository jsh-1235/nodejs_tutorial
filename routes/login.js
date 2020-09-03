var express = require('express');
var router = express.Router();
var path = require('path')

/* GET users listing. */
router.get('/', function (req, res, next) {
  //var root = path.dirname(require.main.filename)

  var root = path.resolve();

  //var filename = root + "\\public\\html\\login.html"
  var filename = root + "/public/html/login.html"

  console.log("Path : " + filename);

  res.sendFile(filename)
});

module.exports = router;
