function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<!doctype html> <html lang="en-US"><head><meta charset="UTF-8"><title>Browsersync, Gulp + Swig templates</title><link rel="stylesheet" href="css/main.css"></head><body><h1>' +
      escapeXml(data.title) +
      '!</h1></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);