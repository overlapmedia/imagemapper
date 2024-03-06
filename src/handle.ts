import { SVG_NS } from "./constants";
import { doc } from "./globals";
import { Style, addHover, setStyle } from "./style";

export class Handle {
    moveHandler: (deltaX: number, deltaY: number) => void;
    element: SVGCircleElement;
    isFrozen: boolean;

    constructor(
        x: number,
        y: number,
        moveHandler: (deltaX: number, deltaY: number) => void,
        frozen?: boolean
    ) {
        this.moveHandler = moveHandler;

        this.element = doc.createElementNS<"circle">(SVG_NS, "circle");
        this.element.setAttribute("cx", String(x));
        this.element.setAttribute("cy", String(y));
        this.element.setAttribute("r", "5");
        this.element.setAttribute("visibility", "hidden");

        this.isFrozen = frozen != null ? !!frozen : false;
    }

    freeze(freeze?: boolean) {
        this.isFrozen = freeze != null ? !!freeze : true;
        this.isFrozen && this.setVisible(false);
        return this;
    }

    setAttrX(value: number) {
        this.element.setAttribute("cx", String(value));
        return this;
    }

    setAttrY(value: number) {
        this.element.setAttribute("cy", String(value));
        return this;
    }

    move(deltaX: number, deltaY: number) {
        this.moveHandler(deltaX, deltaY);
        return this;
    }

    setVisible(visible?: boolean) {
        visible = visible != null ? !!visible : true;
        this.element.setAttribute("visibility", visible ? "visible" : "hidden");
        return this;
    }

    setStyle(style: Style, hoverStyle: Style) {
        setStyle(this.element, style);
        addHover(this.element, style, hoverStyle);
        return this;
    }
}
