import editorFactory from "./src/editor";

/**
 * Editor
 * @returns {Editor}
 */
export const editor = editorFactory();

/**
 * View
 * @returns {Editor} - an Editor constructor which does not add drawing capabilities
 */
export const view = editorFactory(true);

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
export default {
    editor,
    view,
};

export { Editor, type EditorOptions } from "./src/editor";
export { Component } from "./src/component";
export { CornerShapedElement, type Dim } from "./src/factory";
export { Rectangle } from "./src/rect";
export { Circle } from "./src/circle";
export { Ellipse } from "./src/ellipse";
export { Polygon, type Point } from "./src/polygon";
export type { Style } from "./src/style";
export type { Handle } from "./src/handle";
