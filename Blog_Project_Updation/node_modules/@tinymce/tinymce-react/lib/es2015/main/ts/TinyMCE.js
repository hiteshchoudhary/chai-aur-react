var getTinymce = function (view) {
    var global = view;
    return global && global.tinymce ? global.tinymce : null;
};
export { getTinymce };
