Paperclip is a reactive template engine designed for the DOM. It works by compiling templates to document fragments, then clones them whenever they're needed. The result is [blazing-fast rendering](http://jsperf.com/pc-templating-comparison) with <a href="https://pbs.twimg.com/media/B1Z3mHHCcAAk7Zc.png:large">very few moving parts</a>.
<br /><br />

Paperclip will also only update the elements it needs to, so you can expect [highly efficient](http://requirebin.com/?gist=425cdb646205bb819477) user interfaces that won't lag when data changes. 

<!--
{
  numItems: 1000,
  repeat: function (count) {
    return _.range(Math.min(count, 20000)).reverse();
  }
}
-->

```html
Generate <input type="text" class="form-control" style="width:60px;display:inline-block;" model="{{<~>numItems}}"></input> items: <br />

{{#each: repeat(numItems), as: 'number' }}
  {{~number}} <br />
{{/}}

```

-------------------------------------------------------------------

## Interoperable

Paperclip doesn't make any assumptions about your codebase. Easily use paperclip in Backbone, Angular, or Ember-based applications. For example, here's how you might implement a [fast-repeat directive](http://plnkr.co/edit/dgalyKuVqJdfKLGJNdnm?p=preview) for Angular:

```html
<ul fast-repeat="data" fast-as="item">
  <li>item {{item}}</li>
</ul>
```

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

<input class="form-control" type="text" model="{{ <~>name }}"></input>

Bound: {{ name }} <br />
Unbound: {{ ~name }}
```

<!-------------------------------------------------------------------

## Interoperable

Paperclip doesn't do anything fancy to your templates. Everything's converted into regular DOM nodes which you can easily manipulate after a view has been rendered. 

-->

------------------------------------------------------------------

## Additional features

✔ Small CPU footprint <br />
✔ [Templates are translated to JavaScript](https://gist.github.com/crcn/2565c78c03a4a65cb524)  <br />
✔  [Works with code coverage tools such as istanbul](https://cloud.githubusercontent.com/assets/757408/4878446/ab0896ba-630c-11e4-9d14-fa1fc0179b1e.png) <br />
✔ [Customizable block helpers](http://requirebin.com/?gist=858e3b7928eea5e1bed6) <br />
✔ Customizable rendering engine <br />
<!--✔ No strange DOM manipulations / quirks <br />-->
✔ Interoperable with other libraries <br />
<!--✔ Rendered views are manipulable - paperclip won't overwrite any changes<br />-->
✔ Supports inline javascript <br />
✔ Works with old browsers (IE 8+) <br />
✔ Unit testable <br />
✔ No browser dependencies <br />
✔ Accepts plain JS models <br />


------------------------------------------------------------------

## Installation

[NPM](http://nodejs.org): 

`npm install paperclip`

[Bower](http://bower.io/): 

`bower install paperclip`

Production (50kb compressed):

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
