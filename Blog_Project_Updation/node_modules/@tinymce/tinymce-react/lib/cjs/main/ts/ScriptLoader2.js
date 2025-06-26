"use strict";
var __assign = (this && this.__assign) || function () {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptLoader = void 0;
var Utils_1 = require("./Utils");
var injectScriptTag = function (doc, item, handler) {
    var _a, _b;
    var scriptTag = doc.createElement('script');
    scriptTag.referrerPolicy = 'origin';
    scriptTag.type = 'application/javascript';
    scriptTag.id = item.id;
    scriptTag.src = item.src;
    scriptTag.async = (_a = item.async) !== null && _a !== void 0 ? _a : false;
    scriptTag.defer = (_b = item.defer) !== null && _b !== void 0 ? _b : false;
    var loadHandler = function () {
        scriptTag.removeEventListener('load', loadHandler);
        scriptTag.removeEventListener('error', errorHandler);
        handler(item.src);
    };
    var errorHandler = function (err) {
        scriptTag.removeEventListener('load', loadHandler);
        scriptTag.removeEventListener('error', errorHandler);
        handler(item.src, err);
    };
    scriptTag.addEventListener('load', loadHandler);
    scriptTag.addEventListener('error', errorHandler);
    if (doc.head) {
        doc.head.appendChild(scriptTag);
    }
};
var createDocumentScriptLoader = function (doc) {
    var lookup = {};
    var scriptLoadOrErrorHandler = function (src, err) {
        var item = lookup[src];
        item.done = true;
        item.error = err;
        for (var _i = 0, _a = item.handlers; _i < _a.length; _i++) {
            var h = _a[_i];
            h(src, err);
        }
        item.handlers = [];
    };
    var loadScripts = function (items, success, failure) {
        // eslint-disable-next-line no-console
        var failureOrLog = function (err) { return failure !== undefined ? failure(err) : console.error(err); };
        if (items.length === 0) {
            failureOrLog(new Error('At least one script must be provided'));
            return;
        }
        var successCount = 0;
        var failed = false;
        var loaded = function (_src, err) {
            if (failed) {
                return;
            }
            if (err) {
                failed = true;
                failureOrLog(err);
            }
            else if (++successCount === items.length) {
                success();
            }
        };
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var existing = lookup[item.src];
            if (existing) {
                if (existing.done) {
                    loaded(item.src, existing.error);
                }
                else {
                    existing.handlers.push(loaded);
                }
            }
            else {
                // create a new entry
                var id = (0, Utils_1.uuid)('tiny-');
                lookup[item.src] = {
                    id: id,
                    src: item.src,
                    done: false,
                    error: null,
                    handlers: [loaded],
                };
                injectScriptTag(doc, __assign({ id: id }, item), scriptLoadOrErrorHandler);
            }
        }
    };
    var deleteScripts = function () {
        var _a;
        for (var _i = 0, _b = Object.values(lookup); _i < _b.length; _i++) {
            var item = _b[_i];
            var scriptTag = doc.getElementById(item.id);
            if (scriptTag != null && scriptTag.tagName === 'SCRIPT') {
                (_a = scriptTag.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(scriptTag);
            }
        }
        lookup = {};
    };
    var getDocument = function () { return doc; };
    return {
        loadScripts: loadScripts,
        deleteScripts: deleteScripts,
        getDocument: getDocument
    };
};
var createScriptLoader = function () {
    var cache = [];
    var getDocumentScriptLoader = function (doc) {
        var loader = cache.find(function (l) { return l.getDocument() === doc; });
        if (loader === undefined) {
            loader = createDocumentScriptLoader(doc);
            cache.push(loader);
        }
        return loader;
    };
    var loadList = function (doc, items, delay, success, failure) {
        var doLoad = function () { return getDocumentScriptLoader(doc).loadScripts(items, success, failure); };
        if (delay > 0) {
            setTimeout(doLoad, delay);
        }
        else {
            doLoad();
        }
    };
    var reinitialize = function () {
        for (var loader = cache.pop(); loader != null; loader = cache.pop()) {
            loader.deleteScripts();
        }
    };
    return {
        loadList: loadList,
        reinitialize: reinitialize
    };
};
exports.ScriptLoader = createScriptLoader();
