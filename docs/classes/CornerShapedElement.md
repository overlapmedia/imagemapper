# Class: CornerShapedElement

## Hierarchy

- [`Component`](Component.md)

  ↳ **`CornerShapedElement`**

  ↳↳ [`Rectangle`](Rectangle.md)

  ↳↳ [`Circle`](Circle.md)

  ↳↳ [`Ellipse`](Ellipse.md)

## Table of contents

### Constructors

- [constructor](CornerShapedElement.md#constructor)

### Properties

- [dim](CornerShapedElement.md#dim)
- [editorOwner](CornerShapedElement.md#editorowner)
- [element](CornerShapedElement.md#element)
- [handles](CornerShapedElement.md#handles)
- [isFrozen](CornerShapedElement.md#isfrozen)
- [isSelected](CornerShapedElement.md#isselected)
- [style](CornerShapedElement.md#style)

### Methods

- [\_logWarnOnOpOnFrozen](CornerShapedElement.md#_logwarnonoponfrozen)
- [export](CornerShapedElement.md#export)
- [freeze](CornerShapedElement.md#freeze)
- [getHandles](CornerShapedElement.md#gethandles)
- [isValid](CornerShapedElement.md#isvalid)
- [move](CornerShapedElement.md#move)
- [resize](CornerShapedElement.md#resize)
- [setHandlesVisibility](CornerShapedElement.md#sethandlesvisibility)
- [setIsSelected](CornerShapedElement.md#setisselected)
- [setStyle](CornerShapedElement.md#setstyle)

## Constructors

### constructor

• **new CornerShapedElement**(`svgElementName`, `propChangeListener`, `editorOwner`, `x`, `y`, `width?`, `height?`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `svgElementName` | keyof `SVGElementTagNameMap` | `undefined` |
| `propChangeListener` | `Object` | `undefined` |
| `propChangeListener.height` | (`element`: `SVGElement`, `height`: `number`, `prevHeight`: `number`, `dim`: [`Dim`](../modules.md#dim)) => `void` | `undefined` |
| `propChangeListener.width` | (`element`: `SVGElement`, `width`: `number`, `prevWidth`: `number`, `dim`: [`Dim`](../modules.md#dim)) => `void` | `undefined` |
| `propChangeListener.x` | (`element`: `SVGElement`, `x`: `number`, `prevX`: `number`, `dim`: [`Dim`](../modules.md#dim)) => `void` | `undefined` |
| `propChangeListener.y` | (`element`: `SVGElement`, `y`: `number`, `prevY`: `number`, `dim`: [`Dim`](../modules.md#dim)) => `void` | `undefined` |
| `editorOwner` | [`Editor`](Editor.md) | `undefined` |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `width` | `number` | `0` |
| `height` | `number` | `0` |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Overrides

[Component](Component.md).[constructor](Component.md#constructor)

#### Defined in

[src/factory.ts:15](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L15)

## Properties

### dim

• **dim**: [`Dim`](../modules.md#dim)

#### Defined in

[src/factory.ts:12](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L12)

___

### editorOwner

• `Readonly` **editorOwner**: [`Editor`](Editor.md)

#### Inherited from

[Component](Component.md).[editorOwner](Component.md#editorowner)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L10)

___

### element

• `Readonly` **element**: `SVGElement`

#### Inherited from

[Component](Component.md).[element](Component.md#element)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L10)

___

### handles

• **handles**: [`Handle`](Handle.md)[]

#### Defined in

[src/factory.ts:13](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L13)

___

### isFrozen

• **isFrozen**: `boolean` = `false`

#### Inherited from

[Component](Component.md).[isFrozen](Component.md#isfrozen)

#### Defined in

[src/component.ts:8](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L8)

___

### isSelected

• **isSelected**: `boolean` = `false`

#### Inherited from

[Component](Component.md).[isSelected](Component.md#isselected)

#### Defined in

[src/component.ts:7](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L7)

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

#### Inherited from

[Component](Component.md).[style](Component.md#style)

#### Defined in

[src/component.ts:6](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L6)

## Methods

### \_logWarnOnOpOnFrozen

▸ **_logWarnOnOpOnFrozen**(`op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `string` |

#### Returns

`void`

#### Inherited from

[Component](Component.md).[_logWarnOnOpOnFrozen](Component.md#_logwarnonoponfrozen)

#### Defined in

[src/component.ts:28](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L28)

___

### export

▸ **export**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |
| `x` | `number` |
| `y` | `number` |

#### Overrides

[Component](Component.md).[export](Component.md#export)

#### Defined in

[src/factory.ts:189](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L189)

___

### freeze

▸ **freeze**(`freeze?`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `freeze?` | `boolean` |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Overrides

[Component](Component.md).[freeze](Component.md#freeze)

#### Defined in

[src/factory.ts:135](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L135)

___

### getHandles

▸ **getHandles**(): [`Handle`](Handle.md)[]

#### Returns

[`Handle`](Handle.md)[]

#### Overrides

[Component](Component.md).[getHandles](Component.md#gethandles)

#### Defined in

[src/factory.ts:175](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L175)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Overrides

[Component](Component.md).[isValid](Component.md#isvalid)

#### Defined in

[src/factory.ts:153](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L153)

___

### move

▸ **move**(`deltaX`, `deltaY`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deltaX` | `number` |
| `deltaY` | `number` |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Overrides

[Component](Component.md).[move](Component.md#move)

#### Defined in

[src/factory.ts:147](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L147)

___

### resize

▸ **resize**(`x`, `y`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Defined in

[src/factory.ts:141](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L141)

___

### setHandlesVisibility

▸ **setHandlesVisibility**(`visible?`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible?` | `boolean` |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Overrides

[Component](Component.md).[setHandlesVisibility](Component.md#sethandlesvisibility)

#### Defined in

[src/factory.ts:157](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L157)

___

### setIsSelected

▸ **setIsSelected**(`selected?`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selected?` | `boolean` |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Overrides

[Component](Component.md).[setIsSelected](Component.md#setisselected)

#### Defined in

[src/factory.ts:162](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L162)

___

### setStyle

▸ **setStyle**(`style`): [`CornerShapedElement`](CornerShapedElement.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | `Object` |
| `style.component` | [`Style`](../modules.md#style) |
| `style.componentHover` | `Object` |
| `style.componentHover.off` | [`Style`](../modules.md#style) |
| `style.componentHover.on` | [`Style`](../modules.md#style) |
| `style.componentSelect` | `Object` |
| `style.componentSelect.off` | [`Style`](../modules.md#style) |
| `style.componentSelect.on` | [`Style`](../modules.md#style) |
| `style.handle` | [`Style`](../modules.md#style) |
| `style.handleHover` | [`Style`](../modules.md#style) |

#### Returns

[`CornerShapedElement`](CornerShapedElement.md)

#### Overrides

[Component](Component.md).[setStyle](Component.md#setstyle)

#### Defined in

[src/factory.ts:179](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L179)
