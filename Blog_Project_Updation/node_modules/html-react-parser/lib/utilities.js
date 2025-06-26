var React = require('react');
var styleToJS = require('style-to-js').default;

/**
 * Swap key with value in an object.
 *
 * @param {object} obj - The object.
 * @param {Function} [override] - The override method.
 * @returns - The inverted object.
 */
function invertObject(obj, override) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('First argument must be an object');
  }

  var isOverridePresent = typeof override === 'function';
  var overrides = {};
  var result = {};

  for (var key in obj) {
    var value = obj[key];

    if (isOverridePresent) {
      overrides = override(key, value);
      if (overrides && overrides.length === 2) {
        result[overrides[0]] = overrides[1];
        continue;
      }
    }

    if (typeof value === 'string') {
      result[value] = key;
    }
  }

  return result;
}

var RESERVED_SVG_MATHML_ELEMENTS = new Set([
  'annotation-xml',
  'color-profile',
  'font-face',
  'font-face-src',
  'font-face-uri',
  'font-face-format',
  'font-face-name',
  'missing-glyph'
]);

/**
 * Check if a given tag is a custom component.
 *
 * @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
 *
 * @param {string} tagName - The name of the html tag.
 * @param {object} props - The props being passed to the element.
 * @returns {boolean} - Whether tag is custom component.
 */
function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return props && typeof props.is === 'string';
  }
  // These are reserved SVG and MathML elements.
  // We don't mind this whitelist too much because we expect it to never grow.
  // The alternative is to track the namespace in a few places which is convoluted.
  // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
  if (RESERVED_SVG_MATHML_ELEMENTS.has(tagName)) {
    return false;
  }
  return true;
}

// styleToJSOptions
var STYLE_TO_JS_OPTIONS = { reactCompat: true };

/**
 * Sets style prop.
 *
 * @param {null|undefined|string} style
 * @param {object} props
 */
function setStyleProp(style, props) {
  if (style === null || style === undefined) {
    return;
  }
  try {
    props.style = styleToJS(style, STYLE_TO_JS_OPTIONS);
  } catch (err) {
    props.style = {};
  }
}

/**
 * @constant {boolean}
 * @see {@link https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html}
 */
var PRESERVE_CUSTOM_ATTRIBUTES = React.version.split('.')[0] >= 16;

// Taken from
// https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react-dom/src/client/validateDOMNesting.js#L213
var ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set([
  'tr',
  'tbody',
  'thead',
  'tfoot',
  'colgroup',
  'table',
  'head',
  'html',
  'frameset'
]);

/**
 * Checks if the given node can contain text nodes
 *
 * @param {DomElement} node - Node.
 * @returns - Whether node can contain text nodes.
 */
function canTextBeChildOfNode(node) {
  return !ELEMENTS_WITH_NO_TEXT_CHILDREN.has(node.name);
}

/**
 * Returns the first argument as is.
 *
 * @param {any} arg - The argument to be returned.
 * @returns {any} The input argument `arg`.
 */
function returnFirstArg(arg) {
  return arg;
}

module.exports = {
  PRESERVE_CUSTOM_ATTRIBUTES: PRESERVE_CUSTOM_ATTRIBUTES,
  ELEMENTS_WITH_NO_TEXT_CHILDREN: ELEMENTS_WITH_NO_TEXT_CHILDREN,
  invertObject: invertObject,
  isCustomComponent: isCustomComponent,
  setStyleProp: setStyleProp,
  canTextBeChildOfNode: canTextBeChildOfNode,
  returnFirstArg: returnFirstArg
};
