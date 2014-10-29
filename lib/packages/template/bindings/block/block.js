var BaseBlockBinding = require("paperclip").BaseBlockBinding;

module.exports = BaseBlockBinding.extend({
  didChange: function (blockName) {
    this.context.set(["blocks", blockName], this.contentTemplate.bind(this.context));
  }
})