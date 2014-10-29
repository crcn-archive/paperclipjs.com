var BaseView = require("../../base");

var ace = require("brace");

require("brace/mode/javascript");
require("brace/mode/html");
require("brace/theme/tomorrow_night");
require("brace/theme/tomorrow");
require("brace/theme/monokai");



module.exports = BaseView.extend({
  template: require("./index.pc"),
  initialize: function () {

    var div = document.createElement("div");
    var editor = ace.edit(div);
    editor.getSession().setUseWorker(false)
    editor.renderer.setShowGutter(false)
    editor.getSession().setUseWrapMode(true)
    editor.setTheme("ace/theme/tomorrow_night");
    editor.setOptions({
      maxLines: Infinity
    });

    this.set("content", div);

    var self = this;
    editor.on("input", function () {
      self.file.source = editor.getValue();
      self.onSourceChange(self.file);
    });

    this.bind("file", function (file) {
      editor.getSession().setMode("ace/mode/" + file.lang);
      editor.getSession().setValue(file.source);
    }).now();
  },
  onSourceChange: function (source) {

  }
});