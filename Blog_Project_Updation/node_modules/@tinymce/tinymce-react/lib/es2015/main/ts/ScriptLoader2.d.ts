export type CallbackFn = () => void;
export interface ScriptItem {
    src: string;
    async?: boolean;
    defer?: boolean;
}
export declare const ScriptLoader: {
    loadList: (doc: Document, items: ScriptItem[], delay: number, success: () => void, failure?: ((err: unknown) => void) | undefined) => void;
    reinitialize: () => void;
};
