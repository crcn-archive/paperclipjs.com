var glob = require("glob"), fs = require("fs");

module.exports = function (app) {
  app.bind("server", { max: 1, to: initialize.bind(null, app) }).now();
}

function initialize (app, server) {

  var pagesDir = app.config.directories.pages;

  server.set("views", pagesDir);

  fs.readdirSync(pagesDir).filter(function (fileName) {
    return /\.pc$/.test(fileName);
  }).forEach(function (fileName) {

    var routeName = fileName.split(".").shift();

    var route = routeName === "index" ? "/" : "/" + routeName;

    server.all(route, function (req, res) {
      res.render(fileName, {
        app: app
      });
    });
  });
}