import { Component } from "./component";
import { SVG_NS } from "./constants";
import { Editor } from "./editor";
import { doc } from "./globals";
import { Handle } from "./handle";
import { onChange } from "./onChangeProxy";
import { addHover, getDefaultStyle, setStyle } from "./style";

export type Dim = { x: number; y: number; width: number; height: number };

export abstract class CornerShapedElement extends Component {
    dim: Dim;
    handles: Handle[];

    constructor(
        svgElementName: keyof SVGElementTagNameMap,
        propChangeListener: {
            x: (element: SVGElement, x: number, prevX: number, dim: Dim) => void;
            y: (element: SVGElement, y: number, prevY: number, dim: Dim) => void;
            width: (element: SVGElement, width: number, prevWidth: number, dim: Dim) => void;
            height: (element: SVGElement, height: number, prevHeight: number, dim: Dim) => void;
        },
        editorOwner: Editor,
        x: number,
        y: number,
        width = 0,
        height = 0
    ) {
        super(editorOwner, doc.createElementNS(SVG_NS, svgElementName));
        this.dim = onChange<Dim>(
            { x, y, width: 0, height: 0 },
            {
                /*
                this.handles[]
                index location:
        
                   0_______2
                    |     |
                    |_____|
                   1       3
                */
                // move
                x: (x, prevX, dim) => {
                    this._logWarnOnOpOnFrozen("Dimension property x changed on");

                    propChangeListener.x.call(this, this.element, x, prevX, dim);
                    this.handles[0].setAttrX(x);
                    this.handles[1].setAttrX(x);
                    this.handles[2].setAttrX(x + dim.width);
                    this.handles[3].setAttrX(x + dim.width);
                },
                // move
                y: (y, prevY, dim) => {
                    this._logWarnOnOpOnFrozen("Dimension property y changed on");

                    propChangeListener.y.call(this, this.element, y, prevY, dim);
                    this.handles[0].setAttrY(y);
                    this.handles[1].setAttrY(y + dim.height);
                    this.handles[2].setAttrY(y);
                    this.handles[3].setAttrY(y + dim.height);
                },
                // resize
                width: (width, prevWidth, dim) => {
                    this._logWarnOnOpOnFrozen("Dimension property width changed on");

                    propChangeListener.width.call(this, this.element, width, prevWidth, dim);
                    this.handles[2].setAttrX(dim.x + width);
                    this.handles[3].setAttrX(dim.x + width);
                },
                // resize
                height: (height, prevHeight, dim) => {
                    this._logWarnOnOpOnFrozen("Dimension property height changed on");

                    propChangeListener.height.call(this, this.element, height, prevHeight, dim);
                    this.handles[1].setAttrY(dim.y + height);
                    this.handles[3].setAttrY(dim.y + height);
                },
            },
            this
        );

        this.handles = [
            new Handle(
                x,
                y,
                (deltaX, deltaY) => {
                    this.dim.x += deltaX;
                    this.dim.width -= deltaX;

                    this.dim.y += deltaY;
                    this.dim.height -= deltaY;
                },
                this.isFrozen
            ),
            new Handle(
                x,
                y,
                (deltaX, deltaY) => {
                    this.dim.x += deltaX;
                    this.dim.width -= deltaX;

                    this.dim.height += deltaY;
                },
                this.isFrozen
            ),
            new Handle(
                x,
                y,
                (deltaX, deltaY) => {
                    this.dim.width += deltaX;

                    this.dim.y += deltaY;
                    this.dim.height -= deltaY;
                },
                this.isFrozen
            ),
            new Handle(
                x,
                y,
                (deltaX, deltaY) => {
                    this.dim.width += deltaX;
                    this.dim.height += deltaY;
                },
                this.isFrozen
            ),
        ];
        this.handles.forEach(h => {
            this.editorOwner.registerComponentHandle(h);
        });

        // we want to resize when importing shape data too
        [this.dim.width, this.dim.height] = [width, height];
    }

    override freeze(freeze?: boolean) {
        this.isFrozen = freeze != null ? !!freeze : true;
        this.handles.forEach(handle => handle.freeze(freeze));
        return this;
    }

    resize(x: number, y: number) {
        this.dim.width = x - this.dim.x;
        this.dim.height = y - this.dim.y;
        return this;
    }

    override move(deltaX: number, deltaY: number) {
        this.dim.x += deltaX;
        this.dim.y += deltaY;
        return this;
    }

    override isValid() {
        return this.dim.width !== 0 && this.dim.height !== 0;
    }

    override setHandlesVisibility(visible?: boolean) {
        this.handles.forEach(handle => handle.setVisible(visible));
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
        return this.handles;
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
        const { x, y, width, height } = this.dim;
        return { x, y, width, height };
    }
}
