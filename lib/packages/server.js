var express = require("express"),
compress    = require("compression"),
cache       = require("../middleware/cache");

module.exports = function (app) {
  var server = express(), port = app.config.http.port;
  server.listen(port);
  console.log("http server listening on port %d", port);
  server.use(compress())
  // server.use(cache(1000))
  app.set("server", server);
}