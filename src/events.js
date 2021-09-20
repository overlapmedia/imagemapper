import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

// TODO: Will both mouse and touch events trigger on touch screens? Use jQuery instead?
const addEventListeners = function (targets, eventTypes, handler) {
  [targets].flat().forEach((target) => {
    eventTypes.split(' ').forEach((eventType) => {
      target.addEventListener(eventType, handler, {
        passive: true,
      });
    });
  });
};

export { addEventListeners, eventEmitter };
