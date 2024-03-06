import { Component } from "./component";
import { Editor } from "./editor";
import { Handle } from "./handle";
import { getDefaultStyle } from "./style";
export type Point = {
    x: number;
    y: number;
    handle?: Handle;
};
export declare class Polygon extends Component {
    points: Point[];
    constructor(editorOwner: Editor, points?: Point[] | Point);
    updateElementPoints(): this;
    addPoint(x: number, y: number): this;
    moveLastPoint(x: number, y: number): this;
    freeze(freeze?: boolean): this;
    move(deltaX: number, deltaY: number): this;
    isValid(): boolean;
    setHandlesVisibility(visible?: boolean): this;
    setIsSelected(selected?: boolean): this;
    getHandles(): Handle[];
    setStyle(style: ReturnType<typeof getDefaultStyle>): this;
    export(): {
        x: number;
        y: number;
    }[];
}
