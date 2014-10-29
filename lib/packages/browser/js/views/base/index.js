var BindableObject = require("bindable-object"),
paperclip = require("paperclip");

module.exports = BindableObject.extend({
  willRender: function () {
  },
  initialize: function () {
  },
  render: function () {
    if (!this._initialized) {
      this._initialized = true;
      this.initialize();
    }
    this.willRender();
    return this.section = paperclip.template(this.template).bind(this).render();
  },
  remove: function () {
    if (this.section) this.section.remove();
  }
});