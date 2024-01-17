import { Editor } from "./editor";
import { CornerShapedElement } from "./factory";

export class Ellipse extends CornerShapedElement {
    constructor(editorOwner: Editor, x: number, y: number, width = 0, height = 0) {
        super(
            "ellipse",
            {
                // move
                x: (x, _prevX, dim) => {
                    super.element.setAttribute("cx", String(x + dim.width / 2));
                },
                // move
                y: (y, _prevY, dim) => {
                    super.element.setAttribute("cy", String(y + dim.height / 2));
                },
                // resize
                width: (width, _prevWidth, dim) => {
                    super.element.setAttribute("rx", String(Math.abs(width) / 2));
                    super.element.setAttribute("cx", String(dim.x + width / 2));
                },
                // resize
                height: (height, _prevHeight, dim) => {
                    super.element.setAttribute("ry", String(Math.abs(height) / 2));
                    super.element.setAttribute("cy", String(dim.y + height / 2));
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
