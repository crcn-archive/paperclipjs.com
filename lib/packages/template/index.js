var express = require("express");

module.exports = function (app) {
  app.bind("pc", { max: 1, to: initialize.bind(null, app) }).now();
}

function initialize (app, pc) {
  pc.components.layout = require("./components/layout");
  require("./modifiers")(pc);
}
