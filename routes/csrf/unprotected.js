var express = require('express');
var rn = require('random-number');
var router = express.Router();

// Use a double submit cookie to provide CSRF protection.
router.get('/', function (req, res, next) {
  var cookieValue = rn();
  res.cookie('token', cookieValue, { maxAge: 360000, httpOnly: false, secure: false });

  res.send(buildRawPage(req));

  function buildRawPage(req) {
    return '<html>'
      + '<body>'
      + '<form method="POST" height="300px"; width="300px"; action="/csrf/unprotected">'
      + '<input type="hidden" name="csrftok" value="static-value"/>'
      + '<button type="submit">Submit</button>'
      + '</form >'
      + '</body>'
      + '</html>';
  }
});

router.post('/', function (req, res) {
  // Read the token from the cookie.
  var token = req.cookies['token'];

  // Read the token from the form.
  var csrf = req.body.csrftok;

  var message = 'This is an insecure form. The csrf tokens cannot possibly match. '
    + 'In a real-world app, CSRF attacks would be possible. <br />'
    + 'Expected: ' + token + '<br />'
    + 'Received: ' + csrf;

  res.send(message);
});

module.exports = router;
