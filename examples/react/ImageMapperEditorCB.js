import { editor, view } from '@overlapmedia/imagemapper';
import React from 'react';

function ImageMapperEditorCB({ options = {}, style = {}, cb }) {
  const elementRef = React.useRef(null);
  const editorRef = React.useRef(null);

  React.useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = editor(elementRef.current, options, style);
      editorRef.current = editorInstance;
      cb && cb(editorInstance);
    }
  }, [options, style, cb]);

  const [width = 1200, height = 600] = [options.width, options.height];

  return (
    <svg
      ref={elementRef}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0, 0, ${width}, ${height}`}
      preserveAspectRatio="xMinYMin"
    ></svg>
  );
}

export default ImageMapperEditorCB;
