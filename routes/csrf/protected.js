var express = require('express');
var rn = require('random-number');
var router = express.Router();

// Use a double submit cookie to provide CSRF protection.
router.get('/', function (req, res, next) {
  cookieValue = rn();
  res.cookie('token', cookieValue, { maxAge: 360000, httpOnly: false, secure: false });

  res.send(buildRawPage(req));

  function buildRawPage(req) {
    return '<html>'
      + '<body>'
      + '<form method="POST" height=300; width=300; action="/csrf/protected">'
      + '<input type="hidden" name="csrftok" value="' + cookieValue + '"/>'
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

  var message = "This form uses a double-submit cookie. The CSRF tokens should always match. <br />";
  if (token === csrf) {
    message += 'The CSRF tokens match. <br />';
  } else {
    message += 'The CSRF tokens DO NOT match. <br />';
  }
  message += 'Expected: ' + token + '<br />' + 'Received: ' + csrf;

  res.send(message);
});

module.exports = router;
