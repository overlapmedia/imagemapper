import editorFactory from './src/editor.js';

const editor = editorFactory();
const view = editorFactory(true);

export default {
  editor,
  view,
};
export { editor, view };
