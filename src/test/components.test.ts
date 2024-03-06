import editorFactory from "../editor";
import { SVG_NS } from "../constants";
import { doc } from "../globals";
import { Rectangle } from "../rect";
import { Circle } from "../circle";
import { Ellipse } from "../ellipse";
import { Polygon } from "../polygon";

describe("Components", () => {
    const editorConstr = editorFactory();
    const svgEl = doc.createElementNS(SVG_NS, "svg");
    const editor = editorConstr(svgEl);

    const components = [
        new Rectangle(editor, 0, 0),
        new Circle(editor, 0, 0),
        new Ellipse(editor, 0, 0),
        new Polygon(editor),
    ];

    test("has element", () => {
        components.every(c => expect(c.element).toBeInstanceOf(SVGElement));
    });

    test("has function move", () => {
        components.every(c => expect(typeof c.move).toBe("function"));
    });

    test("has function isValid", () => {
        components.every(c => expect(typeof c.isValid).toBe("function"));
    });

    test("has function setHandlesVisibility", () => {
        components.every(c => expect(typeof c.setHandlesVisibility).toBe("function"));
    });

    test("has function setIsSelected", () => {
        components.every(c => expect(typeof c.setIsSelected).toBe("function"));
    });

    test("has function getHandles", () => {
        components.every(c => expect(typeof c.getHandles).toBe("function"));
    });

    test("has function setStyle", () => {
        components.every(c => expect(typeof c.setStyle).toBe("function"));
    });

    test("has function export", () => {
        components.every(c => expect(typeof c.export).toBe("function"));
    });
});
