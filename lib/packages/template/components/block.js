
module.exports = require("paperclip").Component.extend({
  update: function (blockName) {
    this.view.set(["blocks", blockName], this.childTemplate.view(this.view.context));
  }
})