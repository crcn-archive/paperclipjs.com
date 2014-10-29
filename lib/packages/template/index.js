var express = require("express");

module.exports = function (app) {
  app.bind("pc", { max: 1, to: initialize.bind(null, app) }).now();
}

function initialize (app, pc) {
  pc.blockBinding("layout", require("./bindings/block/layout"));
  pc.blockBinding("block", require("./bindings/block/block"));
  require("./modifiers")(pc);
}