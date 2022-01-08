import { editor, view } from '@overlapmedia/imagemapper';
import React from 'react';

function ImageMapperEditor({ options = {}, style = {}, image = '', mode }) {
  const [width = 1200, height = 600] = [options.width, options.height];

  const editorElementRef = React.useRef(null);
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    // Only listening to property "mode" in useEffect. Other props are initial.
    if (!editorRef.current) {
      const editorInstance = editor(editorElementRef.current, options, style);

      // load image from image prop
      if (image && image.length) {
        editorInstance.loadImage(image, width, height);
      }

      // keep ref to the imagemapper editor to allow prop "mode" to change
      editorRef.current = editorInstance;
    }
  }, [options, style, height, width, image]);

  // Listening to property "mode"
  React.useEffect(() => {
    if (mode) {
      switch (mode) {
        case Mode.RECT:
          editorRef.current.rect();
          break;
        case Mode.CIRCLE:
          editorRef.current.circle();
          break;
        case Mode.ELLIPSE:
          editorRef.current.ellipse();
          break;
        case Mode.POLYGON:
          editorRef.current.polygon();
          break;
        case Mode.SELECT:
          editorRef.current.selectMode();
          break;
        default:
      }
    }
  }, [mode]);

  return (
    <svg
      ref={editorElementRef}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0, 0, ${width}, ${height}`}
      preserveAspectRatio="xMinYMin"
    ></svg>
  );
}

export const Mode = Object.freeze({
  RECT: 'rect',
  CIRCLE: 'circle',
  ELLIPSE: 'ellipse',
  POLYGON: 'polygon',
  SELECT: 'selectMode',
});

export default ImageMapperEditor;
