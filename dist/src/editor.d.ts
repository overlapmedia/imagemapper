import { Point, Polygon } from "./polygon";
import { Rectangle } from "./rect";
import { Circle } from "./circle";
import { Ellipse } from "./ellipse";
import { Handle } from "./handle";
import { getDefaultStyle } from "./style";
import { Component } from "./component";
import { Actor, ActorLogic } from "xstate";
import { Dim } from "./factory";
export type EditorOptions = {
    /** if you let imagemapper create the SVGElement for you, you could specify width for it here */
    width: number;
    /** if you let imagemapper create the SVGElement for you, you could specify height for it here */
    height: number;
    /** function being called when finished drawing a valid component (eg. rectangle with width and height greater than 0 or polygon width at least three points), does not apply to importing */
    componentDrawnHandler: (c: Component, id: string) => void;
    /** function being called when editor switches to select mode when eg. Esc keydown event or mousedown event on handle is causing it to leave draw mode */
    selectModeHandler: () => void;
    /** when using view this function will be called on click events from the shapes */
    viewClickHandler: (e: Event, id: string) => void;
};
/**
 * An Editor or View containing everything needed by the drawing/display board: DOM, event listeners, state and API functions.
 *
 * @param {string|SVGElement} svgEl - the id of the SVG element to be created or the SVG element itself if it's already made
 * @param {object} [options]
 * @param {object} [style] - see {@link Editor#setStyle}
 */
export declare class Editor {
    width: EditorOptions["width"];
    height: EditorOptions["height"];
    componentDrawnHandler?: EditorOptions["componentDrawnHandler"];
    selectModeHandler?: EditorOptions["selectModeHandler"];
    viewClickHandler?: EditorOptions["viewClickHandler"];
    svg: SVGSVGElement;
    cgroup: SVGGElement;
    hgroup: SVGGElement;
    style: ReturnType<typeof getDefaultStyle>;
    fsmService: Actor<ActorLogic<any, any, any, any>>;
    _cacheElementMapping: Record<string, Component | Handle | undefined>;
    _idCounter: number;
    _handleIdCounter: number;
    constructor(svgEl: SVGElement | string, options?: Partial<EditorOptions>, style?: Partial<ReturnType<typeof getDefaultStyle>>);
    /**
     * Add an image element into the SVG element.
     *
     * @param {string} path
     * @param {number|string} [width]
     * @param {number|string} [height]
     * @returns {Editor}
     */
    loadImage(path: string, width: string | number, height: string | number): this;
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
    setStyle(style: Partial<ReturnType<typeof getDefaultStyle>>): this;
    /**
     * Put editor in draw mode of rectangles.
     */
    rect(): void;
    /**
     * Put editor in draw mode of circles.
     */
    circle(): void;
    /**
     * Put editor in draw mode of ellipses.
     */
    ellipse(): void;
    /**
     * Put editor in draw mode of polygons.
     */
    polygon(): void;
    /**
     * Put editor in select mode.
     */
    selectMode(): void;
    /**
     * @param {string} id
     * @returns {Rectangle|Circle|Ellipse|Polygon}
     */
    getComponentById(id: string): Handle | Component | undefined;
    /**
     * Make programmatically selection of a component which basically enables its handles by making them visible.
     * Please note that all components will be unselected when leaving select mode or leaving draw mode.
     *
     * @param {string|Rectangle|Circle|Ellipse|Polygon} componentOrId - a component or a component id
     * @returns {Rectangle|Circle|Ellipse|Polygon|null}
     */
    selectComponent(componentOrId?: string | Component | Handle): Component | null;
    /**
     * Remove a component (shape) from the editor or view.
     *
     * @param {string|Rectangle|Circle|Ellipse|Polygon} componentOrId - a component or a component id
     * @returns {Rectangle|Circle|Ellipse|Polygon|null}
     */
    removeComponent(componentOrId: string | Component): Component | null;
    /**
     * Add event listener(s).
     *
     * @param {string} eventTypes
     * @param {EventListenerOrEventListenerObject} handler
     * @returns {Editor}
     */
    on(eventTypes: string, handler: EventListenerOrEventListenerObject): this;
    /**
     * Remove event listener(s).
     *
     * @param {string} eventTypes
     * @param {EventListenerOrEventListenerObject} handler
     * @returns {Editor}
     */
    off(eventTypes: string, handler: EventListenerOrEventListenerObject): this;
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
    import(data: string, idInterceptor: (id: string) => string): any;
    /**
     * Export drawn shapes as JSON.
     *
     * @param {boolean} [escape] - whether double quotes should be escaped
     * @returns {string} - JSON data
     */
    export(escape?: boolean): string;
    createRectangle(dim: Dim, id?: string): Rectangle;
    createCircle(dim: Dim, id?: string): Circle;
    createEllipse(dim: Dim, id?: string): Ellipse;
    createPolygon(points: Point[] | Point, id?: string): Polygon;
    registerComponent<T extends Component | Handle>(component: T, id?: string): T;
    registerComponentHandle(handle: Handle): Handle;
    unregisterComponent(component: Component | Handle): void;
}
declare const _default: (isView?: boolean) => (svgEl: string | SVGElement, options?: Partial<EditorOptions> | undefined, style?: Partial<{
    component: import("./style").Style;
    componentHover: {
        off: import("./style").Style;
        on: import("./style").Style;
    };
    componentSelect: {
        off: import("./style").Style;
        on: import("./style").Style;
    };
    handle: import("./style").Style;
    handleHover: import("./style").Style;
}> | undefined) => Editor;
export default _default;
