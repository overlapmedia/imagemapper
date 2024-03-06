# Class: Rectangle

## Hierarchy

- [`CornerShapedElement`](CornerShapedElement.md)

  ↳ **`Rectangle`**

## Table of contents

### Constructors

- [constructor](Rectangle.md#constructor)

### Properties

- [dim](Rectangle.md#dim)
- [editorOwner](Rectangle.md#editorowner)
- [element](Rectangle.md#element)
- [handles](Rectangle.md#handles)
- [isFrozen](Rectangle.md#isfrozen)
- [isSelected](Rectangle.md#isselected)
- [style](Rectangle.md#style)

### Methods

- [\_logWarnOnOpOnFrozen](Rectangle.md#_logwarnonoponfrozen)
- [export](Rectangle.md#export)
- [freeze](Rectangle.md#freeze)
- [getHandles](Rectangle.md#gethandles)
- [isValid](Rectangle.md#isvalid)
- [move](Rectangle.md#move)
- [resize](Rectangle.md#resize)
- [setHandlesVisibility](Rectangle.md#sethandlesvisibility)
- [setIsSelected](Rectangle.md#setisselected)
- [setStyle](Rectangle.md#setstyle)

## Constructors

### constructor

• **new Rectangle**(`editorOwner`, `x`, `y`, `width?`, `height?`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `editorOwner` | [`Editor`](Editor.md) | `undefined` |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `width` | `number` | `0` |
| `height` | `number` | `0` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Overrides

[CornerShapedElement](CornerShapedElement.md).[constructor](CornerShapedElement.md#constructor)

#### Defined in

[src/rect.ts:5](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/rect.ts#L5)

## Properties

### dim

• **dim**: [`Dim`](../modules.md#dim)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[dim](CornerShapedElement.md#dim)

#### Defined in

[src/factory.ts:12](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L12)

___

### editorOwner

• `Readonly` **editorOwner**: [`Editor`](Editor.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[editorOwner](CornerShapedElement.md#editorowner)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L10)

___

### element

• `Readonly` **element**: `SVGElement`

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[element](CornerShapedElement.md#element)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L10)

___

### handles

• **handles**: [`Handle`](Handle.md)[]

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[handles](CornerShapedElement.md#handles)

#### Defined in

[src/factory.ts:13](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L13)

___

### isFrozen

• **isFrozen**: `boolean` = `false`

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[isFrozen](CornerShapedElement.md#isfrozen)

#### Defined in

[src/component.ts:8](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/component.ts#L8)

___

### isSelected

• **isSelected**: `boolean` = `false`

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[isSelected](CornerShapedElement.md#isselected)

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

[CornerShapedElement](CornerShapedElement.md).[style](CornerShapedElement.md#style)

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

[CornerShapedElement](CornerShapedElement.md).[_logWarnOnOpOnFrozen](CornerShapedElement.md#_logwarnonoponfrozen)

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

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[export](CornerShapedElement.md#export)

#### Defined in

[src/factory.ts:189](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L189)

___

### freeze

▸ **freeze**(`freeze?`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `freeze?` | `boolean` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[freeze](CornerShapedElement.md#freeze)

#### Defined in

[src/factory.ts:135](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L135)

___

### getHandles

▸ **getHandles**(): [`Handle`](Handle.md)[]

#### Returns

[`Handle`](Handle.md)[]

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[getHandles](CornerShapedElement.md#gethandles)

#### Defined in

[src/factory.ts:175](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L175)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[isValid](CornerShapedElement.md#isvalid)

#### Defined in

[src/factory.ts:153](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L153)

___

### move

▸ **move**(`deltaX`, `deltaY`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deltaX` | `number` |
| `deltaY` | `number` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[move](CornerShapedElement.md#move)

#### Defined in

[src/factory.ts:147](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L147)

___

### resize

▸ **resize**(`x`, `y`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[resize](CornerShapedElement.md#resize)

#### Defined in

[src/factory.ts:141](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L141)

___

### setHandlesVisibility

▸ **setHandlesVisibility**(`visible?`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible?` | `boolean` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[setHandlesVisibility](CornerShapedElement.md#sethandlesvisibility)

#### Defined in

[src/factory.ts:157](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L157)

___

### setIsSelected

▸ **setIsSelected**(`selected?`): [`Rectangle`](Rectangle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selected?` | `boolean` |

#### Returns

[`Rectangle`](Rectangle.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[setIsSelected](CornerShapedElement.md#setisselected)

#### Defined in

[src/factory.ts:162](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L162)

___

### setStyle

▸ **setStyle**(`style`): [`Rectangle`](Rectangle.md)

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

[`Rectangle`](Rectangle.md)

#### Inherited from

[CornerShapedElement](CornerShapedElement.md).[setStyle](CornerShapedElement.md#setstyle)

#### Defined in

[src/factory.ts:179](https://github.com/overlapmedia/imagemapper/blob/bed6f48/src/factory.ts#L179)
