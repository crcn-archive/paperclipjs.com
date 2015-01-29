
module.exports = require("paperclip").Component.extend({
  update: function () {
    var layout = this.context.app.layouts[this.attributes.name];

    // var subContext = new BindableObject(this.context.toJSON());

    this.context.set("blocks.main", this.childTemplate.view(this.context));

    var view = layout.view(this.context);

    if (this.context.blocks)
    for (var blockName in this.context.blocks) {
      this.context.set("blocks." + blockName, this.context.blocks[blockName]);
    }


    this.section.replaceChildNodes(view.render());
  }
});
