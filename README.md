# imagemapper
Adds SVG drawing capability (rectangles, circles, ellipses and polygons) on top of your image to let you make image maps.

## Install
```
$ npm install @overlapmedia/imagemapper
```

## From browser
```
<script src="https://cdn.jsdelivr.net/gh/overlapmedia/imagemapper@1.0.0/dist/imagemapper.min.js"></script>
<script>
    const { editor, view } = imagemapper;
</script>
```

## Demo
Try out the demo of imagemapper [here](https://overlapmedia.github.io/imagemapper/examples/browser/index.html).

## Backlog
- Support rotating shapes
- Provide Editor as a React component

## API Reference
**Example**  
```jsimport imagemapper from '@overlapmedia/imagemapper';const editor = imagemapper.editor('editor-id');```
**Example**  
```jsimport { editor, view } from '@overlapmedia/imagemapper';const myEditor = editor('editor-id');```

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
            * [.selectComponent(component)](#module_imagemapper..Editor+selectComponent) ⇒ <code>Editor</code>
            * [.removeComponent(component)](#module_imagemapper..Editor+removeComponent) ⇒ <code>Editor</code>
            * [.on(eventTypes, handler)](#module_imagemapper..Editor+on) ⇒ <code>Editor</code>
            * [.off(eventTypes, handler)](#module_imagemapper..Editor+off) ⇒ <code>Editor</code>
            * [.import(data)](#module_imagemapper..Editor+import) ⇒ <code>Editor</code>
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
| svgEl | <code>string</code> \| <code>SVGElement</code> | the name of the SVG element to be created or the SVG element itself if it's already made |
| [options] | <code>object</code> |  |
| [style] | <code>object</code> |  |


* [~Editor(svgEl, [options], [style])](#module_imagemapper..Editor)
    * [.loadImage(path, [width], [height])](#module_imagemapper..Editor+loadImage) ⇒ <code>Editor</code>
    * [.setStyle(style)](#module_imagemapper..Editor+setStyle) ⇒ <code>Editor</code>
    * [.rect()](#module_imagemapper..Editor+rect)
    * [.circle()](#module_imagemapper..Editor+circle)
    * [.ellipse()](#module_imagemapper..Editor+ellipse)
    * [.polygon()](#module_imagemapper..Editor+polygon)
    * [.selectMode()](#module_imagemapper..Editor+selectMode)
    * [.getComponentById(id)](#module_imagemapper..Editor+getComponentById) ⇒ <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code>
    * [.selectComponent(component)](#module_imagemapper..Editor+selectComponent) ⇒ <code>Editor</code>
    * [.removeComponent(component)](#module_imagemapper..Editor+removeComponent) ⇒ <code>Editor</code>
    * [.on(eventTypes, handler)](#module_imagemapper..Editor+on) ⇒ <code>Editor</code>
    * [.off(eventTypes, handler)](#module_imagemapper..Editor+off) ⇒ <code>Editor</code>
    * [.import(data)](#module_imagemapper..Editor+import) ⇒ <code>Editor</code>
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

#### editor.selectComponent(component) ⇒ <code>Editor</code>
Make programmatically selection of a component.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>string</code> \| <code>Rectangle</code> \| <code>Circle</code> \| <code>Ellipse</code> \| <code>Polygon</code> | a component or a component id |

<a name="module_imagemapper..Editor+removeComponent"></a>

#### editor.removeComponent(component) ⇒ <code>Editor</code>
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
| eventTypes | <code>Array</code> | 
| handler | [<code>handler</code>](#handler) | 

<a name="module_imagemapper..Editor+off"></a>

#### editor.off(eventTypes, handler) ⇒ <code>Editor</code>
Remove event listener(s).

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| eventTypes | <code>Array</code> | 
| handler | [<code>handler</code>](#handler) | 

<a name="module_imagemapper..Editor+import"></a>

#### editor.import(data) ⇒ <code>Editor</code>
Import shapes from JSON.

**Kind**: instance method of [<code>Editor</code>](#module_imagemapper..Editor)  

| Param | Type |
| --- | --- |
| data | <code>string</code> | 

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
