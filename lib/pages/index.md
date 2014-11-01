Paperclip is a template engine designed for the DOM. It works by leveraging the browser's built-in cloneNode() method whenever a template is used. The result is blazing-fast rendering.

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






