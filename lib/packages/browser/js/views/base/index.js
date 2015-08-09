var BindableObject = require("bindable-object"),
paperclip = require("paperclip");



module.exports = BindableObject.extend(
  function (properties) {

    BindableObject.call(this, properties);

    this["this"] = this;

    // TODO - change view accessor to bindable object
    var self = this;
    this.on("change", function () {
      // if (self._view) self._view.accessor.apply();
      if (this._view) this._view.updateLater();
    }.bind(this));
  },
  {
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
    return this.section = (this._view = paperclip.template(this.template).view(this)).render();
  },
  remove: function () {
    if (this._view) this._view.remove();
  }
});
