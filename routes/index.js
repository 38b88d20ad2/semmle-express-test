var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // Generate a userid for the IDOR case.
  var userid = Math.floor(Math.random() * 1000);
  res.cookie('userid', userid, { maxAge: 360000, httpOnly: false, secure: false });

  res.render('index', { title: "Express Test App", id: userid});
});

module.exports = router;
