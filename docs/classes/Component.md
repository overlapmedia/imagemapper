# Class: Component

## Hierarchy

- **`Component`**

  ↳ [`CornerShapedElement`](CornerShapedElement.md)

  ↳ [`Polygon`](Polygon.md)

## Table of contents

### Constructors

- [constructor](Component.md#constructor)

### Properties

- [editorOwner](Component.md#editorowner)
- [element](Component.md#element)
- [isFrozen](Component.md#isfrozen)
- [isSelected](Component.md#isselected)
- [style](Component.md#style)

### Methods

- [\_logWarnOnOpOnFrozen](Component.md#_logwarnonoponfrozen)
- [export](Component.md#export)
- [freeze](Component.md#freeze)
- [getHandles](Component.md#gethandles)
- [isValid](Component.md#isvalid)
- [move](Component.md#move)
- [setHandlesVisibility](Component.md#sethandlesvisibility)
- [setIsSelected](Component.md#setisselected)
- [setStyle](Component.md#setstyle)

## Constructors

### constructor

• **new Component**(`editorOwner`, `element`): [`Component`](Component.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `editorOwner` | [`Editor`](Editor.md) |
| `element` | `SVGElement` |

#### Returns

[`Component`](Component.md)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L10)

## Properties

### editorOwner

• `Readonly` **editorOwner**: [`Editor`](Editor.md)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L10)

___

### element

• `Readonly` **element**: `SVGElement`

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L10)

___

### isFrozen

• **isFrozen**: `boolean` = `false`

#### Defined in

[src/component.ts:8](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L8)

___

### isSelected

• **isSelected**: `boolean` = `false`

#### Defined in

[src/component.ts:7](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L7)

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

[src/component.ts:6](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L6)

## Methods

### \_logWarnOnOpOnFrozen

▸ **_logWarnOnOpOnFrozen**(`op`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `op` | `string` |

#### Returns

`void`

#### Defined in

[src/component.ts:28](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L28)

___

### export

▸ **export**(): `object`

#### Returns

`object`

#### Defined in

[src/component.ts:26](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L26)

___

### freeze

▸ **freeze**(`freeze?`): [`Component`](Component.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `freeze?` | `boolean` |

#### Returns

[`Component`](Component.md)

#### Defined in

[src/component.ts:12](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L12)

___

### getHandles

▸ **getHandles**(): [`Handle`](Handle.md)[]

#### Returns

[`Handle`](Handle.md)[]

#### Defined in

[src/component.ts:22](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L22)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/component.ts:14](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L14)

___

### move

▸ **move**(`deltaX`, `deltaY`): [`Component`](Component.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deltaX` | `number` |
| `deltaY` | `number` |

#### Returns

[`Component`](Component.md)

#### Defined in

[src/component.ts:16](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L16)

___

### setHandlesVisibility

▸ **setHandlesVisibility**(`visible?`): [`Component`](Component.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible?` | `boolean` |

#### Returns

[`Component`](Component.md)

#### Defined in

[src/component.ts:18](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L18)

___

### setIsSelected

▸ **setIsSelected**(`selected?`): [`Component`](Component.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selected?` | `boolean` |

#### Returns

[`Component`](Component.md)

#### Defined in

[src/component.ts:20](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L20)

___

### setStyle

▸ **setStyle**(`style`): [`Component`](Component.md)

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

[`Component`](Component.md)

#### Defined in

[src/component.ts:24](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L24)
