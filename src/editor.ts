import { SVG_NS, XLINK_NS } from "./constants";
import { doc } from "./globals";
import createFSMService from "./fsm";
import { addEventListeners, removeEventListeners } from "./events";
import { onChange } from "./onChangeProxy";
import { Point, Polygon } from "./polygon";
import { Rectangle } from "./rect";
import { Circle } from "./circle";
import { Ellipse } from "./ellipse";
import { Handle } from "./handle";
import { getDefaultStyle } from "./style";
import { Component } from "./component";
import { Actor, ActorLogic } from "xstate";
import { Dim } from "./factory";
import { isNotNull } from "./utils";
import deepMerge from "ts-deepmerge";

export type EditorOptions = {
    /** if you let imagemapper create the SVGElement for you, you could specify width for it here */
    width: number;
    /** if you let imagemapper create the SVGElement for you, you could specify height for it here */
    height: number;
    /** function being called when finished drawing a valid component (eg. rectangle with width and height greater than 0 or polygon width at least three points), does not apply to importing */
    componentDrawnHandler: (c: Component, id: string) => void; // applies to Editor only
    /** function being called when editor switches to select mode when eg. Esc keydown event or mousedown event on handle is causing it to leave draw mode */
    selectModeHandler: () => void; // applies to Editor only
    /** when using view this function will be called on click events from the shapes */
    viewClickHandler: (e: Event, id: string) => void; // applies to View only
};

/**
 * An Editor or View containing everything needed by the drawing/display board: DOM, event listeners, state and API functions.
 *
 * @param {string|SVGElement} svgEl - the id of the SVG element to be created or the SVG element itself if it's already made
 * @param {object} [options]
 * @param {object} [style] - see {@link Editor#setStyle}
 */
export class Editor {
    width: EditorOptions["width"];
    height: EditorOptions["height"];
    componentDrawnHandler?: EditorOptions["componentDrawnHandler"];
    selectModeHandler?: EditorOptions["selectModeHandler"];
    viewClickHandler?: EditorOptions["viewClickHandler"];

    svg!: SVGSVGElement;
    cgroup: SVGGElement;
    hgroup: SVGGElement;
    style: ReturnType<typeof getDefaultStyle>;

    fsmService: Actor<ActorLogic<any, any, any, any>>;

    _cacheElementMapping: Record<string, Component | Handle | undefined>;
    _idCounter: number;
    _handleIdCounter: number;

    constructor(
        svgEl: SVGElement | string,
        options: Partial<EditorOptions> = {},
        style: Partial<ReturnType<typeof getDefaultStyle>> = {}
    ) {
        this.width = options.width ?? 1200;
        this.height = options.height ?? 600;
        this.componentDrawnHandler = options.componentDrawnHandler;
        this.selectModeHandler = options.selectModeHandler;
        this.viewClickHandler = options.viewClickHandler;

        this.style = deepMerge.withOptions(
            { allowUndefinedOverrides: false },
            getDefaultStyle(),
            style
        ) as ReturnType<typeof getDefaultStyle>;

        this.fsmService = createFSMService(this).start();

        if (svgEl instanceof SVGSVGElement) {
            this.svg = svgEl;
        } else if (typeof svgEl === "string" || svgEl instanceof String) {
            const svgElById: SVGSVGElement | null = doc.querySelector(`#${svgEl}`);
            if (svgElById) {
                this.svg = svgElById;
            } else {
                this.svg = doc.createElementNS<"svg">(SVG_NS, "svg");
                this.svg.setAttribute("version", "1.1");
                this.svg.setAttribute("id", svgEl as string);
                // this.svg.setAttribute("shape-rendering", "crispEdges");

                this.svg.setAttribute("width", String(this.width));
                this.svg.setAttribute("height", String(this.height));
                this.svg.setAttribute("viewBox", `0, 0, ${this.width} ${this.height}`);
                this.svg.setAttribute("preserveAspectRatio", "xMinYMin");

                const svg = this.svg;
                window.addEventListener(
                    "load",
                    function load() {
                        doc.body.appendChild(svg);
                    },
                    { once: true }
                );
            }
        }

        this.cgroup = doc.createElementNS<"g">(SVG_NS, "g");
        this.hgroup = doc.createElementNS<"g">(SVG_NS, "g");
        this.svg.appendChild(this.cgroup);
        this.svg.appendChild(this.hgroup);

        this._cacheElementMapping = onChange(
            {},
            (_prop, newComponent: Component | Handle, prevComponent: Component | Handle) => {
                if (newComponent) {
                    if (newComponent instanceof Handle) {
                        this.hgroup.appendChild(newComponent.element);
                    } else {
                        this.cgroup.appendChild(newComponent.element);
                    }
                } else {
                    if (prevComponent instanceof Handle) {
                        this.hgroup.removeChild(prevComponent.element);
                    } else {
                        this.cgroup.removeChild(prevComponent.element);
                        prevComponent.getHandles().forEach(h => {
                            this.unregisterComponent(h);
                        });
                    }
                }
            }
        );
        this._idCounter = 1;
        this._handleIdCounter = 1;
    }
    // end constructor

    /**
     * Add an image element into the SVG element.
     *
     * @param {string} path
     * @param {number|string} [width]
     * @param {number|string} [height]
     * @returns {Editor}
     */
    loadImage(path: string, width: string | number, height: string | number) {
        const image = doc.createElementNS(SVG_NS, "image");
        image.setAttributeNS(XLINK_NS, "href", path);
        width != null && image.setAttribute("width", String(width));
        height != null && image.setAttribute("height", String(height));
        this.svg.prepend(image);
        return this;
    }

    /**
     * Completely or partly set current style of components, handles, hovering etc.
     *
     * @param {object} style
     * @returns {Editor}
     *
     * @example
     * ```js
     * editor.setStyle({
     *   component: {
     *     fill: 'rgb(102, 102, 102)',
     *     stroke: 'rgb(51, 51, 51)',
     *   },
     *   componentHover: {
     *     off: {
     *       'stroke-width': 1,
     *       opacity: 0.5,
     *     },
     *     on: {
     *       'stroke-width': 2,
     *       opacity: 0.6,
     *     },
     *   },
     *   componentSelect: {
     *     off: {
     *       'stroke-dasharray': 'none',
     *       'stroke-linejoin': 'miter',
     *     },
     *     on: {
     *       'stroke-dasharray': '4 3',
     *       'stroke-linejoin': 'round',
     *     },
     *   },
     *   handle: {
     *     fill: 'rgb(255, 255, 255)',
     *     stroke: 'rgb(51, 51, 51)',
     *     'stroke-width': 1,
     *     opacity: 0.3,
     *   },
     *   handleHover: {
     *     opacity: 0.6,
     *   },
     * });
     * ```
     */
    setStyle(style: Partial<ReturnType<typeof getDefaultStyle>>) {
        this.style = deepMerge.withOptions(
            { allowUndefinedOverrides: false },
            this.style,
            style
        ) as ReturnType<typeof getDefaultStyle>;
        return this;
    }

    /**
     * Put editor in draw mode of rectangles.
     */
    rect() {
        this.fsmService.send({ type: "MODE_DRAW_RECT" });
    }

    /**
     * Put editor in draw mode of circles.
     */
    circle() {
        this.fsmService.send({ type: "MODE_DRAW_CIRCLE" });
    }

    /**
     * Put editor in draw mode of ellipses.
     */
    ellipse() {
        this.fsmService.send({ type: "MODE_DRAW_ELLIPSE" });
    }

    /**
     * Put editor in draw mode of polygons.
     */
    polygon() {
        this.fsmService.send({ type: "MODE_DRAW_POLYGON" });
    }

    /**
     * Put editor in select mode.
     */
    selectMode() {
        this.fsmService.send({ type: "MODE_SELECT" });
    }

    /**
     * @param {string} id
     * @returns {Rectangle|Circle|Ellipse|Polygon}
     */
    getComponentById(id: string) {
        return this._cacheElementMapping && this._cacheElementMapping[id];
    }

    /**
     * Make programmatically selection of a component which basically enables its handles by making them visible.
     * Please note that all components will be unselected when leaving select mode or leaving draw mode.
     *
     * @param {string|Rectangle|Circle|Ellipse|Polygon} componentOrId - a component or a component id
     * @returns {Rectangle|Circle|Ellipse|Polygon|null}
     */
    selectComponent(componentOrId?: string | Component | Handle) {
        let component: Component | Handle | null | undefined;
        if (typeof componentOrId === "string" || componentOrId instanceof String) {
            component = this.getComponentById(componentOrId as string);
        } else {
            component = componentOrId;
        }

        Object.values(this._cacheElementMapping).forEach(c => {
            if (c instanceof Component) {
                if (c === component) {
                    c.setIsSelected(true);
                }
                if (c !== component && !c.isFrozen) {
                    c.setIsSelected(false);
                }
            }
        });

        return component instanceof Component ? component : null;
    }

    /**
     * Remove a component (shape) from the editor or view.
     *
     * @param {string|Rectangle|Circle|Ellipse|Polygon} componentOrId - a component or a component id
     * @returns {Rectangle|Circle|Ellipse|Polygon|null}
     */
    removeComponent(componentOrId: string | Component) {
        let component: Component | Handle | undefined | null;
        if (typeof componentOrId === "string" || componentOrId instanceof String) {
            component = this.getComponentById(componentOrId as string);
        } else {
            component = componentOrId;
        }

        if (component instanceof Component) {
            this.unregisterComponent(component);
            return component;
        }
        return null;
    }

    /**
     * Add event listener(s).
     *
     * @param {string} eventTypes
     * @param {EventListenerOrEventListenerObject} handler
     * @returns {Editor}
     */
    on(eventTypes: string, handler: EventListenerOrEventListenerObject) {
        addEventListeners(this.svg, eventTypes, handler);
        return this;
    }

    /**
     * Remove event listener(s).
     *
     * @param {string} eventTypes
     * @param {EventListenerOrEventListenerObject} handler
     * @returns {Editor}
     */
    off(eventTypes: string, handler: EventListenerOrEventListenerObject) {
        removeEventListeners(this.svg, eventTypes, handler);
        return this;
    }

    /**
     * @callback idInterceptor
     * @param {string} id - the id to be modified
     */

    /**
     * Import shapes from JSON.
     *
     * @param {string} data
     * @param {idInterceptor} [idInterceptor] - function to change the imported id to avoid name conflicts, eg. in case user decides to import multiple times or import _after_ drawing
     * @returns {Array.<Rectangle|Circle|Ellipse|Polygon>}
     *
     * @example
     * ```js
     * {
     *   "components": [{
     *     "id": "circle_1",
     *     "type": "circle",
     *     "data": {
     *       "x": 444,
     *       "y": 71,
     *       "width": 241,
     *       "height": 211
     *     }
     *   }]
     * }
     * ```
     *
     * @example
     * ```js
     * {
     *   "components": [{
     *     "id": "rect_1",
     *     "type": "rect",
     *     "data": {
     *       "x": 444,
     *       "y": 71,
     *       "width": 241,
     *       "height": 211
     *     }
     *   }]
     * }
     * ```
     *
     * @example
     * ```js
     * {
     *   "components": [{
     *     "id": "ellipse_1",
     *     "type": "ellipse",
     *     "data": {
     *       "x": 444,
     *       "y": 71,
     *       "width": 241,
     *       "height": 211
     *     }
     *   }]
     * }
     * ```
     *
     * @example
     * ```js
     * {
     *   "components": [{
     *     "id": "polygon_1",
     *     "type": "polygon",
     *     "data": [{
     *       "x": 603,
     *       "y": 114
     *     }, {
     *       "x": 625,
     *       "y": 203
     *     }, {
     *       "x": 699,
     *       "y": 124
     *     }]
     *   }]
     * }
     * ```
     */
    import(data: string, idInterceptor: (id: string) => string) {
        const jsData = JSON.parse(data);
        this._idCounter = jsData.idCounter;

        return jsData.components
            .map(
                (
                    c:
                        | {
                              id: string;
                              type: "circle" | "rect" | "ellipse";
                              data: Dim;
                          }
                        | {
                              id: string;
                              type: "polygon";
                              data: Point[] | Point;
                          }
                        | any
                ) => {
                    const id = idInterceptor ? idInterceptor(c.id) : c.id;

                    switch (c.type) {
                        case "rect":
                            return this.createRectangle(c.data, id); // c.data = dim object
                        case "circle":
                            return this.createCircle(c.data, id); // c.data = dim object
                        case "ellipse":
                            return this.createEllipse(c.data, id); // c.data = dim object
                        case "polygon":
                            return this.createPolygon(c.data, id); // c.data = array of points
                        default:
                            console.error("Unknown type", c.type);
                            return null;
                    }
                }
            )
            .filter(isNotNull);
    }

    /**
     * Export drawn shapes as JSON.
     *
     * @param {boolean} [escape] - whether double quotes should be escaped
     * @returns {string} - JSON data
     */
    export(escape?: boolean) {
        const componentMappings = Object.entries(this._cacheElementMapping).filter(
            ([, component]) => component instanceof Component
        ) as [string, Component][];

        const data = {
            idCounter: this._idCounter,
            components: componentMappings.map(([id, component]) => ({
                id,
                type: component.element.tagName,
                data: component.export(),
            })),
        };

        const result = JSON.stringify(data);
        return escape ? result.replace(/[\"]/g, '\\"') : result;
    }

    createRectangle(dim: Dim, id?: string) {
        const { x, y, width, height } = dim;
        return this.registerComponent(
            new Rectangle(this, x, y, width, height).setStyle(this.style),
            id
        );
    }

    createCircle(dim: Dim, id?: string) {
        const { x, y, width, height } = dim;
        return this.registerComponent(
            new Circle(this, x, y, width, height).setStyle(this.style),
            id
        );
    }

    createEllipse(dim: Dim, id?: string) {
        const { x, y, width, height } = dim;
        return this.registerComponent(
            new Ellipse(this, x, y, width, height).setStyle(this.style),
            id
        );
    }

    createPolygon(points: Point[] | Point, id?: string) {
        return this.registerComponent(new Polygon(this, points).setStyle(this.style), id);
    }

    registerComponent<T extends Component | Handle>(component: T, id?: string) {
        if (component instanceof Handle) {
            id = "handle_" + this._handleIdCounter++;
        } else {
            id = id || component.element.tagName + "_" + this._idCounter++;
        }

        this._cacheElementMapping[id] = component;
        component.element.id = id;
        return component;
    }

    registerComponentHandle(handle: Handle) {
        return this.registerComponent(handle.setStyle(this.style.handle, this.style.handleHover));
    }

    unregisterComponent(component: Component | Handle) {
        component instanceof Component && component._logWarnOnOpOnFrozen("Deleting");

        this._cacheElementMapping[component.element.id] = undefined; // tell observer
        delete this._cacheElementMapping[component.element.id];
    }
}

const addEditorListeners = (editor: Editor) => {
    let prevTouch: Touch | undefined; // used by touchmove

    addEventListeners(editor.svg, "mousedown touchstart", e => {
        e.preventDefault(); // avoid both mouse and touch event on devices firing both

        const storedComponent = editor.getComponentById((e.target as SVGElement)?.id);
        const componentTarget =
            storedComponent && storedComponent.isFrozen ? undefined : storedComponent;

        const mouseEvent = e instanceof MouseEvent ? e : null;
        const touchEvent = e instanceof TouchEvent ? e : null;

        const touchBCR = editor.svg.getBoundingClientRect();
        const touch = touchEvent?.targetTouches[0];

        editor.fsmService.send({
            type: "MT_DOWN",
            component: componentTarget, // not defined when mousedown on editor
            offsetX: mouseEvent?.offsetX ?? (touch && touch.clientX - touchBCR.x) ?? 0,
            offsetY: mouseEvent?.offsetY ?? (touch && touch.clientY - touchBCR.y) ?? 0,
        });

        prevTouch = touch;
    });

    addEventListeners(editor.svg, "mouseup touchend mouseleave touchleave", e => {
        e.preventDefault(); // avoid both mouse and touch event on devices firing both

        editor.fsmService.send({
            type: "MT_UP",
        });

        prevTouch = undefined;
    });

    addEventListeners(editor.svg, "mousemove touchmove", e => {
        const mouseEvent = e instanceof MouseEvent ? e : null;
        const touchEvent = e instanceof TouchEvent ? e : null;

        const touchBCR = editor.svg.getBoundingClientRect();
        const touch = touchEvent?.targetTouches[0];

        editor.fsmService.send({
            type: "MT_MOVE",
            offsetX: mouseEvent?.offsetX ?? (touch && touch.clientX - touchBCR.x) ?? 0,
            offsetY: mouseEvent?.offsetY ?? (touch && touch.clientY - touchBCR.y) ?? 0,
            movementX:
                mouseEvent?.movementX != null
                    ? mouseEvent.movementX
                    : prevTouch && touch
                    ? touch.clientX - prevTouch.clientX
                    : 0,
            movementY:
                mouseEvent?.movementY != null
                    ? mouseEvent.movementY
                    : prevTouch && touch
                    ? touch.clientY - prevTouch.clientY
                    : 0,
        });

        prevTouch = touch;
    });

    addEventListeners(window, "keydown", event => {
        const e = event as KeyboardEvent;
        switch (e.key) {
            case "Escape":
                editor.fsmService.send({ type: "KEYDOWN_ESC" });
                break;
            case "Delete":
                editor.fsmService.send({ type: "KEYDOWN_DEL" });
                break;
            case "ArrowUp":
                e.preventDefault();
                editor.fsmService.send({
                    type: "KEYDOWN_ARROW",
                    movementX: 0,
                    movementY: -1,
                });
                break;
            case "ArrowDown":
                e.preventDefault();
                editor.fsmService.send({
                    type: "KEYDOWN_ARROW",
                    movementX: 0,
                    movementY: 1,
                });
                break;
            case "ArrowLeft":
                e.preventDefault();
                editor.fsmService.send({
                    type: "KEYDOWN_ARROW",
                    movementX: -1,
                    movementY: 0,
                });
                break;
            case "ArrowRight":
                e.preventDefault();
                editor.fsmService.send({
                    type: "KEYDOWN_ARROW",
                    movementX: 1,
                    movementY: 0,
                });
                break;
        }
    });

    return editor;
};

const addViewListeners = (view: Editor) => {
    addEventListeners(view.cgroup, "click touchstart", e => {
        e.preventDefault(); // avoid both touch and pointer event on devices firing both

        view.viewClickHandler && view.viewClickHandler(e, (e.target as SVGElement)?.id);
    });

    return view;
};

export default (isView?: boolean) => {
    return function EditorConstructor(...params: ConstructorParameters<typeof Editor>) {
        return isView
            ? addViewListeners(new Editor(...params))
            : addEditorListeners(new Editor(...params));
    };
};
