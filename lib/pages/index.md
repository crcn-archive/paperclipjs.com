Paperclip is a template engine designed for the DOM. It works by leveraging the browser's built-in cloneNode() method whenever a template is used. The result is blazing-fast performance.

<!--
{
  numbers: _.shuffle(_.range(1000))
}
-->

```html
Rendering <strong>{{numbers.length}}</strong> numbers: <br />

{{#each:numbers,as:'number'}}
  {{number}} <br />
{{/}}
```

------------------------------------------------------------------

## Explicit data bindings

Paperclip comes with a set of operations that offer you *complete* control over data flow. Define blocks that are unbound, two-way data-bound, or one-way data-bound.

<!--
{
  name: "Will Ferrell"
}
-->

```html
What's your name?

<!-- 
  <~> - bind both ways
  <~  - bind changes from property
  ~>  - bind changes to property
  ~   - don't watch for changes
-->

<input class="form-control" type="text" model="{{ <~>name }}"></input>

Bound: {{name}} <br />
Unbound: {{~name}}
```


------------------------------------------------------------------

## Installation

Paperclip works in the browser, and on the server.

[NPM](http://nodejs.com) Installation: 

`npm install paperclip --save-exact`

[Bower](http://bower.io/) Installation: 

`bower install paperclip`

Compressed Source Code:

`https://raw.githubusercontent.com/mojo-js/paperclip.js/master/dist/paperclip.min.js`

Uncompressed Source Code:

`https://raw.githubusercontent.com/mojo-js/paperclip.js/master/dist/paperclip.js`






