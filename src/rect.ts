import { Editor } from "./editor";
import { CornerShapedElement } from "./factory";

export class Rectangle extends CornerShapedElement {
    constructor(editorOwner: Editor, x: number, y: number, width = 0, height = 0) {
        super(
            "rect",
            {
                // move
                x: (x, _prevX, dim) => {
                    super.element.setAttribute("x", String(dim.width < 0 ? x + dim.width : x));
                },
                // move
                y: (y, _prevY, dim) => {
                    super.element.setAttribute("y", String(dim.height < 0 ? y + dim.height : y));
                },
                // resize
                width: (width, _prevWidth, dim) => {
                    super.element.setAttribute("width", String(Math.abs(width)));
                    super.element.setAttribute("x", String(width < 0 ? dim.x + width : dim.x));
                },
                // resize
                height: (height, _prevHeight, dim) => {
                    super.element.setAttribute("height", String(Math.abs(height)));
                    super.element.setAttribute("y", String(height < 0 ? dim.y + height : dim.y));
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
