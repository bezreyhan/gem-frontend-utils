// only recreate the DOM if no DOM exists (i.e running tests in Node)
if (typeof document === 'undefined') {
  const {jsdom} = require('jsdom');
  global.document = jsdom('<html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = {
    userAgent: 'node.js'
  };
}