var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(buildRawPage(req));

  // XSS via innerHTML: /innerhtml?text=alert(document.domain)
  function buildRawPage(req) {
    return '<html>'
      + '<body>'
      + '<p id="tag"></p>'
      + '</body>'
      + '<script>'
      + 'var el = document.getElementById("tag");'
      + 'el.innerHTML = ' + req.query.text + ';'
      + '</script>'
      + '</html >'
  }
});

module.exports = router;
