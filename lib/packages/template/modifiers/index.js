module.exports = function (pc) {
  pc.modifier("markdown", require("./markdown"));
  pc.modifier("readfile", require("./readfile"));
}