import { Editor } from "./editor";
import { CornerShapedElement } from "./factory";

export class Ellipse extends CornerShapedElement {
    constructor(editorOwner: Editor, x: number, y: number, width = 0, height = 0) {
        super(
            "ellipse",
            {
                // move
                x: (element, x, _prevX, dim) => {
                    element.setAttribute("cx", String(x + dim.width / 2));
                },
                // move
                y: (element, y, _prevY, dim) => {
                    element.setAttribute("cy", String(y + dim.height / 2));
                },
                // resize
                width: (element, width, _prevWidth, dim) => {
                    element.setAttribute("rx", String(Math.abs(width) / 2));
                    element.setAttribute("cx", String(dim.x + width / 2));
                },
                // resize
                height: (element, height, _prevHeight, dim) => {
                    element.setAttribute("ry", String(Math.abs(height) / 2));
                    element.setAttribute("cy", String(dim.y + height / 2));
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
