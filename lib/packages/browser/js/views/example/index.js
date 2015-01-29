var BaseView   = require("../base"),
AceEditor      = require("./ace/index.js"),
paperclip      = require("paperclip"),
BindableObject = require("bindable-object"),
traverse       = require("traverse");


module.exports = BaseView.extend({
  template: require("./index.pc"),
  willRender: function () {

    var self = this;

    this.set("files", [
      new BindableObject({ name: "template", source: this.source, lang: "html"     }),
      new BindableObject({ name: "config", source: this.config.replace(/(^[\s\r\n\t]+|[\s\r\n\t]+$)/,""), lang: "javascript" })
    ]);

    this.set("editor", new AceEditor({
      onSourceChange: function (file) {
        self.updatePreview();
      }
    }));

    this.setFile(this.files[0]);

  },
  setFile: function (file) {
    if (this.selectedFile) this.selectedFile.set("selected", false);
    file.set("selected", true);
    this.editor.set("file", this.set("selectedFile", file));
  },
  updatePreview: function () {


    var tpl = this.files[0].source, conf = this.files[1].source;

    this.__config = (new Function("return " + conf.replace(/[\n\r]/g,"")));
    this.__compiled = paperclip.template("<div>" + tpl + "</div>");

    this.run();
  },
  run: function () {

    if (this._disposable && this._disposable.dispose) {
      this._disposable.dispose();
    }

    var conf = this.__config();

    if (typeof conf === "function") {
      this._disposable = conf = conf(this);
    }

    var _confirmed = true;

    // safe guard incase 
    traverse(conf).forEach(function (x) {
      if (x && x.length > 30000) _confirmed = confirm("Looks like your config is super big - this might take a while. Continue?")
    });

    if (!_confirmed) return;

    var start = Date.now();
    var preview = this.__compiled.view(conf).render();
    this.set("speed", Date.now() - start);

    this.set("preview", preview);
  }
});