## Dots

<!--
function () {

  var dots = _.range(100).map(function (i) {
    return new BindableObject({i:i});
  });

  var interval = setInterval(function () {
    for (var i = dots.length; i--;) dots[i].set("i", dots[i].i + 1);
  }, 100);
 

  return {
    dots: dots,
    dispose: function () {
      clearInterval(interval);
    }
  }
}

-->

```html
<ul repeat.each={{dots}} repeat.as='dot'>
  <li>{{dot.i}}</li>
</ul>
```