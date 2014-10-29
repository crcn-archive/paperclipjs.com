var BindableObject = require("bindable-object");


var app = new BindableObject({
  debug: process.env.NODE_ENV === "debug",
  config: {
    http: {
      port: process.env.PORT || 8081
    },
    directories: {
      public: __dirname + "/public",
      pages: __dirname + "/pages",
      layouts: __dirname + "/layouts"
    }
  }
});

[
  require("./packages/pages"),
  require("./packages/server"),
  require("./packages/public"),
  require("./packages/layouts"),
  require("./packages/browser"),
  require("./packages/engine"),
  require("./packages/template"),
  require("./packages/less.js")
].forEach(function (plugin) {
  plugin(app);
});
