var marked = require("marked");

module.exports = function (content) {
  var content = marked(content || "");

  content = renderExamples(content);

  return content;
}


var _i = 0;
function renderExamples (content) {


  var examples = content.replace(/<p><!--([\s\S]+?)--><\/p>\n<pre><code class="lang-(html)">([\s\S]+?)<\/code><\/pre>/g, function (match) {

    var example = match.match(/<p><!--([\s\S]+?)--><\/p>\n<pre><code class="lang-(html)">([\s\S]+?)<\/code><\/pre>/);

    var config = example[1],
    lang       = example[2],
    source     = example[3].replace(/&lt;/g,"<").replace(/&gt;/g,">"),
    _id        = _i++;

    var buffer = "<script type='text/javascript' id='script-"+_id+"'>";

    buffer += "requestAnimationFrame(function() {"
      buffer += "var frag = new Example({" + 
        "config: decodeURIComponent('"+encodeURIComponent(config)+"')," + 
        "source: decodeURIComponent('"+encodeURIComponent(source)+"')," + 
      "}).render();";

      buffer += "var script    = document.getElementById('script-"+_id+"');"
      buffer += "script.parentNode.insertBefore(frag, script);"

    buffer += "});";

    buffer += "</script>";

    return buffer;
  });


  return examples;
}