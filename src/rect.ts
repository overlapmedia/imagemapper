import { Editor } from "./editor";
import { CornerShapedElement } from "./factory";

export class Rectangle extends CornerShapedElement {
    constructor(editorOwner: Editor, x: number, y: number, width = 0, height = 0) {
        super(
            "rect",
            {
                // move
                x: (element, x, _prevX, dim) => {
                    element.setAttribute("x", String(dim.width < 0 ? x + dim.width : x));
                },
                // move
                y: (element, y, _prevY, dim) => {
                    element.setAttribute("y", String(dim.height < 0 ? y + dim.height : y));
                },
                // resize
                width: (element, width, _prevWidth, dim) => {
                    element.setAttribute("width", String(Math.abs(width)));
                    element.setAttribute("x", String(width < 0 ? dim.x + width : dim.x));
                },
                // resize
                height: (element, height, _prevHeight, dim) => {
                    element.setAttribute("height", String(Math.abs(height)));
                    element.setAttribute("y", String(height < 0 ? dim.y + height : dim.y));
                },
            },
            editorOwner,
            x,
            y,
            width,
            height
        );
    }
}
