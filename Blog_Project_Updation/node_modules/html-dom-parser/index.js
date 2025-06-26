/**
 * When running on Node.js, use the server parser.
 * When bundling for the browser, use the client parser.
 *
 * @see {@link https://github.com/substack/node-browserify#browser-field}
 */
var HTMLDOMParser = require('./lib/server/html-to-dom');

module.exports = HTMLDOMParser;
module.exports.default = HTMLDOMParser;
