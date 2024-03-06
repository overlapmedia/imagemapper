import { Component } from "./component";
import { Editor } from "./editor";
import { Handle } from "./handle";
import { getDefaultStyle } from "./style";
export type Dim = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare abstract class CornerShapedElement extends Component {
    dim: Dim;
    handles: Handle[];
    constructor(svgElementName: keyof SVGElementTagNameMap, propChangeListener: {
        x: (x: number, prevX: number, dim: Dim) => void;
        y: (y: number, prevY: number, dim: Dim) => void;
        width: (width: number, prevWidth: number, dim: Dim) => void;
        height: (height: number, prevHeight: number, dim: Dim) => void;
    }, editorOwner: Editor, x: number, y: number, width?: number, height?: number);
    freeze(freeze?: boolean): this;
    resize(x: number, y: number): this;
    move(deltaX: number, deltaY: number): this;
    isValid(): boolean;
    setHandlesVisibility(visible?: boolean): this;
    setIsSelected(selected?: boolean): this;
    getHandles(): Handle[];
    setStyle(style: ReturnType<typeof getDefaultStyle>): this;
    export(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
