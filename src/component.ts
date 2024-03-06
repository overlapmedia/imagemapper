import { Editor } from "./editor";
import { Handle } from "./handle";
import { getDefaultStyle } from "./style";

export abstract class Component {
    style: ReturnType<typeof getDefaultStyle> = getDefaultStyle();
    isSelected = false;
    isFrozen = false;

    constructor(readonly editorOwner: Editor, readonly element: SVGElement) {}

    abstract freeze(freeze?: boolean): Component;

    abstract isValid(): boolean;

    abstract move(deltaX: number, deltaY: number): Component;

    abstract setHandlesVisibility(visible?: boolean): Component;

    abstract setIsSelected(selected?: boolean): Component;

    abstract getHandles(): Handle[];

    abstract setStyle(style: ReturnType<typeof getDefaultStyle>): Component;

    abstract export(): object;

    _logWarnOnOpOnFrozen(op: string) {
        if (this.isFrozen) {
            console.warn(`${op} frozen ${this.element.tagName} with id ${this.element.id}`);
        }
    }
}
