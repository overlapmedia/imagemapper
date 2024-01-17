import { addEventListeners } from "./events";

// export type Style = Partial<ElementCSSInlineStyle["style"]>;
export type Style = Record<string, string>;

const componentDefault: Style = {
    fill: "rgb(102, 102, 102)",
    stroke: "rgb(51, 51, 51)",
    cursor: "pointer",
};

const componentHoverDefault: {
    off: Style;
    on: Style;
} = {
    off: {
        strokeWidth: "1",
        opacity: "0.5",
    },
    on: {
        strokeWidth: "2",
        opacity: "0.6",
    },
};

// TODO: should not be overridden by unhovering
const componentSelectDefault: {
    off: Style;
    on: Style;
} = {
    off: {
        strokeDasharray: "none", // alt. 'initial'
        strokeLinejoin: "miter",
    },
    on: {
        strokeDasharray: "4 3",
        strokeLinejoin: "round",
    },
};

const handleDefault: Style = {
    fill: "rgb(255, 255, 255)",
    stroke: "rgb(51, 51, 51)",
    strokeWidth: "1",
    opacity: "0.3",
    cursor: "pointer",
};

const handleHoverDefault: Style = {
    opacity: "0.6",
};

const getDefaultStyle = () => ({
    component: Object.assign({}, componentDefault),
    componentHover: Object.assign({}, componentHoverDefault),
    componentSelect: Object.assign({}, componentSelectDefault),
    handle: Object.assign({}, handleDefault),
    handleHover: Object.assign({}, handleHoverDefault),
});

const setStyle = (element: Element, style: Style) =>
    Object.entries(style).forEach(([attr, value]) => element.setAttribute(attr, value));

const addHover = (element: Element, defaultStyle: Style, hoverStyle: Style) => {
    addEventListeners(element, "mouseenter touchstart", () => setStyle(element, hoverStyle));
    addEventListeners(element, "mouseleave touchend touchleave", () =>
        setStyle(element, defaultStyle)
    );
};

export { getDefaultStyle, setStyle, addHover };
