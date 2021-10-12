// At the moment we don't provide imagemapper as a React component.
// This example demonstrates one possible workaround which is to
// make an empty SVG component and populate it from useEffect.

const React = require('react');
const imagemapper = require('imagemapper');
// const { editor, view } = require("imagemapper");

function MyComponent() {
  React.useEffect(() => {
    // Editor
    const myEditor = imagemapper.editor('myEditorId', {
      selectModeHandler: () => console.log('Editor is now in select mode'),
    });
    myEditor.loadImage('image.svg', 700, 350);
    myEditor.on('mouseup', (e) => console.log('mouseup event', e));
    myEditor.polygon();

    // View
    const myView = imagemapper.view('myViewId', {
      viewClickHandler: (e, id) => console.log('User clicked on', id),
    });
    myView.loadImage('image.png', 700, 350);
    myView.import(
      '{"idCounter":4,"components":[{"id":"rect_1","type":"rect","data":{"x":66,"y":36,"width":253,"height":148}},{"id":"polygon_2","type":"polygon","data":[{"x":376,"y":172},{"x":498,"y":291},{"x":625,"y":174},{"x":500,"y":57}]},{"id":"polygon_3","type":"polygon","data":[{"x":54,"y":249},{"x":234,"y":246},{"x":236,"y":225},{"x":415,"y":270},{"x":237,"y":313},{"x":235,"y":294},{"x":54,"y":292}]}]}',
    );
  }, []);

  return (
    <>
      <svg
        id="myEditorId"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="400"
        viewBox="0, 0, 800, 400"
        preserveAspectRatio="xMinYMin"
      ></svg>
      <svg
        id="myViewId"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="400"
        viewBox="0, 0, 800, 400"
        preserveAspectRatio="xMinYMin"
      ></svg>
    </>
  );
}

export default MyComponent;
