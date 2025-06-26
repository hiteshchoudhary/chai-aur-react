(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HTMLDOMParser = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	// constants
	var HTML = 'html';
	var HEAD = 'head';
	var BODY = 'body';
	var FIRST_TAG_REGEX = /<([a-zA-Z]+[0-9]?)/; // e.g., <h1>
	// match-all-characters in case of newlines (DOTALL)
	var HEAD_TAG_REGEX = /<head[^]*>/i;
	var BODY_TAG_REGEX = /<body[^]*>/i;

	// falls back to `parseFromString` if `createHTMLDocument` cannot be used
	var parseFromDocument = function () {
	  throw new Error(
	    'This browser does not support `document.implementation.createHTMLDocument`'
	  );
	};

	var parseFromString = function () {
	  throw new Error(
	    'This browser does not support `DOMParser.prototype.parseFromString`'
	  );
	};

	var DOMParser = typeof window === 'object' && window.DOMParser;

	/**
	 * DOMParser (performance: slow).
	 *
	 * @see https://developer.mozilla.org/docs/Web/API/DOMParser#Parsing_an_SVG_or_HTML_document
	 */
	if (typeof DOMParser === 'function') {
	  var domParser = new DOMParser();
	  var mimeType = 'text/html';

	  /**
	   * Creates an HTML document using `DOMParser.parseFromString`.
	   *
	   * @param  {string} html      - The HTML string.
	   * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
	   * @return {HTMLDocument}
	   */
	  parseFromString = function (html, tagName) {
	    if (tagName) {
	      html = '<' + tagName + '>' + html + '</' + tagName + '>';
	    }

	    return domParser.parseFromString(html, mimeType);
	  };

	  parseFromDocument = parseFromString;
	}

	/**
	 * DOMImplementation (performance: fair).
	 *
	 * @see https://developer.mozilla.org/docs/Web/API/DOMImplementation/createHTMLDocument
	 */
	if (typeof document === 'object' && document.implementation) {
	  var doc = document.implementation.createHTMLDocument();

	  /**
	   * Use HTML document created by `document.implementation.createHTMLDocument`.
	   *
	   * @param  {string} html      - The HTML string.
	   * @param  {string} [tagName] - The element to render the HTML (with 'body' as fallback).
	   * @return {HTMLDocument}
	   */
	  parseFromDocument = function (html, tagName) {
	    if (tagName) {
	      var element = doc.documentElement.querySelector(tagName);
	      element.innerHTML = html;
	      return doc;
	    }

	    doc.documentElement.innerHTML = html;
	    return doc;
	  };
	}

	/**
	 * Template (performance: fast).
	 *
	 * @see https://developer.mozilla.org/docs/Web/HTML/Element/template
	 */
	var template =
	  typeof document === 'object' ? document.createElement('template') : {};

	var parseFromTemplate;

	if (template.content) {
	  /**
	   * Uses a template element (content fragment) to parse HTML.
	   *
	   * @param  {string} html - The HTML string.
	   * @return {NodeList}
	   */
	  parseFromTemplate = function (html) {
	    template.innerHTML = html;
	    return template.content.childNodes;
	  };
	}

	/**
	 * Parses HTML string to DOM nodes.
	 *
	 * @param  {string}   html - HTML markup.
	 * @return {NodeList}
	 */
	function domparser$1(html) {
	  var firstTagName;
	  var match = html.match(FIRST_TAG_REGEX);

	  if (match && match[1]) {
	    firstTagName = match[1].toLowerCase();
	  }

	  var doc;
	  var element;
	  var elements;

	  switch (firstTagName) {
	    case HTML:
	      doc = parseFromString(html);

	      // the created document may come with filler head/body elements,
	      // so make sure to remove them if they don't actually exist
	      if (!HEAD_TAG_REGEX.test(html)) {
	        element = doc.querySelector(HEAD);
	        if (element) {
	          element.parentNode.removeChild(element);
	        }
	      }

	      if (!BODY_TAG_REGEX.test(html)) {
	        element = doc.querySelector(BODY);
	        if (element) {
	          element.parentNode.removeChild(element);
	        }
	      }

	      return doc.querySelectorAll(HTML);

	    case HEAD:
	    case BODY:
	      doc = parseFromDocument(html);
	      elements = doc.querySelectorAll(firstTagName);

	      // if there's a sibling element, then return both elements
	      if (BODY_TAG_REGEX.test(html) && HEAD_TAG_REGEX.test(html)) {
	        return elements[0].parentNode.childNodes;
	      }
	      return elements;

	    // low-level tag or text
	    default:
	      if (parseFromTemplate) {
	        return parseFromTemplate(html);
	      }
	      element = parseFromDocument(html, BODY).querySelector(BODY);
	      return element.childNodes;
	  }
	}

	var domparser_1 = domparser$1;

	var utilities$1 = {};

	var lib$1 = {};

	var lib = {};

	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
		/** Types of elements found in htmlparser2's DOM */
		var ElementType;
		(function (ElementType) {
		    /** Type for the root element of a document */
		    ElementType["Root"] = "root";
		    /** Type for Text */
		    ElementType["Text"] = "text";
		    /** Type for <? ... ?> */
		    ElementType["Directive"] = "directive";
		    /** Type for <!-- ... --> */
		    ElementType["Comment"] = "comment";
		    /** Type for <script> tags */
		    ElementType["Script"] = "script";
		    /** Type for <style> tags */
		    ElementType["Style"] = "style";
		    /** Type for Any tag */
		    ElementType["Tag"] = "tag";
		    /** Type for <![CDATA[ ... ]]> */
		    ElementType["CDATA"] = "cdata";
		    /** Type for <!doctype ...> */
		    ElementType["Doctype"] = "doctype";
		})(ElementType = exports.ElementType || (exports.ElementType = {}));
		/**
		 * Tests whether an element is a tag or not.
		 *
		 * @param elem Element to test
		 */
		function isTag(elem) {
		    return (elem.type === ElementType.Tag ||
		        elem.type === ElementType.Script ||
		        elem.type === ElementType.Style);
		}
		exports.isTag = isTag;
		// Exports for backwards compatibility
		/** Type for the root element of a document */
		exports.Root = ElementType.Root;
		/** Type for Text */
		exports.Text = ElementType.Text;
		/** Type for <? ... ?> */
		exports.Directive = ElementType.Directive;
		/** Type for <!-- ... --> */
		exports.Comment = ElementType.Comment;
		/** Type for <script> tags */
		exports.Script = ElementType.Script;
		/** Type for <style> tags */
		exports.Style = ElementType.Style;
		/** Type for Any tag */
		exports.Tag = ElementType.Tag;
		/** Type for <![CDATA[ ... ]]> */
		exports.CDATA = ElementType.CDATA;
		/** Type for <!doctype ...> */
		exports.Doctype = ElementType.Doctype; 
	} (lib));

	var node = {};

	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(node, "__esModule", { value: true });
	node.cloneNode = node.hasChildren = node.isDocument = node.isDirective = node.isComment = node.isText = node.isCDATA = node.isTag = node.Element = node.Document = node.CDATA = node.NodeWithChildren = node.ProcessingInstruction = node.Comment = node.Text = node.DataNode = node.Node = void 0;
	var domelementtype_1 = lib;
	/**
	 * This object will be used as the prototype for Nodes when creating a
	 * DOM-Level-1-compliant structure.
	 */
	var Node = /** @class */ (function () {
	    function Node() {
	        /** Parent of the node */
	        this.parent = null;
	        /** Previous sibling */
	        this.prev = null;
	        /** Next sibling */
	        this.next = null;
	        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
	        this.startIndex = null;
	        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
	        this.endIndex = null;
	    }
	    Object.defineProperty(Node.prototype, "parentNode", {
	        // Read-write aliases for properties
	        /**
	         * Same as {@link parent}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.parent;
	        },
	        set: function (parent) {
	            this.parent = parent;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "previousSibling", {
	        /**
	         * Same as {@link prev}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.prev;
	        },
	        set: function (prev) {
	            this.prev = prev;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "nextSibling", {
	        /**
	         * Same as {@link next}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.next;
	        },
	        set: function (next) {
	            this.next = next;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Clone this node, and optionally its children.
	     *
	     * @param recursive Clone child nodes as well.
	     * @returns A clone of the node.
	     */
	    Node.prototype.cloneNode = function (recursive) {
	        if (recursive === void 0) { recursive = false; }
	        return cloneNode(this, recursive);
	    };
	    return Node;
	}());
	node.Node = Node;
	/**
	 * A node that contains some data.
	 */
	var DataNode = /** @class */ (function (_super) {
	    __extends(DataNode, _super);
	    /**
	     * @param data The content of the data node
	     */
	    function DataNode(data) {
	        var _this = _super.call(this) || this;
	        _this.data = data;
	        return _this;
	    }
	    Object.defineProperty(DataNode.prototype, "nodeValue", {
	        /**
	         * Same as {@link data}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.data;
	        },
	        set: function (data) {
	            this.data = data;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return DataNode;
	}(Node));
	node.DataNode = DataNode;
	/**
	 * Text within the document.
	 */
	var Text$1 = /** @class */ (function (_super) {
	    __extends(Text, _super);
	    function Text() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.Text;
	        return _this;
	    }
	    Object.defineProperty(Text.prototype, "nodeType", {
	        get: function () {
	            return 3;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Text;
	}(DataNode));
	node.Text = Text$1;
	/**
	 * Comments within the document.
	 */
	var Comment$1 = /** @class */ (function (_super) {
	    __extends(Comment, _super);
	    function Comment() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.Comment;
	        return _this;
	    }
	    Object.defineProperty(Comment.prototype, "nodeType", {
	        get: function () {
	            return 8;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Comment;
	}(DataNode));
	node.Comment = Comment$1;
	/**
	 * Processing instructions, including doc types.
	 */
	var ProcessingInstruction$1 = /** @class */ (function (_super) {
	    __extends(ProcessingInstruction, _super);
	    function ProcessingInstruction(name, data) {
	        var _this = _super.call(this, data) || this;
	        _this.name = name;
	        _this.type = domelementtype_1.ElementType.Directive;
	        return _this;
	    }
	    Object.defineProperty(ProcessingInstruction.prototype, "nodeType", {
	        get: function () {
	            return 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return ProcessingInstruction;
	}(DataNode));
	node.ProcessingInstruction = ProcessingInstruction$1;
	/**
	 * A `Node` that can have children.
	 */
	var NodeWithChildren = /** @class */ (function (_super) {
	    __extends(NodeWithChildren, _super);
	    /**
	     * @param children Children of the node. Only certain node types can have children.
	     */
	    function NodeWithChildren(children) {
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
	        // Aliases
	        /** First child of the node. */
	        get: function () {
	            var _a;
	            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
	        /** Last child of the node. */
	        get: function () {
	            return this.children.length > 0
	                ? this.children[this.children.length - 1]
	                : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
	        /**
	         * Same as {@link children}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.children;
	        },
	        set: function (children) {
	            this.children = children;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return NodeWithChildren;
	}(Node));
	node.NodeWithChildren = NodeWithChildren;
	var CDATA = /** @class */ (function (_super) {
	    __extends(CDATA, _super);
	    function CDATA() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.CDATA;
	        return _this;
	    }
	    Object.defineProperty(CDATA.prototype, "nodeType", {
	        get: function () {
	            return 4;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return CDATA;
	}(NodeWithChildren));
	node.CDATA = CDATA;
	/**
	 * The root node of the document.
	 */
	var Document = /** @class */ (function (_super) {
	    __extends(Document, _super);
	    function Document() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.Root;
	        return _this;
	    }
	    Object.defineProperty(Document.prototype, "nodeType", {
	        get: function () {
	            return 9;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Document;
	}(NodeWithChildren));
	node.Document = Document;
	/**
	 * An element within the DOM.
	 */
	var Element$1 = /** @class */ (function (_super) {
	    __extends(Element, _super);
	    /**
	     * @param name Name of the tag, eg. `div`, `span`.
	     * @param attribs Object mapping attribute names to attribute values.
	     * @param children Children of the node.
	     */
	    function Element(name, attribs, children, type) {
	        if (children === void 0) { children = []; }
	        if (type === void 0) { type = name === "script"
	            ? domelementtype_1.ElementType.Script
	            : name === "style"
	                ? domelementtype_1.ElementType.Style
	                : domelementtype_1.ElementType.Tag; }
	        var _this = _super.call(this, children) || this;
	        _this.name = name;
	        _this.attribs = attribs;
	        _this.type = type;
	        return _this;
	    }
	    Object.defineProperty(Element.prototype, "nodeType", {
	        get: function () {
	            return 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Element.prototype, "tagName", {
	        // DOM Level 1 aliases
	        /**
	         * Same as {@link name}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.name;
	        },
	        set: function (name) {
	            this.name = name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Element.prototype, "attributes", {
	        get: function () {
	            var _this = this;
	            return Object.keys(this.attribs).map(function (name) {
	                var _a, _b;
	                return ({
	                    name: name,
	                    value: _this.attribs[name],
	                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
	                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
	                });
	            });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Element;
	}(NodeWithChildren));
	node.Element = Element$1;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node is a `Element`, `false` otherwise.
	 */
	function isTag(node) {
	    return (0, domelementtype_1.isTag)(node);
	}
	node.isTag = isTag;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
	 */
	function isCDATA(node) {
	    return node.type === domelementtype_1.ElementType.CDATA;
	}
	node.isCDATA = isCDATA;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Text`, `false` otherwise.
	 */
	function isText(node) {
	    return node.type === domelementtype_1.ElementType.Text;
	}
	node.isText = isText;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Comment`, `false` otherwise.
	 */
	function isComment(node) {
	    return node.type === domelementtype_1.ElementType.Comment;
	}
	node.isComment = isComment;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDirective(node) {
	    return node.type === domelementtype_1.ElementType.Directive;
	}
	node.isDirective = isDirective;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDocument(node) {
	    return node.type === domelementtype_1.ElementType.Root;
	}
	node.isDocument = isDocument;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has children, `false` otherwise.
	 */
	function hasChildren(node) {
	    return Object.prototype.hasOwnProperty.call(node, "children");
	}
	node.hasChildren = hasChildren;
	/**
	 * Clone a node, and optionally its children.
	 *
	 * @param recursive Clone child nodes as well.
	 * @returns A clone of the node.
	 */
	function cloneNode(node, recursive) {
	    if (recursive === void 0) { recursive = false; }
	    var result;
	    if (isText(node)) {
	        result = new Text$1(node.data);
	    }
	    else if (isComment(node)) {
	        result = new Comment$1(node.data);
	    }
	    else if (isTag(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_1 = new Element$1(node.name, __assign({}, node.attribs), children);
	        children.forEach(function (child) { return (child.parent = clone_1); });
	        if (node.namespace != null) {
	            clone_1.namespace = node.namespace;
	        }
	        if (node["x-attribsNamespace"]) {
	            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
	        }
	        if (node["x-attribsPrefix"]) {
	            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
	        }
	        result = clone_1;
	    }
	    else if (isCDATA(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_2 = new CDATA(children);
	        children.forEach(function (child) { return (child.parent = clone_2); });
	        result = clone_2;
	    }
	    else if (isDocument(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_3 = new Document(children);
	        children.forEach(function (child) { return (child.parent = clone_3); });
	        if (node["x-mode"]) {
	            clone_3["x-mode"] = node["x-mode"];
	        }
	        result = clone_3;
	    }
	    else if (isDirective(node)) {
	        var instruction = new ProcessingInstruction$1(node.name, node.data);
	        if (node["x-name"] != null) {
	            instruction["x-name"] = node["x-name"];
	            instruction["x-publicId"] = node["x-publicId"];
	            instruction["x-systemId"] = node["x-systemId"];
	        }
	        result = instruction;
	    }
	    else {
	        throw new Error("Not implemented yet: ".concat(node.type));
	    }
	    result.startIndex = node.startIndex;
	    result.endIndex = node.endIndex;
	    if (node.sourceCodeLocation != null) {
	        result.sourceCodeLocation = node.sourceCodeLocation;
	    }
	    return result;
	}
	node.cloneNode = cloneNode;
	function cloneChildren(childs) {
	    var children = childs.map(function (child) { return cloneNode(child, true); });
	    for (var i = 1; i < children.length; i++) {
	        children[i].prev = children[i - 1];
	        children[i - 1].next = children[i];
	    }
	    return children;
	}

	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.DomHandler = void 0;
		var domelementtype_1 = lib;
		var node_js_1 = node;
		__exportStar(node, exports);
		// Default options
		var defaultOpts = {
		    withStartIndices: false,
		    withEndIndices: false,
		    xmlMode: false,
		};
		var DomHandler = /** @class */ (function () {
		    /**
		     * @param callback Called once parsing has completed.
		     * @param options Settings for the handler.
		     * @param elementCB Callback whenever a tag is closed.
		     */
		    function DomHandler(callback, options, elementCB) {
		        /** The elements of the DOM */
		        this.dom = [];
		        /** The root element for the DOM */
		        this.root = new node_js_1.Document(this.dom);
		        /** Indicated whether parsing has been completed. */
		        this.done = false;
		        /** Stack of open tags. */
		        this.tagStack = [this.root];
		        /** A data node that is still being written to. */
		        this.lastNode = null;
		        /** Reference to the parser instance. Used for location information. */
		        this.parser = null;
		        // Make it possible to skip arguments, for backwards-compatibility
		        if (typeof options === "function") {
		            elementCB = options;
		            options = defaultOpts;
		        }
		        if (typeof callback === "object") {
		            options = callback;
		            callback = undefined;
		        }
		        this.callback = callback !== null && callback !== void 0 ? callback : null;
		        this.options = options !== null && options !== void 0 ? options : defaultOpts;
		        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
		    }
		    DomHandler.prototype.onparserinit = function (parser) {
		        this.parser = parser;
		    };
		    // Resets the handler back to starting state
		    DomHandler.prototype.onreset = function () {
		        this.dom = [];
		        this.root = new node_js_1.Document(this.dom);
		        this.done = false;
		        this.tagStack = [this.root];
		        this.lastNode = null;
		        this.parser = null;
		    };
		    // Signals the handler that parsing is done
		    DomHandler.prototype.onend = function () {
		        if (this.done)
		            return;
		        this.done = true;
		        this.parser = null;
		        this.handleCallback(null);
		    };
		    DomHandler.prototype.onerror = function (error) {
		        this.handleCallback(error);
		    };
		    DomHandler.prototype.onclosetag = function () {
		        this.lastNode = null;
		        var elem = this.tagStack.pop();
		        if (this.options.withEndIndices) {
		            elem.endIndex = this.parser.endIndex;
		        }
		        if (this.elementCB)
		            this.elementCB(elem);
		    };
		    DomHandler.prototype.onopentag = function (name, attribs) {
		        var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
		        var element = new node_js_1.Element(name, attribs, undefined, type);
		        this.addNode(element);
		        this.tagStack.push(element);
		    };
		    DomHandler.prototype.ontext = function (data) {
		        var lastNode = this.lastNode;
		        if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
		            lastNode.data += data;
		            if (this.options.withEndIndices) {
		                lastNode.endIndex = this.parser.endIndex;
		            }
		        }
		        else {
		            var node = new node_js_1.Text(data);
		            this.addNode(node);
		            this.lastNode = node;
		        }
		    };
		    DomHandler.prototype.oncomment = function (data) {
		        if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
		            this.lastNode.data += data;
		            return;
		        }
		        var node = new node_js_1.Comment(data);
		        this.addNode(node);
		        this.lastNode = node;
		    };
		    DomHandler.prototype.oncommentend = function () {
		        this.lastNode = null;
		    };
		    DomHandler.prototype.oncdatastart = function () {
		        var text = new node_js_1.Text("");
		        var node = new node_js_1.CDATA([text]);
		        this.addNode(node);
		        text.parent = node;
		        this.lastNode = text;
		    };
		    DomHandler.prototype.oncdataend = function () {
		        this.lastNode = null;
		    };
		    DomHandler.prototype.onprocessinginstruction = function (name, data) {
		        var node = new node_js_1.ProcessingInstruction(name, data);
		        this.addNode(node);
		    };
		    DomHandler.prototype.handleCallback = function (error) {
		        if (typeof this.callback === "function") {
		            this.callback(error, this.dom);
		        }
		        else if (error) {
		            throw error;
		        }
		    };
		    DomHandler.prototype.addNode = function (node) {
		        var parent = this.tagStack[this.tagStack.length - 1];
		        var previousSibling = parent.children[parent.children.length - 1];
		        if (this.options.withStartIndices) {
		            node.startIndex = this.parser.startIndex;
		        }
		        if (this.options.withEndIndices) {
		            node.endIndex = this.parser.endIndex;
		        }
		        parent.children.push(node);
		        if (previousSibling) {
		            node.prev = previousSibling;
		            previousSibling.next = node;
		        }
		        node.parent = parent;
		        this.lastNode = null;
		    };
		    return DomHandler;
		}());
		exports.DomHandler = DomHandler;
		exports.default = DomHandler; 
	} (lib$1));

	var constants$1 = {};

	/**
	 * SVG elements are case-sensitive.
	 *
	 * @see {@link https://developer.mozilla.org/docs/Web/SVG/Element#svg_elements_a_to_z}
	 */

	constants$1.CASE_SENSITIVE_TAG_NAMES = [
	  'animateMotion',
	  'animateTransform',
	  'clipPath',
	  'feBlend',
	  'feColorMatrix',
	  'feComponentTransfer',
	  'feComposite',
	  'feConvolveMatrix',
	  'feDiffuseLighting',
	  'feDisplacementMap',
	  'feDropShadow',
	  'feFlood',
	  'feFuncA',
	  'feFuncB',
	  'feFuncG',
	  'feFuncR',
	  'feGaussianBlur',
	  'feImage',
	  'feMerge',
	  'feMergeNode',
	  'feMorphology',
	  'feOffset',
	  'fePointLight',
	  'feSpecularLighting',
	  'feSpotLight',
	  'feTile',
	  'feTurbulence',
	  'foreignObject',
	  'linearGradient',
	  'radialGradient',
	  'textPath'
	];

	var domhandler = lib$1;
	var constants = constants$1;

	var CASE_SENSITIVE_TAG_NAMES = constants.CASE_SENSITIVE_TAG_NAMES;

	var Comment = domhandler.Comment;
	var Element = domhandler.Element;
	var ProcessingInstruction = domhandler.ProcessingInstruction;
	var Text = domhandler.Text;

	var caseSensitiveTagNamesMap = {};
	var tagName;

	for (var i = 0, len = CASE_SENSITIVE_TAG_NAMES.length; i < len; i++) {
	  tagName = CASE_SENSITIVE_TAG_NAMES[i];
	  caseSensitiveTagNamesMap[tagName.toLowerCase()] = tagName;
	}

	/**
	 * Gets case-sensitive tag name.
	 *
	 * @param {string} tagName - Tag name in lowercase.
	 * @returns {string|undefined} - Case-sensitive tag name.
	 */
	function getCaseSensitiveTagName(tagName) {
	  return caseSensitiveTagNamesMap[tagName];
	}

	/**
	 * Formats DOM attributes to a hash map.
	 *
	 * @param {NamedNodeMap} attributes - List of attributes.
	 * @returns {object} - Map of attribute name to value.
	 */
	function formatAttributes(attributes) {
	  var result = {};
	  var attribute;
	  // `NamedNodeMap` is array-like
	  for (var i = 0, len = attributes.length; i < len; i++) {
	    attribute = attributes[i];
	    result[attribute.name] = attribute.value;
	  }
	  return result;
	}

	/**
	 * Corrects the tag name if it is case-sensitive (SVG).
	 * Otherwise, returns the lowercase tag name (HTML).
	 *
	 * @param {string} tagName - Lowercase tag name.
	 * @returns {string} - Formatted tag name.
	 */
	function formatTagName(tagName) {
	  tagName = tagName.toLowerCase();
	  var caseSensitiveTagName = getCaseSensitiveTagName(tagName);
	  if (caseSensitiveTagName) {
	    return caseSensitiveTagName;
	  }
	  return tagName;
	}

	/**
	 * Transforms DOM nodes to `domhandler` nodes.
	 *
	 * @param {NodeList} nodes - DOM nodes.
	 * @param {Element|null} [parent=null] - Parent node.
	 * @param {string} [directive] - Directive.
	 * @returns {Array<Comment|Element|ProcessingInstruction|Text>}
	 */
	function formatDOM$1(nodes, parent, directive) {
	  parent = parent || null;
	  var result = [];
	  var tagName;

	  for (var index = 0, len = nodes.length; index < len; index++) {
	    var node = nodes[index];
	    var current;

	    // set the node data given the type
	    switch (node.nodeType) {
	      case 1:
	        tagName = formatTagName(node.nodeName);
	        // script, style, or tag
	        current = new Element(tagName, formatAttributes(node.attributes));
	        current.children = formatDOM$1(
	          // template children are on content
	          tagName === 'template' ? node.content.childNodes : node.childNodes,
	          current
	        );
	        break;

	      case 3:
	        current = new Text(node.nodeValue);
	        break;

	      case 8:
	        current = new Comment(node.nodeValue);
	        break;

	      default:
	        continue;
	    }

	    // set previous node next
	    var prev = result[index - 1] || null;
	    if (prev) {
	      prev.next = current;
	    }

	    // set properties for current node
	    current.parent = parent;
	    current.prev = prev;
	    current.next = null;

	    result.push(current);
	  }

	  if (directive) {
	    current = new ProcessingInstruction(
	      directive.substring(0, directive.indexOf(' ')).toLowerCase(),
	      directive
	    );
	    current.next = result[0] || null;
	    current.parent = parent;
	    result.unshift(current);

	    if (result[1]) {
	      result[1].prev = result[0];
	    }
	  }

	  return result;
	}

	utilities$1.formatAttributes = formatAttributes;
	utilities$1.formatDOM = formatDOM$1;

	var domparser = domparser_1;
	var utilities = utilities$1;

	var formatDOM = utilities.formatDOM;

	var DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

	/**
	 * Parses HTML string to DOM nodes in browser.
	 *
	 * @param  {string} html  - HTML markup.
	 * @return {DomElement[]} - DOM elements.
	 */
	function HTMLDOMParser(html) {
	  if (typeof html !== 'string') {
	    throw new TypeError('First argument must be a string');
	  }

	  if (html === '') {
	    return [];
	  }

	  // match directive
	  var match = html.match(DIRECTIVE_REGEX);
	  var directive;

	  if (match && match[1]) {
	    directive = match[1];
	  }

	  return formatDOM(domparser(html), null, directive);
	}

	var htmlToDom = HTMLDOMParser;

	var htmlToDom$1 = /*@__PURE__*/getDefaultExportFromCjs(htmlToDom);

	return htmlToDom$1;

}));
//# sourceMappingURL=html-dom-parser.js.map
