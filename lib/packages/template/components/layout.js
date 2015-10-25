
module.exports = require("paperclip").Component.extend({
  update: function () {
    if (this._initialized) return;
    this._initialized = true;
    // this.mainView.update();
    this.layout    = this.view.get(["app", "layouts", this.attributes.name]);

    this.mainBlock = this.childTemplate.view(this.view.context, {
      parent: this.view
    });

    this.mainView  = this.layout.view(this.view.context, {
      parent: this.view
    });

    this.mainView.set("blocks.main", this.mainBlock);

    this.section.appendChild(this.mainView.render());
  }
});
