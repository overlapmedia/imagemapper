const addEventListeners = function (targets, eventTypes, handler) {
  [targets].flat().forEach((target) => {
    eventTypes.split(' ').forEach((eventType) => {
      target.addEventListener(eventType, handler, {
        passive: false,
      });
    });
  });
};

const removeEventListeners = function (targets, eventTypes, handler) {
  [targets].flat().forEach((target) => {
    eventTypes.split(' ').forEach((eventType) => {
      target.removeEventListener(eventType, handler);
    });
  });
};

export { addEventListeners, removeEventListeners };
