var express = require('express');
var router = express.Router();
var maxCounter = 11;

router.get('/', function (req, res, next) {
  res.send('This page is rate limited. You should hit the rate limiter by issuing 5 requests in 1 minute.');
});

module.exports = router;
