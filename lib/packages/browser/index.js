require("es5-shim");

var paperclip = require("paperclip"),
browserify = require("browserify-middleware");



module.exports = function (app) {
  app.bind("server", { max: 1, to: initialize.bind(null, app) }).now();
}

function initialize (app, server) {
  app.server.get("/app.bundle.js", browserify(__dirname + "/js/entry.js", {
    transform: [require("./transform")],
    cache: app.debug ? 'dynamic' : true,
    minify: !app.debug,
    extensions: [".coffee", ".js", ".pc"]
  }));
}