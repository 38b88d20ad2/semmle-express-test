var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if ((req.cookies['token'] == null) || (req.cookies['token'] == '')) {
    res.cookie('token', 'value', { maxAge: 360000, httpOnly: false, secure: false });
  }

  res.send(buildRawPage(req));

  // XSS via a cookie: e.g., cookie value '<script>alert(document.domain);</script>'
  function buildRawPage(req) {
    return '<html>'
      + '<body>'
      + '<p>Cookie Value: ' + req.cookies['token'] + '</p>'
      + '</body>'
      + '</html >'
  }
});

module.exports = router;
