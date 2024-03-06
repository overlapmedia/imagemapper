# Class: Editor

An Editor or View containing everything needed by the drawing/display board: DOM, event listeners, state and API functions.

**`Param`**

the id of the SVG element to be created or the SVG element itself if it's already made

**`Param`**

**`Param`**

see [Editor#setStyle](Editor.md#setstyle)

## Table of contents

### Constructors

- [constructor](Editor.md#constructor)

### Properties

- [\_cacheElementMapping](Editor.md#_cacheelementmapping)
- [\_handleIdCounter](Editor.md#_handleidcounter)
- [\_idCounter](Editor.md#_idcounter)
- [cgroup](Editor.md#cgroup)
- [componentDrawnHandler](Editor.md#componentdrawnhandler)
- [fsmService](Editor.md#fsmservice)
- [height](Editor.md#height)
- [hgroup](Editor.md#hgroup)
- [selectModeHandler](Editor.md#selectmodehandler)
- [style](Editor.md#style)
- [svg](Editor.md#svg)
- [viewClickHandler](Editor.md#viewclickhandler)
- [width](Editor.md#width)

### Methods

- [circle](Editor.md#circle)
- [createCircle](Editor.md#createcircle)
- [createEllipse](Editor.md#createellipse)
- [createPolygon](Editor.md#createpolygon)
- [createRectangle](Editor.md#createrectangle)
- [ellipse](Editor.md#ellipse)
- [export](Editor.md#export)
- [getComponentById](Editor.md#getcomponentbyid)
- [import](Editor.md#import)
- [loadImage](Editor.md#loadimage)
- [off](Editor.md#off)
- [on](Editor.md#on)
- [polygon](Editor.md#polygon)
- [rect](Editor.md#rect)
- [registerComponent](Editor.md#registercomponent)
- [registerComponentHandle](Editor.md#registercomponenthandle)
- [removeComponent](Editor.md#removecomponent)
- [selectComponent](Editor.md#selectcomponent)
- [selectMode](Editor.md#selectmode)
- [setStyle](Editor.md#setstyle)
- [unregisterComponent](Editor.md#unregistercomponent)

## Constructors

### constructor

• **new Editor**(`svgEl`, `options?`, `style?`): [`Editor`](Editor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `svgEl` | `string` \| `SVGElement` |
| `options` | `Partial`\<[`EditorOptions`](../modules.md#editoroptions)\> |
| `style` | `Partial`\<\{ `component`: [`Style`](../modules.md#style) ; `componentHover`: \{ `off`: [`Style`](../modules.md#style) ; `on`: [`Style`](../modules.md#style)  } ; `componentSelect`: \{ `off`: [`Style`](../modules.md#style) ; `on`: [`Style`](../modules.md#style)  } ; `handle`: [`Style`](../modules.md#style) ; `handleHover`: [`Style`](../modules.md#style)  }\> |

#### Returns

[`Editor`](Editor.md)

#### Defined in

[src/editor.ts:56](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L56)

## Properties

### \_cacheElementMapping

• **\_cacheElementMapping**: `Record`\<`string`, `undefined` \| [`Handle`](Handle.md) \| [`Component`](Component.md)\>

#### Defined in

[src/editor.ts:52](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L52)

___

### \_handleIdCounter

• **\_handleIdCounter**: `number`

#### Defined in

[src/editor.ts:54](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L54)

___

### \_idCounter

• **\_idCounter**: `number`

#### Defined in

[src/editor.ts:53](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L53)

___

### cgroup

• **cgroup**: `SVGGElement`

#### Defined in

[src/editor.ts:46](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L46)

___

### componentDrawnHandler

• `Optional` **componentDrawnHandler**: (`c`: [`Component`](Component.md), `id`: `string`) => `void`

#### Type declaration

▸ (`c`, `id`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Component`](Component.md) |
| `id` | `string` |

##### Returns

`void`

#### Defined in

[src/editor.ts:41](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L41)

___

### fsmService

• **fsmService**: `Actor`\<`ActorLogic`\<`any`, `any`, `any`, `any`\>\>

#### Defined in

[src/editor.ts:50](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L50)

___

### height

• **height**: `number`

#### Defined in

[src/editor.ts:40](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L40)

___

### hgroup

• **hgroup**: `SVGGElement`

#### Defined in

[src/editor.ts:47](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L47)

___

### selectModeHandler

• `Optional` **selectModeHandler**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/editor.ts:42](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L42)

___

### style

• **style**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `component` | [`Style`](../modules.md#style) |
| `componentHover` | \{ `off`: [`Style`](../modules.md#style) ; `on`: [`Style`](../modules.md#style)  } |
| `componentHover.off` | [`Style`](../modules.md#style) |
| `componentHover.on` | [`Style`](../modules.md#style) |
| `componentSelect` | \{ `off`: [`Style`](../modules.md#style) ; `on`: [`Style`](../modules.md#style)  } |
| `componentSelect.off` | [`Style`](../modules.md#style) |
| `componentSelect.on` | [`Style`](../modules.md#style) |
| `handle` | [`Style`](../modules.md#style) |
| `handleHover` | [`Style`](../modules.md#style) |

#### Defined in

[src/editor.ts:48](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L48)

___

### svg

• **svg**: `SVGSVGElement`

#### Defined in

[src/editor.ts:45](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L45)

___

### viewClickHandler

• `Optional` **viewClickHandler**: (`e`: `Event`, `id`: `string`) => `void`

#### Type declaration

▸ (`e`, `id`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `Event` |
| `id` | `string` |

##### Returns

`void`

#### Defined in

[src/editor.ts:43](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L43)

___

### width

• **width**: `number`

#### Defined in

[src/editor.ts:39](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L39)

## Methods

### circle

▸ **circle**(): `void`

Put editor in draw mode of circles.

#### Returns

`void`

#### Defined in

[src/editor.ts:215](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L215)

___

### createCircle

▸ **createCircle**(`dim`, `id?`): [`Circle`](Circle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dim` | [`Dim`](../modules.md#dim) |
| `id?` | `string` |

#### Returns

[`Circle`](Circle.md)

#### Defined in

[src/editor.ts:474](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L474)

___

### createEllipse

▸ **createEllipse**(`dim`, `id?`): [`Ellipse`](Ellipse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dim` | [`Dim`](../modules.md#dim) |
| `id?` | `string` |

#### Returns

[`Ellipse`](Ellipse.md)

#### Defined in

[src/editor.ts:482](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L482)

___

### createPolygon

▸ **createPolygon**(`points`, `id?`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`Point`](../modules.md#point) \| [`Point`](../modules.md#point)[] |
| `id?` | `string` |

#### Returns

[`Polygon`](Polygon.md)

#### Defined in

[src/editor.ts:490](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L490)

___

### createRectangle

▸ **createRectangle**(`dim`, `id?`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dim` | [`Dim`](../modules.md#dim) |
| `id?` | `string` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Defined in

[src/editor.ts:466](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L466)

___

### ellipse

▸ **ellipse**(): `void`

Put editor in draw mode of ellipses.

#### Returns

`void`

#### Defined in

[src/editor.ts:222](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L222)

___

### export

▸ **export**(`escape?`): `string`

Export drawn shapes as JSON.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `escape?` | `boolean` | whether double quotes should be escaped |

#### Returns

`string`

- JSON data

#### Defined in

[src/editor.ts:448](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L448)

___

### getComponentById

▸ **getComponentById**(`id`): `undefined` \| [`Handle`](Handle.md) \| [`Component`](Component.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`undefined` \| [`Handle`](Handle.md) \| [`Component`](Component.md)

#### Defined in

[src/editor.ts:244](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L244)

___

### import

▸ **import**(`data`, `idInterceptor?`): `any`

Import shapes from JSON.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` |  |
| `idInterceptor?` | (`id`: `string`) => `string` | function to change the imported id to avoid name conflicts, eg. in case user decides to import multiple times or import _after_ drawing |

#### Returns

`any`

**`Example`**

```js
{
  "components": [{
    "id": "circle_1",
    "type": "circle",
    "data": {
      "x": 444,
      "y": 71,
      "width": 241,
      "height": 211
    }
  }]
}
```

**`Example`**

```js
{
  "components": [{
    "id": "rect_1",
    "type": "rect",
    "data": {
      "x": 444,
      "y": 71,
      "width": 241,
      "height": 211
    }
  }]
}
```

**`Example`**

```js
{
  "components": [{
    "id": "ellipse_1",
    "type": "ellipse",
    "data": {
      "x": 444,
      "y": 71,
      "width": 241,
      "height": 211
    }
  }]
}
```

**`Example`**

```js
{
  "components": [{
    "id": "polygon_1",
    "type": "polygon",
    "data": [{
      "x": 603,
      "y": 114
    }, {
      "x": 625,
      "y": 203
    }, {
      "x": 699,
      "y": 124
    }]
  }]
}
```

#### Defined in

[src/editor.ts:402](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L402)

___

### loadImage

▸ **loadImage**(`path`, `width?`, `height?`): [`Editor`](Editor.md)

Add an image element into the SVG element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `width?` | `string` \| `number` |
| `height?` | `string` \| `number` |

#### Returns

[`Editor`](Editor.md)

#### Defined in

[src/editor.ts:142](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L142)

___

### off

▸ **off**(`eventTypes`, `handler`): [`Editor`](Editor.md)

Remove event listener(s).

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventTypes` | `string` |
| `handler` | `EventListenerOrEventListenerObject` |

#### Returns

[`Editor`](Editor.md)

#### Defined in

[src/editor.ts:317](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L317)

___

### on

▸ **on**(`eventTypes`, `handler`): [`Editor`](Editor.md)

Add event listener(s).

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventTypes` | `string` |
| `handler` | `EventListenerOrEventListenerObject` |

#### Returns

[`Editor`](Editor.md)

#### Defined in

[src/editor.ts:305](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L305)

___

### polygon

▸ **polygon**(): `void`

Put editor in draw mode of polygons.

#### Returns

`void`

#### Defined in

[src/editor.ts:229](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L229)

___

### rect

▸ **rect**(): `void`

Put editor in draw mode of rectangles.

#### Returns

`void`

#### Defined in

[src/editor.ts:208](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L208)

___

### registerComponent

▸ **registerComponent**\<`T`\>(`component`, `id?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Handle`](Handle.md) \| [`Component`](Component.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `T` |
| `id?` | `string` |

#### Returns

`T`

#### Defined in

[src/editor.ts:494](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L494)

___

### registerComponentHandle

▸ **registerComponentHandle**(`handle`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`Handle`](Handle.md) |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/editor.ts:506](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L506)

___

### removeComponent

▸ **removeComponent**(`componentOrId`): ``null`` \| [`Component`](Component.md)

Remove a component (shape) from the editor or view.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentOrId` | `string` \| [`Component`](Component.md) | a component or a component id |

#### Returns

``null`` \| [`Component`](Component.md)

#### Defined in

[src/editor.ts:283](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L283)

___

### selectComponent

▸ **selectComponent**(`componentOrId?`): ``null`` \| [`Component`](Component.md)

Make programmatically selection of a component which basically enables its handles by making them visible.
Please note that all components will be unselected when leaving select mode or leaving draw mode.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentOrId?` | `string` \| [`Handle`](Handle.md) \| [`Component`](Component.md) | a component or a component id |

#### Returns

``null`` \| [`Component`](Component.md)

#### Defined in

[src/editor.ts:255](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L255)

___

### selectMode

▸ **selectMode**(): `void`

Put editor in select mode.

#### Returns

`void`

#### Defined in

[src/editor.ts:236](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L236)

___

### setStyle

▸ **setStyle**(`style`): [`Editor`](Editor.md)

Completely or partly set current style of components, handles, hovering etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `Partial`\<\{ `component`: [`Style`](../modules.md#style) ; `componentHover`: \{ `off`: [`Style`](../modules.md#style) ; `on`: [`Style`](../modules.md#style)  } ; `componentSelect`: \{ `off`: [`Style`](../modules.md#style) ; `on`: [`Style`](../modules.md#style)  } ; `handle`: [`Style`](../modules.md#style) ; `handleHover`: [`Style`](../modules.md#style)  }\> |

#### Returns

[`Editor`](Editor.md)

**`Example`**

```js
editor.setStyle({
  component: {
    fill: 'rgb(102, 102, 102)',
    stroke: 'rgb(51, 51, 51)',
  },
  componentHover: {
    off: {
      'stroke-width': 1,
      opacity: 0.5,
    },
    on: {
      'stroke-width': 2,
      opacity: 0.6,
    },
  },
  componentSelect: {
    off: {
      'stroke-dasharray': 'none',
      'stroke-linejoin': 'miter',
    },
    on: {
      'stroke-dasharray': '4 3',
      'stroke-linejoin': 'round',
    },
  },
  handle: {
    fill: 'rgb(255, 255, 255)',
    stroke: 'rgb(51, 51, 51)',
    'stroke-width': 1,
    opacity: 0.3,
  },
  handleHover: {
    opacity: 0.6,
  },
});
```

#### Defined in

[src/editor.ts:196](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L196)

___

### unregisterComponent

▸ **unregisterComponent**(`component`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | [`Handle`](Handle.md) \| [`Component`](Component.md) |

#### Returns

`void`

#### Defined in

[src/editor.ts:510](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/editor.ts#L510)
