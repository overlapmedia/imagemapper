[@overlapmedia/imagemapper](readme.md) / API Reference
# @overlapmedia/imagemapper

## Table of contents

### Classes

- [Circle](classes/Circle.md)
- [Component](classes/Component.md)
- [CornerShapedElement](classes/CornerShapedElement.md)
- [Editor](classes/Editor.md)
- [Ellipse](classes/Ellipse.md)
- [Handle](classes/Handle.md)
- [Polygon](classes/Polygon.md)
- [Rectangle](classes/Rectangle.md)

### Type Aliases

- [Dim](modules.md#dim)
- [EditorOptions](modules.md#editoroptions)
- [Point](modules.md#point)
- [Style](modules.md#style)

### Variables

- [default](modules.md#default)

### Functions

- [editor](modules.md#editor)
- [view](modules.md#view)

## Type Aliases

### Dim

Ƭ **Dim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/factory.ts:9](https://github.com/overlapmedia/imagemapper/blob/82f6975/src/factory.ts#L9)

___

### EditorOptions

Ƭ **EditorOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentDrawnHandler` | (`c`: [`Component`](classes/Component.md), `id`: `string`) => `void` | - |
| `height` | `number` | if you let imagemapper create the SVGElement for you, you could specify height for it here |
| `selectModeHandler` | () => `void` | - |
| `viewClickHandler` | (`e`: `Event`, `id`: `string`) => `void` | - |
| `width` | `number` | if you let imagemapper create the SVGElement for you, you could specify width for it here |

#### Defined in

[src/editor.ts:18](https://github.com/overlapmedia/imagemapper/blob/82f6975/src/editor.ts#L18)

___

### Point

Ƭ **Point**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `handle?` | [`Handle`](classes/Handle.md) |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/polygon.ts:10](https://github.com/overlapmedia/imagemapper/blob/82f6975/src/polygon.ts#L10)

___

### Style

Ƭ **Style**: `Record`\<`string`, `string`\>

#### Defined in

[src/style.ts:3](https://github.com/overlapmedia/imagemapper/blob/82f6975/src/style.ts#L3)

## Variables

### default

• **default**: `Object`

**`Example`**

```js
import imagemapper from '@overlapmedia/imagemapper';
const editor = imagemapper.editor('editor-id');
editor.polygon();
```

**`Example`**

```js
import { editor, view } from '@overlapmedia/imagemapper';
const myEditor = editor('editor-id');
myEditor.polygon();
```

#### Type declaration

| Name | Type |
| :------ | :------ |
| `editor` | (...`params`: [svgEl: string \| SVGElement, options: Partial\<EditorOptions\>, style: Partial\<Object\>]) => [`Editor`](classes/Editor.md) |
| `view` | (...`params`: [svgEl: string \| SVGElement, options: Partial\<EditorOptions\>, style: Partial\<Object\>]) => [`Editor`](classes/Editor.md) |

#### Defined in

[index.ts:30](https://github.com/overlapmedia/imagemapper/blob/82f6975/index.ts#L30)

## Functions

### editor

▸ **editor**(`...params`): [`Editor`](classes/Editor.md)

Editor

#### Parameters

| Name | Type |
| :------ | :------ |
| `...params` | [svgEl: string \| SVGElement, options: Partial\<EditorOptions\>, style: Partial\<Object\>] |

#### Returns

[`Editor`](classes/Editor.md)

#### Defined in

[index.ts:7](https://github.com/overlapmedia/imagemapper/blob/82f6975/index.ts#L7)

___

### view

▸ **view**(`...params`): [`Editor`](classes/Editor.md)

View

#### Parameters

| Name | Type |
| :------ | :------ |
| `...params` | [svgEl: string \| SVGElement, options: Partial\<EditorOptions\>, style: Partial\<Object\>] |

#### Returns

[`Editor`](classes/Editor.md)

- an Editor constructor which does not add drawing capabilities

#### Defined in

[index.ts:13](https://github.com/overlapmedia/imagemapper/blob/82f6975/index.ts#L13)
