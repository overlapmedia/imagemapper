import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

const addEventListeners = function (targets, eventTypes, handler) {
  [targets].flat().forEach((target) => {
    eventTypes.split(' ').forEach((eventType) => {
      target.addEventListener(eventType, handler, {
        passive: true,
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

export { addEventListeners, removeEventListeners, eventEmitter };
