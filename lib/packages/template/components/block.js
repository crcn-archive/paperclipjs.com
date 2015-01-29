
module.exports = require("paperclip").Component.extend({
  update: function (blockName) {
    this.context.set(["blocks", blockName], this.childTemplate.view(this.context));
  }
})