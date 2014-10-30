var marked = require("marked"),
he = require("he")

module.exports = function (content) {
  var content = marked(content || "");

  content = renderExamples(content);

  return content;
}


var _i = 0;
function renderExamples (content) {


  console.log(content);
  var examples = content.replace(/<!--([\s\S]+?)-->\n+<pre><code class="lang-(html)">([\s\S]+?)<\/code><\/pre>/g, function (match) {

    var example = match.match(/<!--([\s\S]+?)-->\n+<pre><code class="lang-(html)">([\s\S]+?)<\/code><\/pre>/);

    var config = example[1],
    lang       = example[2],
    source     = example[3].replace(/&.*?;/g,function (v) { return he.decode(v); }),
    _id        = _i++;

    console.log(source);

    var buffer = "<script type='text/javascript' id='script-"+_id+"'>";

    buffer += "requestAnimationFrame(function() {"
      buffer += "var frag = new Example({" + 
        "config: decodeURIComponent('"+encodeURIComponent(config)+"')," + 
        "source: decodeURIComponent('"+encodeURIComponent(source).replace(/\'/g,'\\\'')+"')," + 
      "}).render();";

      buffer += "var script    = document.getElementById('script-"+_id+"');"
      buffer += "script.parentNode.insertBefore(frag, script);"

    buffer += "});";

    buffer += "</script>";

    return buffer;
  });


  return examples;
}