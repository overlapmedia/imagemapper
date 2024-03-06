/**
 * Editor
 * @returns {Editor}
 */
export declare const editor: (svgEl: string | SVGElement, options?: Partial<import("./src/editor").EditorOptions> | undefined, style?: Partial<{
    component: import("./src/style").Style;
    componentHover: {
        off: import("./src/style").Style;
        on: import("./src/style").Style;
    };
    componentSelect: {
        off: import("./src/style").Style;
        on: import("./src/style").Style;
    };
    handle: import("./src/style").Style;
    handleHover: import("./src/style").Style;
}> | undefined) => import("./src/editor").Editor;
/**
 * View
 * @returns {Editor} - an Editor constructor which does not add drawing capabilities
 */
export declare const view: (svgEl: string | SVGElement, options?: Partial<import("./src/editor").EditorOptions> | undefined, style?: Partial<{
    component: import("./src/style").Style;
    componentHover: {
        off: import("./src/style").Style;
        on: import("./src/style").Style;
    };
    componentSelect: {
        off: import("./src/style").Style;
        on: import("./src/style").Style;
    };
    handle: import("./src/style").Style;
    handleHover: import("./src/style").Style;
}> | undefined) => import("./src/editor").Editor;
/**
 * @example
 * ```js
 * import imagemapper from '@overlapmedia/imagemapper';
 * const editor = imagemapper.editor('editor-id');
 * editor.polygon();
 * ```
 *
 * @example
 * ```js
 * import { editor, view } from '@overlapmedia/imagemapper';
 * const myEditor = editor('editor-id');
 * myEditor.polygon();
 * ```
 */
declare const _default: {
    editor: (svgEl: string | SVGElement, options?: Partial<import("./src/editor").EditorOptions> | undefined, style?: Partial<{
        component: import("./src/style").Style;
        componentHover: {
            off: import("./src/style").Style;
            on: import("./src/style").Style;
        };
        componentSelect: {
            off: import("./src/style").Style;
            on: import("./src/style").Style;
        };
        handle: import("./src/style").Style;
        handleHover: import("./src/style").Style;
    }> | undefined) => import("./src/editor").Editor;
    view: (svgEl: string | SVGElement, options?: Partial<import("./src/editor").EditorOptions> | undefined, style?: Partial<{
        component: import("./src/style").Style;
        componentHover: {
            off: import("./src/style").Style;
            on: import("./src/style").Style;
        };
        componentSelect: {
            off: import("./src/style").Style;
            on: import("./src/style").Style;
        };
        handle: import("./src/style").Style;
        handleHover: import("./src/style").Style;
    }> | undefined) => import("./src/editor").Editor;
};
export default _default;
export { Editor, type EditorOptions } from "./src/editor";
export { Component } from "./src/component";
export { CornerShapedElement, type Dim } from "./src/factory";
export { Rectangle } from "./src/rect";
export { Circle } from "./src/circle";
export { Ellipse } from "./src/ellipse";
export { Polygon, type Point } from "./src/polygon";
export type { Style } from "./src/style";
export type { Handle } from "./src/handle";
