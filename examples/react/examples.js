import imagemapper, { editor, view } from '@overlapmedia/imagemapper';
import React from 'react';
import ImageMapperEditor, { Mode } from './ImageMapperEditor';
import ImageMapperEditorCB from './ImageMapperEditorCB';

/**
 * Example using component with limited functionality
 */
export const ImageMapperEditorExample1 = () => {
  return <ImageMapperEditor image="image.svg" mode={Mode.POLYGON} options={{}} />;
};

/**
 * Example using component where code are put into a callback function
 */
export const ImageMapperEditorExample2 = () => {
  return (
    <ImageMapperEditorCB
      cb={(editor) => {
        editor.loadImage('image.svg', 700, 350);
        editor.on('mouseup', (e) => console.log('mouseup event', e));
        editor.polygon();
      }}
      options={{
        selectModeHandler: () => console.log('Editor is now in select mode'),
        componentDrawnHandler: (shape, id) =>
          console.log(
            `${shape.element.tagName} with id ${id} is drawn. Call its freeze() function to disable selecting, deleting, resizing and moving.`,
          ),
      }}
    />
  );
};

/**
 * Example where code are put into an effect and component is bound by ref
 */
export const ImageMapperEditorExample3 = () => {
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    // --- imagemapper code [start] ---
    const myEditor = editor(elementRef.current, {
      selectModeHandler: () => console.log('Editor is now in select mode'),
    });
    myEditor.loadImage('image.svg', 700, 350);
    myEditor.on('mouseup', (e) => console.log('mouseup event', e));
    myEditor.polygon();
    // --- imagemapper code [end] ---
  }, []);

  return (
    <svg
      ref={elementRef}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="400"
      viewBox="0, 0, 800, 400"
      preserveAspectRatio="xMinYMin"
    ></svg>
  );
};
