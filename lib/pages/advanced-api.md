#### paperclip.blockBinding(name, blockBindingClass)

Registers a new block binding class. Block bindings allow you to modify how templates behave. Some examples
include the `{{#if:condition}}{{/}}`, and `{{html:content}}`.

#### BaseBlockBinding(options)

Base class to extend when creating custom block bindings. Here's an example for a [components binding](http://requirebin.com/?gist=858e3b7928eea5e1bed6):

```javascript
var pc = require("paperclip");

var ComponentBlockBinding = pc.BaseBlockBinding.extend({
  bind: function (context) {
    this.view = this.template.bind();
    this.section.appendChild(this.view.render());
    pc.BaseBlockBinding.prototype.bind.call(this, context);
  },
  _onChange: function (properties) {
    this.view.context.setProperties(properties);
  }
});

pc.blockBinding("hello", ComponentBlockBinding.extend({
  hello: pc.template("hello <strong>{{message}}</strong>!")
});
```

template:

```html
{{ hello: { message: "world" }}}
```

#### override bind(context)

Called when the block is added, and bound to the DOM. This is where you initialize your binding.
Be sure to call `paperclip.BaseBlockBinding.prototype.bind.call(this, context)` if you override.
this method

#### override unbind()

Called when the block is removed from the DOM. This is a cleanup method.

#### override _onChange(context)

Called whenever the properties change for the block binding. These properties are defined in the
template. Here's the syntax:

```html
{{blockName: blockProperties }}
```

#### nodeFactory

the [node factory](https://github.com/mojo-js/nofactor.js) for creating elements. Use this to
make your block binding compatible with the NodeJS and the browser.

#### scriptName

the name registered for the block binding

#### section

the [document section](https://github.com/mojo-js/document-section.js) which contains all the elements

#### contentTemplate

the content template - this might be undefined if your block binding doesn't have `{{#block:properties}}content{{/}}`.

#### childBlockTemplate

The child block template. Used in the [conditional block](https://github.com/mojo-js/paperclip.js/blob/master/lib/paper/bindings/block/conditional.js).