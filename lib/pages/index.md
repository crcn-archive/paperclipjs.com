Paperclip is a template engine designed for the DOM. It works by compiling templates to document fragments, then clones them whenever they're needed. The result is [blazing-fast rendering](http://jsperf.com/pc-templating-comparison) with <a href="https://pbs.twimg.com/media/B1Z3mHHCcAAk7Zc.png:large">very few moving parts</a>.

Paperclip will also only update the elements it needs to, so you can expect [highly efficient](http://requirebin.com/?gist=425cdb646205bb819477) user interfaces that won't lag when data changes. 

<!--
{
  numbers: _.shuffle(_.range(1000))
}
-->

```html
Rendering <strong>{{ numbers.length }}</strong> numbers: <br />

{{#each: numbers, as:'number' }}
  {{ number }} <br />
{{/}}
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

## Additional Features

✔ [Customizable block helpers](http://requirebin.com/?gist=858e3b7928eea5e1bed6) <br />
✔ Customizable rendering engine <br />
<!--✔ No strange DOM manipulations / quirks <br />-->
✔ Interoperable with other libraries <br />
<!--✔ Rendered views are manipulable - paperclip won't overwrite any changes<br />-->
✔ Small CPU & memory footprint <br />
✔ Inline javascript <br />
✔ Works with old browsers (IE 8+) <br />
✔ No browser dependencies <br />
✔ Accepts plain JS models <br />


------------------------------------------------------------------

## Installation

[NPM](http://nodejs.org): 

`npm install paperclip --save-exact`

[Bower](http://bower.io/): 

`bower install paperclip`

Production (50kb compressed):

`https://raw.githubusercontent.com/mojo-js/paperclip.js/master/dist/paperclip.min.js`

Development:

`https://raw.githubusercontent.com/mojo-js/paperclip.js/master/dist/paperclip.js`






