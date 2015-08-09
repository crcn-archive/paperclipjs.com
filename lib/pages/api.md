
## API

#### template template(source, options)

Creates a new template.

- `options` - options for the template
  - `components` - component classes
  - `attributes` - attribute helpers
  - `modifiers`  - property modifiers
  - `viewClass`  - view class to use
  - `document`   - the document to use. Useful if you want to change the rendering engine.
  - `compile`    - method for compiling a template into javascript

```javascript
var pc       = require("paperclip");
var template = pc.template("hello {{name}}!");
```

#### view template.view([context])

Creates a new view which controls a cloned document fragment provided by the template.

- `context` - Can be anything. A backbone model, ember model, vanilla object. Be
sure to specify the `template accessor` if this is other than plain-old object.

#### view.render()

Returns the cloned document fragment which can be added to the DOM.

```javascript
var pc = require("paperclip");
var template = pc.template("hello {{name}}!");
var view = template.view({ name: "Bill Murray" });
document.body.appendChild(view.render()); // will show "hello Bill Murray"
```

#### view.set(key, value)

Sets a property on the context of the view & updates the DOM.

#### view.setProperties(properties)

Sets multiple properties on the view & updates the DOM.

#### view.context

The context that the view is currently bound to. This can be anything.

#### view.remove()

Removes the views from the DOM.

## Block Syntax

#### {{ blocks }}

Variable blocks as placeholders for information that might change. For example:

<!--
{
  name: {
    first: "Tom",
    last: "Hanks"
  }
}
-->

```html
hello {{ name.first }} {{ name.last }}!
```

You can also specify blocks within attributes.

<!--
{
  color: "blue"
}
-->

```html
my favorite color is <span style="color: {{color}}">{{color}}</span>
```

Paperclip also supports **inline javascript**. For example:

<!--
{
  message: undefined
}
-->

```html
hello {{ message || "World" }}! <br />
inline-json {{ {'5+10 is':5+10, 'message is defined?' : message ? 'yes' : 'no' } | json }}
```

## Modifiers

Modifiers format data in a variable block. A good example of this might be presenting data to the user depending on their locale, or parsing data into markdown. Here's an example of how you can use
modifiers:

<!--
function () {

  paperclip.modifiers.divide = function (age, number) {
    return age/number;
  };

  paperclip.modifiers.round = Math.round;

  return {
    age: 30
  };
}
-->

```html
A human that is {{age}} years old is like a {{ age | divide(5.6) | round }} year old dog!
```

## Binding Operators

Paperclip comes with various binding operators that give you full control over how references are handled. You can easily
specify whether to bind one way, two ways, or not at all. Here's the basic syntax:

<!--
{
  name: "Emma Stone"
}
-->

```html
Two-way binding:
<input class="form-control" value="{{ <~>name }}" />

Bind input value to name only:
<input class="form-control" value="{{ ~>name }}" />

Bind name to input value only:

<input class="form-control" value="{{ <~name }}" />

Unbound helper - don't watch for any changes:
{{ ~name }}
```

## Built-in Components

#### &lt;unsafe html={{content}} /&gt;

Similar to escaping content in mustache (`{{{content}}}`). Good for security. The HTML block also accepts DOM nodes, and template views.

<!--
{
  content: "hello <strong>world</strong>!"
}
-->

```html
Unsafe:
<unsafe html="{{content}}" /> <br />

Safe:
{{ content }} <br />
```


#### &lt;show when={{condition}} /&gt;

Conditional helper

<!--
{
  show: true
}
-->

```html
<show when="{{show}}">
  <h3>Hello World!</h3>
</show>
```



#### &lt;switch /&gt;

Conditional block helper

<!--
{
  age: 24
}
-->

```html
<input type="text" class="form-control" placeholder="What's your age?" value="{{ <~>age }}"></input>

<switch>
  <show when="{{ age >= 18 }}">
    You're legally able to vote in the U.S.
  </show>
  <show when="{{ age > 16 }}">
  You're almost old enough to vote in the U.S.
    </show>
  <show>
    You're too young to vote in the U.S.
  </show>
</switch>
```

#### &lt;repeat each={{source}} as='item' /&gt;

Creates a list of items.

- `as` - property to define for each iterated item. If this is omitted, the context of the embedded
template will be the iterated item itself.

> The source can be a vanilla array, or any other type of collection. Be sure to
implement `accessor.normalizeCollection` if you're providing a source that's different than
an array.


<!--
{
  items: _.shuffle(_.range(4))
}
-->

```html
<repeat each="{{items}}" as="i">
  item {{i}} <br />
</repeat>
```

Or:

```html
<ul>
  <li repeat.each="{{items}}" repeat.as="i">item {{i}} <br /></li>
</ul>
```

## Attribute helpers

Below are a list of data binding attributes you can use with elements.

#### value={{ context }}

Input data binding

<!--
{
  message: "What's up?"
}
-->

```html
<input type="text" class="form-control" placeholder="Type in a message" value="{{ <~>message }}"></input>
<h3>{{message}}</h3>
```

#### checked={{ context }}

Checked data binding

<!--
{
  checked: true
}
-->

```html
<div class="pull-right">
    {{ checked ? "uncheck" : "check" }} me
    <input type="checkbox" checked="{{ <~>checked }}"></input>
</div>

<br />

<show when="{{checked}}">
   <h3>Checked!</h3>
</show>
```

Notice the `<~>` operator. This tells paperclip to bind both ways. See [binding operators](#binding-operators) for more info.

#### onEvent={{ expression }}

Executed when an event is fired on the DOM element. Here are all the available events:

- `onChange` - called when an element changes
- `onClick` - called when an element is clicked
- `onLoad` - called when an element loads - useful for `<img />`
- `onSubmit` - called on submit - useful for `<form />`
- `onMouseDown` - called on mouse down
- `onMouseUp` - called on mouse up
- `onMouseOver` - called on mouse over
- `onMouseOut` - called on mouse out
- `onKeyDown` - called on key down
- `onKeyUp` - called on key up
- `onEnter` - called on enter key up
- `onDelete` - called on delete key up

<!--
{

}
-->

```html
<input type="text" class="form-control" placeholder="Type in a message" onEnter="{{ enterPressed = true }}"></input>

<show when="{{enterPressed}}">
  <h3>enter pressed</h3>
</show>

```

#### enable={{ bool }}

Toggles the enabled state of an element.

<!--
{
  formIsValid: false
}
-->

```html
<button class="btn btn-default" enable="{{ formIsValid }}">Sign Up</button>
```

#### focus={{ bool }}

Focuses cursor on an element.

<!--
{
  focus: false
}
-->

```html
<input class="form-control" focus="{{ focus }}"></input>
```

#### easeIn={{ easer }}

eases in an element

<!--
{
  count: 10,
  range: function (count) {
    return _.range(count);
  },
  fadeIn: function (node) {
    $(node).fadeIn();
  },
  fadeOut: function (node, complete) {
    $(node).fadeOut(complete);
  }
}
-->

```html
<input type='text' class="form-control" placeholder="num items" value="{{<~>count}}"></input>
<ul>
    <li repeat.each="{{ range(count) }}" repeat.as="i" easein="{{fadeIn}}" easeout="{{fadeOut}}">item {{i}}</li>
</ul>
```

#### easeOut={{ easer }}

eases out an element

<!--
{
  fadeIn: function (node) {
    $(node).fadeIn();
  },
  fadeOut: function (node, complete) {
    $(node).fadeOut(complete);
  }
}
-->

```html
<button class="btn btn-primary" onClick="{{show=!show}}">{{show ? 'hide' : 'show'}} message</button>
<show when="{{show}}">
  <h3 easeIn="{{fadeIn}}" easeOut="{{fadeOut}}">Hello World!</h3>
</show>
```


## Command Line Usage

Paperclip comes with a command line utility for compiling templates to JavaScript. Simply install paperclip
via NPM in your project, then run:

```
cat ./template.pc | ./node_modules/.bin/paperclip > ./template.js
```
