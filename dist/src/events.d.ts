declare const addEventListeners: (targets: Element[] | Element | (Window & typeof globalThis), eventTypes: string, handler: EventListenerOrEventListenerObject) => void;
declare const removeEventListeners: (targets: Element[] | Element | (Window & typeof globalThis), eventTypes: string, handler: EventListenerOrEventListenerObject) => void;
export { addEventListeners, removeEventListeners };
