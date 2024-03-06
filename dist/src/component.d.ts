import { Editor } from "./editor";
import { Handle } from "./handle";
import { getDefaultStyle } from "./style";
export declare abstract class Component {
    readonly editorOwner: Editor;
    readonly element: SVGElement;
    style: ReturnType<typeof getDefaultStyle>;
    isSelected: boolean;
    isFrozen: boolean;
    constructor(editorOwner: Editor, element: SVGElement);
    abstract freeze(freeze?: boolean): Component;
    abstract isValid(): boolean;
    abstract move(deltaX: number, deltaY: number): Component;
    abstract setHandlesVisibility(visible?: boolean): Component;
    abstract setIsSelected(selected?: boolean): Component;
    abstract getHandles(): Handle[];
    abstract setStyle(style: ReturnType<typeof getDefaultStyle>): Component;
    abstract export(): object;
    _logWarnOnOpOnFrozen(op: string): void;
}
