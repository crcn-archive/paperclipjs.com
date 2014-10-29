var express = require("express");

module.exports = function (app) {
  app.bind("server", { max: 1, to: initialize.bind(null, app) }).now();
}

function initialize (app, server) {
  server.use(express.static(app.config.directories.public, {
    maxAge: 86400000
  }))
}