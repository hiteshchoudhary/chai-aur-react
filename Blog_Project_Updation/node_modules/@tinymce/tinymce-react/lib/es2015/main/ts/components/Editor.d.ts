import * as React from 'react';
import { IEvents } from '../Events';
import { ScriptItem } from '../ScriptLoader2';
import { IEditorPropTypes } from './EditorPropTypes';
import { Editor as TinyMCEEditor, TinyMCE } from 'tinymce';
type EditorOptions = Parameters<TinyMCE['init']>[0];
export interface IProps {
    apiKey: string;
    id: string;
    inline: boolean;
    initialValue: string;
    onEditorChange: (a: string, editor: TinyMCEEditor) => void;
    value: string;
    init: EditorOptions & {
        selector?: undefined;
        target?: undefined;
    };
    tagName: string;
    cloudChannel: string;
    plugins: NonNullable<EditorOptions['plugins']>;
    toolbar: NonNullable<EditorOptions['toolbar']>;
    disabled: boolean;
    textareaName: string;
    tinymceScriptSrc: string | string[] | ScriptItem[];
    rollback: number | false;
    scriptLoading: {
        async?: boolean;
        defer?: boolean;
        delay?: number;
    };
}
export interface IAllProps extends Partial<IProps>, Partial<IEvents> {
}
export declare class Editor extends React.Component<IAllProps> {
    static propTypes: IEditorPropTypes;
    static defaultProps: Partial<IAllProps>;
    editor?: TinyMCEEditor;
    private id;
    private elementRef;
    private inline;
    private currentContent?;
    private boundHandlers;
    private rollbackTimer;
    private valueCursor;
    constructor(props: Partial<IAllProps>);
    private get view();
    componentDidUpdate(prevProps: Partial<IAllProps>): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<{
        ref: React.RefObject<HTMLElement>;
        id: string;
    }, string | React.JSXElementConstructor<any>>;
    private changeEvents;
    private beforeInputEvent;
    private renderInline;
    private renderIframe;
    private getScriptSources;
    private getInitialValue;
    private bindHandlers;
    private rollbackChange;
    private handleBeforeInput;
    private handleBeforeInputSpecial;
    private handleEditorChange;
    private handleEditorChangeSpecial;
    private initialise;
}
export {};
