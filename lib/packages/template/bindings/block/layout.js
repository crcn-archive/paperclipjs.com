var BaseBlockBinding = require("paperclip").BaseBlockBinding,
BindableObject       = require("bindable-object");

module.exports = BaseBlockBinding.extend({
  didChange: function (layoutName) {
    var layout = this.context.app.layouts[layoutName];

    var subContext = new BindableObject(this.context.toJSON());

    subContext.set("blocks.main", this.contentTemplate.bind(subContext));


    var view = layout.bind(subContext);

    if (subContext.blocks)
    for (var blockName in subContext.blocks) {
      console.log(blockName)
      subContext.set("blocks." + blockName, subContext.blocks[blockName]);
    }


    this.section.replaceChildNodes(view.render());
  }
})