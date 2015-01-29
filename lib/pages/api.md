
## API

#### template template(source)

Creates a new template

```javascript
var pc = require("paperclip");
var template = pc.template("hello {{name}}!");
```

#### view template.view([context])

Creates a new view which controls a cloned document fragment provided by the template. 

`context` - Object, or [BindableObject](https://github.com/mojo-js/bindable-object.js). The context contains properties which get displayed in the template.

#### view.render()

Returns the cloned document fragment which can be added to the DOM.

```javascript
var pc = require("paperclip");
var template = pc.template("hello {{name}}!");
var view = template.view({ name: "Bill Murray" });
document.body.appendChild(view.render()); // will show "hello Bill Murray"
```

#### view.bind(context)

KBinds the view to a new context.2

```javascript
var pc = require("paperclip");
var template = pc.template("hello {{name}}!");
var view = template.view({ name: "Bill Murray" });
document.body.appendChild(view.render()); // will show "hello George Clooney"
view.bind({ name: "Bill Clinton" }); // will show "hello Bill Clinton"
```

#### view.context

The context that the view is currently bound to. This is a [BindableObject](https://github.com/mojo-js/bindable-object.js).

```javascript
var tpl = paperclip.template("hello {{name}}!");
var view = tpl.view({ name: "Will Smith" });
document.body.appendChild(view.render());  // will show "hello Will Smith"

// triggered whenever name has changed
view.context.bind("name", function (name) {
  console.log("name has changed!");
});

// only updates the elements bound to name
view.context.set("name", "Oprah Winfrey");  // will show "hello Oprah Winfrey"
```

#### view.remove()

Removes the views from the DOM.

#### String paperclip.parse(source)

Translates a template into JavaScript.

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
<unsafe html={{content}} /> <br />

Safe:
{{ content }} <br />
```

Or:

```html
<div unsafe.html={{content}} />
```


#### &lt;show when={{condition}} /&gt;

Conditional helper

<!--
{
  show: true
}
-->

```html
<show when={{show}}>
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
<input type="text" class="form-control" placeholder="What's your age?" value={{ <~>age }}></input>

<switch>
  <show when={{ age >= 18 }}>
    You're legally able to vote in the U.S.
  </show>
  <show when={{ age > 16 }}>
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

> the source can be either an Array, or a [Bindable Collection](https://github.com/mojo-js/bindable-collection.js). Bindable Collections will allow you to dynamically update the `each` block outside of the template.

<!--
{
  items: _.shuffle(_.range(4))
}
-->

```html
<repeat each={{items}} as='i'>
  item {{i}} <br />
</repeat>
```

Or:

```html
<ul repeat.each={{items}} repeat.as='i'>
  <li>item {{i}} <br /></li>
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
<input type="text" class="form-control" placeholder="Type in a message" value={{ <~>message }}></input>
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
<input type="checkbox" class="form-control" placeholder="Type in a message" checked={{ <~>checked }}></input>
<show when={{checked}}>
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
<input type="text" class="form-control" placeholder="Type in a message" onEnter={{ enterPressed = true }}></input>

<show when={{enterPressed}}>
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
<button class="btn btn-default" enable={{ formIsValid }}>Sign Up</button>
```

#### focus={{ bool }}

Focuses cursor on an element.

<!--
{
  focus: false
}
-->

```html
<input class="form-control" focus={{ focus }}></input>
```


## Command Line Usage

Paperclip comes with a command line utility for compiling templates to JavaScript. Simply install paperclip
via NPM in your project, then run:

```
./node_modules/.bin/paperclip -i ./template.pc > ./template.pc.js
```
