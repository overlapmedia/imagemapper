export type Style = Record<string, string>;
declare const getDefaultStyle: () => {
    component: Style;
    componentHover: {
        off: Style;
        on: Style;
    };
    componentSelect: {
        off: Style;
        on: Style;
    };
    handle: Style;
    handleHover: Style;
};
declare const setStyle: (element: Element, style: Style) => void;
declare const addHover: (element: Element, defaultStyle: Style, hoverStyle: Style) => void;
export { getDefaultStyle, setStyle, addHover };
