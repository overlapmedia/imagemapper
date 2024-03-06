const addEventListeners = function (
    targets: Element[] | Element | (Window & typeof globalThis),
    eventTypes: string,
    handler: EventListenerOrEventListenerObject
) {
    [targets].flat().forEach(target => {
        eventTypes.split(" ").forEach(eventType => {
            target.addEventListener(eventType, handler, {
                passive: false,
            });
        });
    });
};

const removeEventListeners = function (
    targets: Element[] | Element | (Window & typeof globalThis),
    eventTypes: string,
    handler: EventListenerOrEventListenerObject
) {
    [targets].flat().forEach(target => {
        eventTypes.split(" ").forEach(eventType => {
            target.removeEventListener(eventType, handler);
        });
    });
};

export { addEventListeners, removeEventListeners };
