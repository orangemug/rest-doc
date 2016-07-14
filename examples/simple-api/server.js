var router = require("express").Router();

router.get("/client.js", function() {
  var b = browserify();
  b.add(__dirname+'/client.js');
  b.bundle().pipe(res);
});

module.exports = router;
