var BaseView   = require("../base"),
AceEditor      = require("./ace/index.js"),
paperclip      = require("paperclip");

module.exports = BaseView.extend({
  template: require("./index.pc"),
  willRender: function () {

    var self = this;

    this.set("files", [
      { name: "template", source: this.source, lang: "html"     },
      { name: "config", source: this.config.replace(/(^[\s\r\n\t]+|[\s\r\n\t]+$)/,""), lang: "javascript" }
    ]);


    this.set("editor", new AceEditor({
      file: this.set("currentFile", this.files[0]),
      onSourceChange: function (file) {
        self.updatePreview();
      }
    }));

  },
  setFile: function (file) {
    console.log()
    this.editor.set("file", file);
  },
  updatePreview: function () {

    var tpl = this.files[0].source, conf = this.files[1].source;

    var config = (new Function("return " + conf.replace(/[\n\r]/g,"")))();

    this.set("preview", paperclip.template(tpl).bind(config).render());
  }
});