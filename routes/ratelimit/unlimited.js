var express = require('express');
var router = express.Router();
var maxCounter = 11;

router.get('/', function (req, res, next) {
  res.send('This page should not be rate limited. '
    + 'If you issue more than 5 requests in 1 min and you are not limited, '
    + 'that\'s an indication that the page is not rate limited.');
});

module.exports = router;
