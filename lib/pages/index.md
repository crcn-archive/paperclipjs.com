PaperclipJS is a tiny immutable virtual dom library for building user interfaces. It compiles HTML straight to JavaScript, and only updates the parts it needs to. This means you get über fast apps with a low CPU & memory footprint.

Paperclip was designed for interoperability, and customization. Incorporate it into your existing application, or use it with any rendering engine (DOM, Canvas, WebGL, server-side).

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
