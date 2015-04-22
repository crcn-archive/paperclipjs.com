Paperclip is a reactive template engine that compiles HTML to DOM. All optimizations happen at compile time, so you can expect [snappy](http://paperclip-dbmonster.herokuapp.com/) and [efficient](https://cloud.githubusercontent.com/assets/757408/6500910/c1091c90-c2c6-11e4-953c-452ed5717daf.png) user interfaces across desktop, and mobile devices. 

<br />

<!--
{
  numItems: 1000,
  range: function (count) {
    return _.range(Math.min(count, 20000)).reverse();
  }
}
-->

```html
<!-- speed demo for rendering a dynamic list of items -->

Generate <input type="text" class="form-control" style="width:60px;display:inline-block;" value="{{<~>numItems}}"></input> items: <br />

<repeat each="{{ range(numItems) }}" as='number'>
  {{~number}} <br />
</repeat>
```

-------------------------------------------------------------------

## Interoperable

Paperclip doesn't make any assumptions about your codebase. Easily use paperclip in [Backbone](http://jsfiddle.net/3o4622z3/2/), Anglar, or Ember-based applications.

------------------------------------------------------------------

## Explicit data bindings

Paperclip comes with a set of operators that give you *complete* control over data flow. Define blocks that are unbound, two-way data-bound, or one-way data-bound.

<!--
{
  name: "Will Ferrell"
}
-->

```html
What's your name?

<!-- 
  <~> - bind both ways
  ~   - don't watch for changes
-->

<input class="form-control" type="text" value="{{ <~>name }}"></input>

Bound: {{ name }} <br />
Unbound: {{ ~name }}
```

------------------------------------------------------------------


## Additional features

✔ Isomorphic <br />
✔ Small CPU & Memory footprint <br />
✔ Small file size (41kb gzipped) <br />
✔ Accepts plain JS models <br />
✔ Optimizations happen at compile time <br />
✔ Customizable rendering engine <br />
✔ Interoperable with other libraries using [accessors](http://paperclipjs.com/advanced-api) <br />
✔ Supports inline javascript <br />
✔ Works with old browsers (IE 8+) <br />
✔ Unit testable in NodeJS <br />
✔ No browser dependencies <br />


------------------------------------------------------------------

## Installation

[NPM](http://nodejs.org): 

`npm install paperclip --save`

[Bower](http://bower.io/): 

`bower install paperclip`

Production:

`https://raw.githubusercontent.com/mojo-js/paperclip.js/master/dist/paperclip.min.js`

Development:

`https://raw.githubusercontent.com/mojo-js/paperclip.js/master/dist/paperclip.js`

Quick browser usage:

```html
  <script type="text/javascript" src="./paperclip.min.js"></script>

  <script type="text/javascript">

    // create the template. accepts a string, or pre-compiled template
    var template = paperclip.template(
      "hello {{message}}!"
    );

    // create the view from the template
    var view = template.view({
      message: "world"
    });

    // render the view, and append to the DOM
    // Should say "hello world!"
    document.body.appendChild(view.render());
  </script>
```

------------------------------------------------------------------

## Command line usage

Paperclip templates can also be compiled straight to javascript. This is a great utility if you want to pre-compile your templates for the browser, or want to use Paperclip in a module system such as [requirejs](http://requirejs.org/), or [browserify](http://browserify.org/). In your project directory, simply run:

```
npm install paperclip
```

then run:

```
./node_modules/.bin/paperclip -i ./template.pc > ./template.pc.js
```

to compile templates into JavaScript.
