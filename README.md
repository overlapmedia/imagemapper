# imagemapper
Create image maps. View image maps. Interact with image maps by event listeners. Create your next Design Collaboration Tool?

imagemapper provides both drawing and view mode interaction capabilities letting you enable features of your image map adapted to the context of the user.

* Instantiated as an editor it adds SVG drawing capability (rectangles, circles, ellipses and polygons) on top of your image to let you make image maps.<br/>
* Instantiated as a view it displays the shapes you import to it (could be exported from an editor) and supports event handlers (eg. click) performing action on that specific event and shape id.

## Getting started

### With Node.js
```
$ npm install @overlapmedia/imagemapper
```
```
// Use imagemapper.editor or editor
import imagemapper, { editor, view } from '@overlapmedia/imagemapper';

// Editor
const myEditor = imagemapper.editor('editor', {
  width: 800,
  height: 400,
  selectModeHandler: () => console.log('Editor is now in select mode'),
  componentDrawnHandler: (component, componentId) => {
    // Disabling changes on new components. If you are making a design collaboration tool you probably want
    // to do this on components returned by the import function (meaning all existing components you are importing)
    // and let all other components drawn by the user respond to changes.
    component.freeze();

    console.log(
      `Disabled selecting, deleting, resizing and moving on component with id ${componentId}`,
    );
  },
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
```

### From browser
```
<script src="https://cdn.jsdelivr.net/gh/overlapmedia/imagemapper@1.0.3/dist/imagemapper.min.js"></script>
<script>
    const { editor, view } = imagemapper;
    const myEditor = editor('editor-id');
    myEditor.rect();
</script>
```

## Demo
Try out the demo of imagemapper [here](https://overlapmedia.github.io/imagemapper/examples/browser/index.html).

## Backlog
- feat: Support rotating shapes
- feat: Provide Editor as a React component

## API Reference
**Example**  
```jsimport imagemapper from '@overlapmedia/imagemapper';const editor = imagemapper.editor('editor-id');editor.polygon();```
**Example**  
```jsimport { editor, view } from '@overlapmedia/imagemapper';const myEditor = editor('editor-id');myEditor.polygon();```

* [imagemapper](#module_imagemapper)
    * _static_
        * [.editor](#module_imagemapper.editor) ⇒ [<code>Editor</code>](#module_imagemapper..Editor)
        * [.view](#module_imagemapper.view) ⇒ [<code>Editor</code>](#module_imagemapper..Editor)
    * _inner_
        * [~Editor(svgEl, [options], [style])](#module_imagemapper..Editor)
            * [.loadImage(path, [width], [height])](#module_imagemapper..Editor+loadImage) ⇒ <code>Editor</code>
            * [.setStyle(style)](#module_imagemapper..Editor+setStyle) ⇒ <code>Editor</code>
            * [.rect()](#module_imagemapper..Editor+rect)
            * [.circle()](#module_imagemapper..Editor+circle)
            * [.ellipse()](#module_imagemapper..Editor+ellipse)
            * [.polygon()](#module_imagemapper..Editor+polygon)
            * [.selectMode()](#module_imagemapper..Editor+selectMode)
            * [.getComponentById(id)](#module_imagemapper..Editor+getComponentById) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
            * [.selectComponent(component)](#module_imagemapper..Editor+selectComponent) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
            * [.removeComponent(component)](#module_imagemapper..Editor+removeComponent) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
            * [.on(eventTypes, handler)](#module_imagemapper..Editor+on) ⇒ <code>Editor</code>
            * [.off(eventTypes, handler)](#module_imagemapper..Editor+off) ⇒ <code>Editor</code>
            * [.import(data, [idInterceptor])](#module_imagemapper..Editor+import) ⇒ <code>Array.&lt;(Rectangle\|Circle\|Ellipse\|Polygon)&gt;</code>
            * [.export([escape])](#module_imagemapper..Editor+export) ⇒ <code>string</code>

<a name="module_imagemapper.editor"></a>

### imagemapper.editor ⇒ [<code>Editor</code>](#module_imagemapper..Editor)
Editor

**Kind**: static constant of [<code>imagemapper</code>](#module_imagemapper)  
<a name="module_imagemapper.view"></a>

### imagemapper.view ⇒ [<code>Editor</code>](#module_imagemapper..Editor)
View

**Kind**: static constant of [<code>imagemapper</code>](#module_imagemapper)  
**Returns**: [<code>Editor</code>](#module_imagemapper..Editor) - - an Editor constructor which does not add drawing capabilities  
<a name="module_imagemapper..Editor"></a>

### imagemapper~Editor(svgEl, [options], [style])
An Editor or View containing everything needed by the drawing/display board: DOM, event listeners, state and API functions.

**Kind**: inner method of [<code>imagemapper</code>](#module_imagemapper)  

| Param | Type | Description |
| --- | --- | --- |
| svgEl | <code>string</code> \| <code>SVGElement</code> | the id of the SVG element to be created or the SVG element itself if it's already made |
| [options] | <code>object</code> |  |
| [options.width] | <code>string</code> | if you let imagemapper create the SVGElement for you, you could specify width for it here |
| [options.height] | <code>string</code> | if you let imagemapper create the SVGElement for you, you could specify height for it here |
| [options.componentDrawnHandler] | [<code>componentDrawnHandler</code>](#componentDrawnHandler) | function being called when finished drawing a valid component (eg. rectangle with width and height greater than 0 or polygon width at least three points), does not apply to importing |
| [options.selectModeHandler] | [<code>selectModeHandler</code>](#selectModeHandler) | function being called when editor switches to select mode when eg. Esc keydown event or mousedown event on handle is causing it to leave draw mode |
| [options.viewClickHandler] | [<code>viewClickHandler</code>](#viewClickHandler) | when using view this function will be called on click events from the shapes |
| [style] | <code>object</code> | see [setStyle](#module_imagemapper..Editor+setStyle) |


* [~Editor(svgEl, [options], [style])](#module_imagemapper..Editor)
    * [.loadImage(path, [width], [height])](#module_imagemapper..Editor+loadImage) ⇒ <code>Editor</code>
    * [.setStyle(style)](#module_imagemapper..Editor+setStyle) ⇒ <code>Editor</code>
    * [.rect()](#module_imagemapper..Editor+rect)
    * [.circle()](#module_imagemapper..Editor+circle)
    * [.ellipse()](#module_imagemapper..Editor+ellipse)
    * [.polygon()](#module_imagemapper..Editor+polygon)
    * [.selectMode()](#module_imagemapper..Editor+selectMode)
    * [.getComponentById(id)](#module_imagemapper..Editor+getComponentById) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
    * [.selectComponent(component)](#module_imagemapper..Editor+selectComponent) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
    * [.removeComponent(component)](#module_imagemapper..Editor+removeComponent) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
    * [.on(eventTypes, handler)](#module_imagemapper..Editor+on) ⇒ <code>Editor</code>
    * [.off(eventTypes, handler)](#module_imagemapper..Editor+off) ⇒ <code>Editor</code>
    * [.import(data, [idInterceptor])](#module_imagemapper..Editor+import) ⇒ <code>Array.&lt;(Rectangle\|Circle\|Ellipse\|Polygon)&gt;</code>
    * [.export([escape])](#module_imagemapper..Editor+export) ⇒ <code>string</code>

<a name="module_imagemapper..Editor+loadImage"></a>

#### editor.loadImage(path, [width], [height]) ⇒ <code>Editor</code>
Add an image element into the SVG element.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| [width] | <code>number</code> | 
| [height] | <code>number</code> | 

<a name="module_imagemapper..Editor+setStyle"></a>

#### editor.setStyle(style) ⇒ <code>Editor</code>
Completely or partly set current style of components, handles, hovering etc.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| style | <code>object</code> | 

**Example**  
```jseditor.setStyle({  component: {    fill: 'rgb(102, 102, 102)',    stroke: 'rgb(51, 51, 51)',  },  componentHover: {    off: {      'stroke-width': 1,      opacity: 0.5,    },    on: {      'stroke-width': 2,      opacity: 0.6,    },  },  componentSelect: {    off: {      'stroke-dasharray': 'none',      'stroke-linejoin': 'miter',    },    on: {      'stroke-dasharray': '4 3',      'stroke-linejoin': 'round',    },  },  handle: {    fill: 'rgb(255, 255, 255)',    stroke: 'rgb(51, 51, 51)',    'stroke-width': 1,    opacity: 0.3,  },  handleHover: {    opacity: 0.6,  },});```
<a name="module_imagemapper..Editor+rect"></a>

#### editor.rect()
Put editor in draw mode of rectangles.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  
<a name="module_imagemapper..Editor+circle"></a>

#### editor.circle()
Put editor in draw mode of circles.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  
<a name="module_imagemapper..Editor+ellipse"></a>

#### editor.ellipse()
Put editor in draw mode of ellipses.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  
<a name="module_imagemapper..Editor+polygon"></a>

#### editor.polygon()
Put editor in draw mode of polygons.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  
<a name="module_imagemapper..Editor+selectMode"></a>

#### editor.selectMode()
Put editor in select mode.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  
<a name="module_imagemapper..Editor+getComponentById"></a>

#### editor.getComponentById(id) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="module_imagemapper..Editor+selectComponent"></a>

#### editor.selectComponent(component) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
Make programmatically selection of a component which basically enables its handles by making them visible.Please note that all components will be unselected when leaving select mode or leaving draw mode.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>string</code> \| <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code> | a component or a component id |

<a name="module_imagemapper..Editor+removeComponent"></a>

#### editor.removeComponent(component) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
Remove a component (shape) from the editor or view.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>string</code> \| <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code> | a component or a component id |

<a name="module_imagemapper..Editor+on"></a>

#### editor.on(eventTypes, handler) ⇒ <code>Editor</code>
Add event listener(s).

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| eventTypes | <code>Array.&lt;string&gt;</code> | 
| handler | [<code>handler</code>](#handler) | 

<a name="module_imagemapper..Editor+off"></a>

#### editor.off(eventTypes, handler) ⇒ <code>Editor</code>
Remove event listener(s).

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| eventTypes | <code>Array.&lt;string&gt;</code> | 
| handler | [<code>handler</code>](#handler) | 

<a name="module_imagemapper..Editor+import"></a>

#### editor.import(data, [idInterceptor]) ⇒ <code>Array.&lt;(Rectangle\|Circle\|Ellipse\|Polygon)&gt;</code>
Import shapes from JSON.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> |  |
| [idInterceptor] | [<code>idInterceptor</code>](#idInterceptor) | function to change the imported id to avoid name conflicts, eg. in case user decides to import multiple times or import _after_ drawing |

<a name="module_imagemapper..Editor+export"></a>

#### editor.export([escape]) ⇒ <code>string</code>
Export drawn shapes as JSON.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  
**Returns**: <code>string</code> - - JSON data  

| Param | Type | Description |
| --- | --- | --- |
| [escape] | <code>boolean</code> | whether double quotes should be escaped |


* * *

Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
