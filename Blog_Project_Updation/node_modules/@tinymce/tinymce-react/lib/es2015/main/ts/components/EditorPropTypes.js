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
import * as PropTypes from 'prop-types';
export var eventPropTypes = {
    onActivate: PropTypes.func,
    onAddUndo: PropTypes.func,
    onBeforeAddUndo: PropTypes.func,
    onBeforeExecCommand: PropTypes.func,
    onBeforeGetContent: PropTypes.func,
    onBeforeRenderUI: PropTypes.func,
    onBeforeSetContent: PropTypes.func,
    onBeforePaste: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClearUndos: PropTypes.func,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
    onCommentChange: PropTypes.func,
    onCopy: PropTypes.func,
    onCut: PropTypes.func,
    onDblclick: PropTypes.func,
    onDeactivate: PropTypes.func,
    onDirty: PropTypes.func,
    onDrag: PropTypes.func,
    onDragDrop: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragGesture: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func,
    onExecCommand: PropTypes.func,
    onFocus: PropTypes.func,
    onFocusIn: PropTypes.func,
    onFocusOut: PropTypes.func,
    onGetContent: PropTypes.func,
    onHide: PropTypes.func,
    onInit: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    onLoadContent: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseOut: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseUp: PropTypes.func,
    onNodeChange: PropTypes.func,
    onObjectResizeStart: PropTypes.func,
    onObjectResized: PropTypes.func,
    onObjectSelected: PropTypes.func,
    onPaste: PropTypes.func,
    onPostProcess: PropTypes.func,
    onPostRender: PropTypes.func,
    onPreProcess: PropTypes.func,
    onProgressState: PropTypes.func,
    onRedo: PropTypes.func,
    onRemove: PropTypes.func,
    onReset: PropTypes.func,
    onSaveContent: PropTypes.func,
    onSelectionChange: PropTypes.func,
    onSetAttrib: PropTypes.func,
    onSetContent: PropTypes.func,
    onShow: PropTypes.func,
    onSubmit: PropTypes.func,
    onUndo: PropTypes.func,
    onVisualAid: PropTypes.func,
    onSkinLoadError: PropTypes.func,
    onThemeLoadError: PropTypes.func,
    onModelLoadError: PropTypes.func,
    onPluginLoadError: PropTypes.func,
    onIconsLoadError: PropTypes.func,
    onLanguageLoadError: PropTypes.func,
    onScriptsLoad: PropTypes.func,
    onScriptsLoadError: PropTypes.func,
};
export var EditorPropTypes = __assign({ apiKey: PropTypes.string, id: PropTypes.string, inline: PropTypes.bool, init: PropTypes.object, initialValue: PropTypes.string, onEditorChange: PropTypes.func, value: PropTypes.string, tagName: PropTypes.string, cloudChannel: PropTypes.string, plugins: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), toolbar: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), disabled: PropTypes.bool, textareaName: PropTypes.string, tinymceScriptSrc: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string,
            async: PropTypes.bool,
            defer: PropTypes.bool
        }))
    ]), rollback: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([false])]), scriptLoading: PropTypes.shape({
        async: PropTypes.bool,
        defer: PropTypes.bool,
        delay: PropTypes.number
    }) }, eventPropTypes);
