var express = require('express');
var rn = require('random-number');
var router = express.Router();

router.get('/', function (req, res, next) {
  // Get the userid from the cookie:
  var userid = req.cookies['userid']

  // Get the userid from the url param.
  var id = req.query.id

  if (userid === id) {
    res.send('Hi Test User. This is your test profile page. Can you access other user\'s test profile pages');
  } else {
    // (whacky) IDOR.
    res.send('IDOR: You should not be able to reference records only based on their ids');
  }
});

module.exports = router;
