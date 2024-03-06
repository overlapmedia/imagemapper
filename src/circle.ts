import { Editor } from "./editor";
import { CornerShapedElement } from "./factory";

export class Circle extends CornerShapedElement {
    constructor(editorOwner: Editor, x: number, y: number, width = 0, height = 0) {
        super(
            "circle",
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
                    element.setAttribute(
                        "r",
                        String(Math.min(Math.abs(width), Math.abs(dim.height)) / 2)
                    );
                    element.setAttribute("cx", String(dim.x + width / 2));
                },
                // resize
                height: (element, height, _prevHeight, dim) => {
                    element.setAttribute(
                        "r",
                        String(Math.min(Math.abs(height), Math.abs(dim.width)) / 2)
                    );
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
