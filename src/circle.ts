import { Editor } from "./editor";
import { CornerShapedElement } from "./factory";

export class Circle extends CornerShapedElement {
    constructor(editorOwner: Editor, x: number, y: number, width = 0, height = 0) {
        super(
            "circle",
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
                    super.element.setAttribute(
                        "r",
                        String(Math.min(Math.abs(width), Math.abs(dim.height)) / 2)
                    );
                    super.element.setAttribute("cx", String(dim.x + width / 2));
                },
                // resize
                height: (height, _prevHeight, dim) => {
                    super.element.setAttribute(
                        "r",
                        String(Math.min(Math.abs(height), Math.abs(dim.width)) / 2)
                    );
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
