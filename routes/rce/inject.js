var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // /rce/inject?input=4444441111
  // /rce/inject?input=res.end(require('fs').readFileSync('/etc/passwd').toString())
  var resp = eval("(" + req.query.input + ")");

  if (resp == undefined) {
    resp = "You can inject code via the input param. e.g., '?input=res.end(require('fs').readFileSync('/etc/passwd').toString())'"
  }

  res.send('Output: <br />' + resp);
});

module.exports = router;
