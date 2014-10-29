glob = require("glob"),
path = require("path"),
fs   = require("fs"),
pc = require("paperclip");

module.exports = function (app) {
  glob.sync(app.config.directories.layouts + "/*.pc").forEach(function (fullPath) {
    app.set("layouts." + path.basename(fullPath).split(".").shift(), pc.template(require(fullPath)));
  });
}