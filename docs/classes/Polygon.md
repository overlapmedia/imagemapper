# Class: Polygon

## Hierarchy

- [`Component`](Component.md)

  ↳ **`Polygon`**

## Table of contents

### Constructors

- [constructor](Polygon.md#constructor)

### Properties

- [editorOwner](Polygon.md#editorowner)
- [element](Polygon.md#element)
- [isFrozen](Polygon.md#isfrozen)
- [isSelected](Polygon.md#isselected)
- [points](Polygon.md#points)
- [style](Polygon.md#style)

### Methods

- [\_logWarnOnOpOnFrozen](Polygon.md#_logwarnonoponfrozen)
- [addPoint](Polygon.md#addpoint)
- [export](Polygon.md#export)
- [freeze](Polygon.md#freeze)
- [getHandles](Polygon.md#gethandles)
- [isValid](Polygon.md#isvalid)
- [move](Polygon.md#move)
- [moveLastPoint](Polygon.md#movelastpoint)
- [setHandlesVisibility](Polygon.md#sethandlesvisibility)
- [setIsSelected](Polygon.md#setisselected)
- [setStyle](Polygon.md#setstyle)
- [updateElementPoints](Polygon.md#updateelementpoints)

## Constructors

### constructor

• **new Polygon**(`editorOwner`, `points?`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `editorOwner` | [`Editor`](Editor.md) |
| `points?` | [`Point`](../modules.md#point) \| [`Point`](../modules.md#point)[] |

#### Returns

[`Polygon`](Polygon.md)

#### Overrides

[Component](Component.md).[constructor](Component.md#constructor)

#### Defined in

[src/polygon.ts:18](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L18)

## Properties

### editorOwner

• `Readonly` **editorOwner**: [`Editor`](Editor.md)

#### Inherited from

[Component](Component.md).[editorOwner](Component.md#editorowner)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L10)

___

### element

• `Readonly` **element**: `SVGElement`

#### Inherited from

[Component](Component.md).[element](Component.md#element)

#### Defined in

[src/component.ts:10](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L10)

___

### isFrozen

• **isFrozen**: `boolean` = `false`

#### Inherited from

[Component](Component.md).[isFrozen](Component.md#isfrozen)

#### Defined in

[src/component.ts:8](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L8)

___

### isSelected

• **isSelected**: `boolean` = `false`

#### Inherited from

[Component](Component.md).[isSelected](Component.md#isselected)

#### Defined in

[src/component.ts:7](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L7)

___

### points

• **points**: [`Point`](../modules.md#point)[] = `[]`

#### Defined in

[src/polygon.ts:16](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L16)

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

#### Inherited from

[Component](Component.md).[_logWarnOnOpOnFrozen](Component.md#_logwarnonoponfrozen)

#### Defined in

[src/component.ts:28](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/component.ts#L28)

___

### addPoint

▸ **addPoint**(`x`, `y`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

[`Polygon`](Polygon.md)

#### Defined in

[src/polygon.ts:28](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L28)

___

### export

▸ **export**(): \{ `x`: `number` = p.x; `y`: `number` = p.y }[]

#### Returns

\{ `x`: `number` = p.x; `y`: `number` = p.y }[]

#### Overrides

[Component](Component.md).[export](Component.md#export)

#### Defined in

[src/polygon.ts:112](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L112)

___

### freeze

▸ **freeze**(`freeze?`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `freeze?` | `boolean` |

#### Returns

[`Polygon`](Polygon.md)

#### Overrides

[Component](Component.md).[freeze](Component.md#freeze)

#### Defined in

[src/polygon.ts:61](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L61)

___

### getHandles

▸ **getHandles**(): [`Handle`](Handle.md)[]

#### Returns

[`Handle`](Handle.md)[]

#### Overrides

[Component](Component.md).[getHandles](Component.md#gethandles)

#### Defined in

[src/polygon.ts:98](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L98)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

#### Overrides

[Component](Component.md).[isValid](Component.md#isvalid)

#### Defined in

[src/polygon.ts:76](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L76)

___

### move

▸ **move**(`deltaX`, `deltaY`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deltaX` | `number` |
| `deltaY` | `number` |

#### Returns

[`Polygon`](Polygon.md)

#### Overrides

[Component](Component.md).[move](Component.md#move)

#### Defined in

[src/polygon.ts:68](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L68)

___

### moveLastPoint

▸ **moveLastPoint**(`x`, `y`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

[`Polygon`](Polygon.md)

#### Defined in

[src/polygon.ts:55](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L55)

___

### setHandlesVisibility

▸ **setHandlesVisibility**(`visible?`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible?` | `boolean` |

#### Returns

[`Polygon`](Polygon.md)

#### Overrides

[Component](Component.md).[setHandlesVisibility](Component.md#sethandlesvisibility)

#### Defined in

[src/polygon.ts:80](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L80)

___

### setIsSelected

▸ **setIsSelected**(`selected?`): [`Polygon`](Polygon.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `selected?` | `boolean` |

#### Returns

[`Polygon`](Polygon.md)

#### Overrides

[Component](Component.md).[setIsSelected](Component.md#setisselected)

#### Defined in

[src/polygon.ts:85](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L85)

___

### setStyle

▸ **setStyle**(`style`): [`Polygon`](Polygon.md)

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

[`Polygon`](Polygon.md)

#### Overrides

[Component](Component.md).[setStyle](Component.md#setstyle)

#### Defined in

[src/polygon.ts:102](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L102)

___

### updateElementPoints

▸ **updateElementPoints**(): [`Polygon`](Polygon.md)

#### Returns

[`Polygon`](Polygon.md)

#### Defined in

[src/polygon.ts:23](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/polygon.ts#L23)
