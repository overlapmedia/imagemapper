import { Style } from "./style";
export declare class Handle {
    moveHandler: (deltaX: number, deltaY: number) => void;
    element: SVGCircleElement;
    isFrozen: boolean;
    constructor(x: number, y: number, moveHandler: (deltaX: number, deltaY: number) => void, frozen?: boolean);
    freeze(freeze?: boolean): this;
    setAttrX(value: number): this;
    setAttrY(value: number): this;
    move(deltaX: number, deltaY: number): this;
    setVisible(visible?: boolean): this;
    setStyle(style: Style, hoverStyle: Style): this;
}
