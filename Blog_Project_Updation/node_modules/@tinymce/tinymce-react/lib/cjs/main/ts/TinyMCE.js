"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTinymce = void 0;
var getTinymce = function (view) {
    var global = view;
    return global && global.tinymce ? global.tinymce : null;
};
exports.getTinymce = getTinymce;
