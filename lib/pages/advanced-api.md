#### paperclip.components

object containing all components. 

#### paperclip.attributes

object containing all attribute helpers. 

#### paperclip.modifiers

object containing all expression modifiers. 

#### paperclip.Component(options)

Base class to extend when creating custom components.<!-- Here's an example for a [components binding](http://requirebin.com/?gist=858e3b7928eea5e1bed6):-->

```javascript
var pc = require("paperclip");

var HelloComponent = pc.Component.extend({

  /**
   * called when the component is created
   */

  initialize: function () {
    this.textNode = this.nodeFactory.createTextNode("");
    this.section.appendChild(this.textNode);
  },

  /**
   * called when the attributes change
   */

  update: function () {
    // called when attributes change
    this.textNode.nodeValue = "Hello " + this.attributes.message;
  }
});

// register the component
pc.components.hello = HelloComponent;

var tpl = pc.template("<hello message={{message}} />");
var view = tpl.view({message:"world"})

document.body.appendChild(view.render()); // hello world
```

#### override component.bind(context)

Called when the block is added, and bound to the DOM. This is where you initialize your binding.
Be sure to call `paperclip.Component.prototype.bind.call(this, context)` if you override.
this method

#### override component.unbind()

Called when the block is removed from the DOM. This is a cleanup method.

#### override component.update()

Called whenever the attributes change on the component. 

#### component.context

the context of the component

#### component.nodeFactory

the [node factory](https://github.com/mojo-js/nofactor.js) for creating elements. Use this to
make your component compatible with the NodeJS and the browser.

#### component.name

The component name.

#### component.section

the [document section](https://github.com/mojo-js/document-section.js) which contains all the elements

#### component.childTemplate

The child template.

#### paperclip.Attribute

The base attribute helper class. 

```javascript
var HelloAttribute = paperclip.Attribute.extend({
  
  /**
   * called on instantiation
   */

  initialize: function () {
  },

  /**
   * called wen attrs change
   */

  update: function () {

  }
});
```

#### attribute.key

the attribute key


#### attribute.value

the attribute value

#### attribute.context

the context of the attribute

