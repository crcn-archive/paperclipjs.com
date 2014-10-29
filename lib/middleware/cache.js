module.exports = function (ttl, invalidate) {

  if (!invalidate) invalidate = function (req) {
    console.log(req);
  }

  return function (req, res, next) {
    console.log("CACHE");
  }
}