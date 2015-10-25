PaperclipJS is a tiny immutable virtual dom library for building user interfaces. It compiles HTML straight to JavaScript, and only updates the parts it needs to. This means you get über fast apps with a low CPU & memory footprint.

Paperclip was designed for interoperability, and customization. Incorporate it into your existing application, or use it with any rendering engine (DOM, Canvas, WebGL, server-side).

<br />


<!--
## Any rendering engine

Paperclip works with any rendering engine. Easily build sophisticated user interfaces that interoperate between DOM, WebGL, Canvas, SVG, and more. Here's a simple [pixi.js demo](https://github.com/mojo-js/paperclip.js/tree/master/examples/common/documents/pixi):

index.js:

```javascript

```

template.pc:

```html
How many bunnies? <input type="text" value={{<~>numBunnies}}></input>

<pixi>
    <repeat each={{range(numBunnies)}} as='bunny'>
    </repeat>
</pixi>
```
-->
