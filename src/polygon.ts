import { Component } from "./component";
import { SVG_NS } from "./constants";
import { Editor } from "./editor";
import { doc } from "./globals";
import { Handle } from "./handle";
import { onChange } from "./onChangeProxy";
import { addHover, getDefaultStyle, setStyle } from "./style";
import { isNotNull } from "./utils";

export type Point = {
    x: number;
    y: number;
    handle?: Handle;
};
export class Polygon extends Component {
    points: Point[] = []; // proxied points

    constructor(editorOwner: Editor, points?: Point[] | Point) {
        super(editorOwner, doc.createElementNS(SVG_NS, "polygon"));
        points && [points].flat().forEach(p => this.addPoint(p.x, p.y));
    }

    updateElementPoints() {
        this.element.setAttribute("points", this.points.map(p => `${p.x},${p.y}`).join(" "));
        return this;
    }

    addPoint(x: number, y: number) {
        const point: Point = { x, y };
        const pointProxy = onChange<Point>(point, (prop, newValue, _prevValue, obj) => {
            this._logWarnOnOpOnFrozen("Point moved on");
            this.updateElementPoints();
            prop === "x" && obj.handle?.setAttrX(newValue);
            prop === "y" && obj.handle?.setAttrY(newValue);
        });

        // don't observe handle assignment
        point.handle = new Handle(
            x,
            y,
            (deltaX, deltaY) => {
                pointProxy.x += deltaX;
                pointProxy.y += deltaY;
            },
            this.isFrozen
        );
        this.editorOwner.registerComponentHandle(point.handle);

        this.points.push(pointProxy);
        this.updateElementPoints();

        return this;
    }

    moveLastPoint(x: number, y: number) {
        const lastPoint = this.points[this.points.length - 1];
        [lastPoint.x, lastPoint.y] = [x, y];
        return this;
    }

    override freeze(freeze?: boolean) {
        this.isFrozen = freeze != null ? !!freeze : true;
        this.getHandles().forEach(handle => handle?.freeze(freeze));
        return this;
    }

    // TODO: move by transform:translate instead?
    override move(deltaX: number, deltaY: number) {
        this.points.forEach(p => {
            p.x += deltaX;
            p.y += deltaY;
        });
        return this;
    }

    override isValid() {
        return this.points.length >= 3;
    }

    override setHandlesVisibility(visible?: boolean) {
        this.getHandles().forEach(handle => handle.setVisible(visible));
        return this;
    }

    override setIsSelected(selected?: boolean) {
        this._logWarnOnOpOnFrozen("Select/unselect performed on");

        this.isSelected = selected = selected != null ? !!selected : true;
        this.setHandlesVisibility(selected);
        this.style &&
            setStyle(
                this.element,
                selected ? this.style.componentSelect.on : this.style.componentSelect.off
            );
        return this;
    }

    override getHandles() {
        return this.points.map(p => p.handle).filter(isNotNull);
    }

    override setStyle(style: ReturnType<typeof getDefaultStyle>) {
        this.style = style;
        setStyle(this.element, style.component);
        setStyle(this.element, style.componentHover.off);
        setStyle(this.element, style.componentSelect.off);

        addHover(this.element, style.componentHover.off, style.componentHover.on);
        return this;
    }

    override export() {
        return this.points.map(p => ({ x: p.x, y: p.y }));
    }
}
