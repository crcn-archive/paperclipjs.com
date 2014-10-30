var BaseBlockBinding = require("paperclip").BaseBlockBinding,
BindableObject       = require("bindable-object");

module.exports = BaseBlockBinding.extend({
  didChange: function (layoutName) {
    var layout = this.context.app.layouts[layoutName];

    // var subContext = new BindableObject(this.context.toJSON());

    this.context.set("blocks.main", this.contentTemplate.bind(this.context));


    var view = layout.bind(this.context);

    if (this.context.blocks)
    for (var blockName in this.context.blocks) {
      this.context.set("blocks." + blockName, this.context.blocks[blockName]);
    }


    this.section.replaceChildNodes(view.render());
  }
})