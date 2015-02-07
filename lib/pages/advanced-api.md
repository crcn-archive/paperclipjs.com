#### paperclip.accessor

Accessor for the context of the view. Here's an example of a plain-old JavaScript accessor. Note that this is similar to how AngularJS works.

```javascript

var extend = require("xtend");

function POJOAccessor () {
  this._getters  = {};
  this._watchers = [];
}

extend(POJOAccessor.prototype, {

  /**
   * casts an object into the proper type that the accessor
   * can handle (do nothing)
   */

  castObject: function (object) { return object; },

  /**
   * calls a function on the object
   */

  call: function (context, path, params) {

    var fnName = path.pop(),
    fnCtx      = path.length ? this.get(object, path) : context;

    if (!fnCtx) return;
    return fnCtx[fnName].call(fnCtx, params);
  },

  /**
   * returns a property from the object
   */

  get: function (object, path) {

    var pt = path.join("."), getter;
    if (!(getter = this._getters[pt])) {
      getter = this._getters[pt] = new Function("return this." +pt);
    }

    // is undefined - fugly, but works for this test.
    try {
      return getter.call(object);
    } catch (e) {
      return void 0;
    }
  },

  /**
   * sets a property on the object, triggers the dirty check
   */

  set: function (object, path, value) {
    var pt = path.join("."), setter;
    if (!(setter = this._setters[pt])) {
      setter = this._setters[pt] = new Function("value", "return this." +pt+"=value");
    }

    var ret;
    // is undefined - fugly, but works for this test.
    try {
      ret = setter.call(object, value);
    } catch (e) {
      return void 0;
    }

    // apply dirty check
    this.apply();

    return ret;
  },

  /**
   * watches a property on the object
   */

  watchProperty: function (object, path, listener) {
    
    var self = this;
    var watcher = {
      context: object,
      apply: function () {
        var newValue = self.get(object, path);
        if (newValue === this.currentValue && typeof newValue !== "function") return;
        var oldValue = this.currentValue;
        this.currentValue = newValue;
        listener(newValue, this.currentValue);
      }
    };
    
    this._watchers.push(watcher);
    
    return {
      trigger: function(){
        watcher.apply();
      },
      dispose: function () {
        var i = self._watchers.indexOf(watcher);
        if (~i) self._watchers.splice(i, 1);
      }
    }
  },

  /**
   */

  watchEvent: function (object, event, listener) {
    // do nothing
    return {
      dispose: function(){}
    }
  },

  /**
   */

  normalizeCollection: function (collection) {
    return collection;
  },

  /**
   */

  normalizeObject: function (object) {
    return object;
  },

  /**
   */

  apply: function () {
    for (var i = 0, n = this._watchers.length; i < n; i++) {
      this._watchers[i].apply();
    }
  }
};

// override the global accessor
paperclip.accessorClass = POJOAccessor;

// or override the accessor of just the template
var template = paperclip.template("hello {{name}}", {
  accessorClass: POJOAccessor
});

var view = template.view({ name: "Ariel" });

document.body.appendChild(view.render());


```

#### paperclip.components

Object containing all components. 

#### paperclip.attributes

Object containing all attribute helpers. 

#### paperclip.modifiers

Object containing all expression modifiers. 

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

The [node factory](https://github.com/mojo-js/nofactor.js) for creating elements. Use this to
make your component compatible with the NodeJS and the browser.

#### component.name

The component name.

#### component.section

The [document section](https://github.com/mojo-js/document-section.js) which contains all the elements

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

The attribute key.

#### attribute.value

The attribute value.

#### attribute.context

The context of the attribute.

