import { Component } from "./component";
import { Editor } from "./editor";
import { Handle } from "./handle";
type Context = {
    unfinishedComponent?: Component;
    mouseDownInSelectModeObject?: Component | Handle;
    _editor: Editor;
};
type MT_DOWN_Event = {
    type: "MT_DOWN";
    component?: Component | Handle;
    offsetX: number;
    offsetY: number;
};
type MT_MOVE_Event = {
    type: "MT_MOVE";
    offsetX: number;
    offsetY: number;
    movementX: number;
    movementY: number;
};
type KEYDOWN_ARROW_Event = {
    type: "KEYDOWN_ARROW";
    movementX: number;
    movementY: number;
};
export type ActorEvent = MT_DOWN_Event | MT_MOVE_Event | KEYDOWN_ARROW_Event | {
    type: "MT_UP" | "KEYDOWN_ESC" | "KEYDOWN_DEL" | "MODE_SELECT" | "MODE_DRAW_RECT" | "MODE_DRAW_CIRCLE" | "MODE_DRAW_ELLIPSE" | "MODE_DRAW_POLYGON" | "mouseDownInSelectModeUnassign";
};
declare const createFSMService: (editor: Editor) => import("xstate").Actor<import("xstate").StateMachine<Context, import("xstate").AnyEventObject, Record<string, import("xstate").AnyActorRef>, import("xstate").ProvidedActor, import("xstate").ParameterizedObject, import("xstate").ParameterizedObject, string, import("xstate").StateValue, string, unknown, import("xstate").NonReducibleUnknown, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, import("xstate").AnyEventObject, import("xstate").ProvidedActor, import("xstate").ParameterizedObject, import("xstate").ParameterizedObject, string, string>>>;
export default createFSMService;
