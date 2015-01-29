var pc = require("paperclip"),
fs = require("fs"),
memoize = require("memoizee");



module.exports = function (app) {
  app.bind("server", { max: 1, to: initialize.bind(null, app) }).now();
}

function initialize (app, server) {

  var loadTemplate = memoize(function (filepath, callback) {
    callback(null, pc.template(fs.readFileSync(filepath, "utf8")));
  }, { async: true, maxAge: 1000 });

  function engine (filepath, properties, callback) {
    loadTemplate(filepath, function (err, template) {
      if (err) return callback(err);
      callback(null, template.view(properties).render().toString());
    });
  };

  app.set("pc", pc);


  server.engine("pc", engine);
  server.set("view engine", "pc");


}