# Class: Handle

## Table of contents

### Constructors

- [constructor](Handle.md#constructor)

### Properties

- [element](Handle.md#element)
- [isFrozen](Handle.md#isfrozen)
- [moveHandler](Handle.md#movehandler)

### Methods

- [freeze](Handle.md#freeze)
- [move](Handle.md#move)
- [setAttrX](Handle.md#setattrx)
- [setAttrY](Handle.md#setattry)
- [setStyle](Handle.md#setstyle)
- [setVisible](Handle.md#setvisible)

## Constructors

### constructor

• **new Handle**(`x`, `y`, `moveHandler`, `frozen?`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `moveHandler` | (`deltaX`: `number`, `deltaY`: `number`) => `void` |
| `frozen?` | `boolean` |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:10](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L10)

## Properties

### element

• **element**: `SVGCircleElement`

#### Defined in

[src/handle.ts:7](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L7)

___

### isFrozen

• **isFrozen**: `boolean`

#### Defined in

[src/handle.ts:8](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L8)

___

### moveHandler

• **moveHandler**: (`deltaX`: `number`, `deltaY`: `number`) => `void`

#### Type declaration

▸ (`deltaX`, `deltaY`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `deltaX` | `number` |
| `deltaY` | `number` |

##### Returns

`void`

#### Defined in

[src/handle.ts:6](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L6)

## Methods

### freeze

▸ **freeze**(`freeze?`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `freeze?` | `boolean` |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:27](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L27)

___

### move

▸ **move**(`deltaX`, `deltaY`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `deltaX` | `number` |
| `deltaY` | `number` |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:43](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L43)

___

### setAttrX

▸ **setAttrX**(`value`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:33](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L33)

___

### setAttrY

▸ **setAttrY**(`value`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:38](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L38)

___

### setStyle

▸ **setStyle**(`style`, `hoverStyle`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `style` | [`Style`](../modules.md#style) |
| `hoverStyle` | [`Style`](../modules.md#style) |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:54](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L54)

___

### setVisible

▸ **setVisible**(`visible?`): [`Handle`](Handle.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible?` | `boolean` |

#### Returns

[`Handle`](Handle.md)

#### Defined in

[src/handle.ts:48](https://github.com/overlapmedia/imagemapper/blob/2359bc4/src/handle.ts#L48)
