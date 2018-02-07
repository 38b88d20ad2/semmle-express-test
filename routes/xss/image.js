var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(buildRawPage(req));

  // XSS via an image source tag: /image?src=x"%20onerror="alert(document.domain);"
  function buildRawPage(req) {
    return '<html>'
      + '<body>'
      + '<img src="' + req.query.src + '">'
      + '</body>'
      + '</html >'
  }
});

module.exports = router;
