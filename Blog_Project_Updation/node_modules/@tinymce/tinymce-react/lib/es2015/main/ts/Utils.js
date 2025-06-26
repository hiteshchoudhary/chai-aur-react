import { eventPropTypes } from './components/EditorPropTypes';
export var isFunction = function (x) { return typeof x === 'function'; };
var isEventProp = function (name) { return name in eventPropTypes; };
var eventAttrToEventName = function (attrName) { return attrName.substr(2); };
export var configHandlers2 = function (handlerLookup, on, off, adapter, prevProps, props, boundHandlers) {
    var prevEventKeys = Object.keys(prevProps).filter(isEventProp);
    var currEventKeys = Object.keys(props).filter(isEventProp);
    var removedKeys = prevEventKeys.filter(function (key) { return props[key] === undefined; });
    var addedKeys = currEventKeys.filter(function (key) { return prevProps[key] === undefined; });
    removedKeys.forEach(function (key) {
        // remove event handler
        var eventName = eventAttrToEventName(key);
        var wrappedHandler = boundHandlers[eventName];
        off(eventName, wrappedHandler);
        delete boundHandlers[eventName];
    });
    addedKeys.forEach(function (key) {
        var wrappedHandler = adapter(handlerLookup, key);
        var eventName = eventAttrToEventName(key);
        boundHandlers[eventName] = wrappedHandler;
        on(eventName, wrappedHandler);
    });
};
export var configHandlers = function (editor, prevProps, props, boundHandlers, lookup) {
    return configHandlers2(lookup, editor.on.bind(editor), editor.off.bind(editor), 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    function (handlerLookup, key) { return function (e) { var _a; return (_a = handlerLookup(key)) === null || _a === void 0 ? void 0 : _a(e, editor); }; }, prevProps, props, boundHandlers);
};
var unique = 0;
export var uuid = function (prefix) {
    var time = Date.now();
    var random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + '_' + random + unique + String(time);
};
export var isTextareaOrInput = function (element) {
    return element !== null && (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input');
};
var normalizePluginArray = function (plugins) {
    if (typeof plugins === 'undefined' || plugins === '') {
        return [];
    }
    return Array.isArray(plugins) ? plugins : plugins.split(' ');
};
// eslint-disable-next-line max-len
export var mergePlugins = function (initPlugins, inputPlugins) { return normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins)); };
export var isBeforeInputEventAvailable = function () { return window.InputEvent && typeof InputEvent.prototype.getTargetRanges === 'function'; };
export var isInDoc = function (elem) {
    if (!('isConnected' in Node.prototype)) {
        // Fallback for IE and old Edge
        var current = elem;
        var parent_1 = elem.parentNode;
        while (parent_1 != null) {
            current = parent_1;
            parent_1 = current.parentNode;
        }
        return current === elem.ownerDocument;
    }
    return elem.isConnected;
};
export var setMode = function (editor, mode) {
    if (editor !== undefined) {
        if (editor.mode != null && typeof editor.mode === 'object' && typeof editor.mode.set === 'function') {
            editor.mode.set(mode);
        }
        else { // support TinyMCE 4
            editor.setMode(mode);
        }
    }
};
