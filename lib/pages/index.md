<p>PaperclipJS is a template engine designed for the DOM. It works by leveraging the browser's built-in cloneNode() method whenever a template is used. The result is blazing-fast rendering.

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

<!--## Installation-->