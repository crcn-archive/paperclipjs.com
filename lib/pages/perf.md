Paperclip templates are translated from HTML, straight to JavaScript - this also includes data-bindings. For example, here's a template:

```html
hello {{name}}!
```

Here's the templated translated to JavaScript:

```javascript
module.exports = (function(fragment, block, element, text, comment, parser, modifiers) {
  return fragment([text("hello "), block({
    'value': {
      run: function() {
          return this.context.name;
      },
      refs: [ ["name"] ]
    }
  })]);
});
```

Pretty clear what's going on. Here's what we know at a glance:

<!--
More stuff here - no innerHTML, DOM abstractions. Generated template item is a DOM element.
-->

1. Generated DOM is identical to the HTML templates. No weird manipulations here.
2. Data-bindings are identified *as the template is created*. Note that this happens *once* for every template. Paperclip takes each translated template, caches them, and uses the browser's native `cloneNode()` whenever a template is used. 
3. JavaScript references within the templates are identified at translation time, and cached in the data-binding.

As it turns out, the method above for generating templates is very efficient. Essentially, paperclip does the least amount of work necessary to update the DOM since it know where everything is. 

Paperclip will also lazily batch DOM changes together into one update, and run them on requestAnimationFrame. This kind of optimization is similar to how layout engines work, and helps prevent
unnecessary performance penalties in the browser.