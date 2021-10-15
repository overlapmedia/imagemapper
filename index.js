import editorFactory from './src/editor.js';

/**
 * @module imagemapper
 * @example
 * ```js
 * import imagemapper from 'imagemapper';
 * const editor = imagemapper.editor('editor-id');
 * ```
 * @example
 * ```js
 * import { editor, view } from 'imagemapper';
 * const myEditor = editor('editor-id');
 * ```
 */

/**
 * Editor
 * @returns {module:imagemapper~Editor}
 */
export const editor = editorFactory();

/**
 * View
 * @returns {module:imagemapper~Editor} - an Editor constructor which does not add drawing capabilities
 */
export const view = editorFactory(true);

export default {
  editor,
  view,
};
