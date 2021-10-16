// npm run demo

import imagemapper, { editor, view } from '@overlapmedia/imagemapper';

// Editor
const myEditor = imagemapper.editor('editor', {
  width: 800,
  height: 400,
  selectModeHandler: () => console.log('Editor is now in select mode'),
});
myEditor.loadImage('image.svg', 700, 350);
myEditor.on('mouseup', (e) => console.log('mouseup event', e));
myEditor.polygon();

// View
const myView = view('view', {
  width: 800,
  height: 400,
  viewClickHandler: (e, id) => console.log('User clicked on', id),
});
myView.loadImage('image.png', 700, 350);
myView.import(
  '{"idCounter":4,"components":[{"id":"rect_1","type":"rect","data":{"x":66,"y":36,"width":253,"height":148}},{"id":"polygon_2","type":"polygon","data":[{"x":376,"y":172},{"x":498,"y":291},{"x":625,"y":174},{"x":500,"y":57}]},{"id":"polygon_3","type":"polygon","data":[{"x":54,"y":249},{"x":234,"y":246},{"x":236,"y":225},{"x":415,"y":270},{"x":237,"y":313},{"x":235,"y":294},{"x":54,"y":292}]}]}',
);
