
module.exports = require("paperclip").Component.extend({
  update: function () {
    var layout = this.view.context.app.layouts[this.attributes.name];

    // var subContext = new BindableObject(this.context.toJSON());

    this.view.set("blocks.main", this.childTemplate.view(this.view.context));

    var view = layout.view(this.view.context);


    if (this.view.context.blocks)
    for (var blockName in this.view.context.blocks) {
      this.view.set("blocks." + blockName, this.view.context.blocks[blockName]);
    }




    this.section.replaceChildNodes(view.render());
  }
});
