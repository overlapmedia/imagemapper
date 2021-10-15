import { addEventListeners } from './events.js';

const componentDefault = {
  fill: 'rgb(102, 102, 102)',
  stroke: 'rgb(51, 51, 51)',
  cursor: 'pointer',
};

const componentHoverDefault = {
  off: {
    'stroke-width': 1,
    opacity: 0.5,
  },
  on: {
    'stroke-width': 2,
    opacity: 0.6,
  },
};

// TODO: should not be overridden by unhovering
const componentSelectDefault = {
  off: {
    'stroke-dasharray': 'none', // alt. 'initial'
    'stroke-linejoin': 'miter',
  },
  on: {
    'stroke-dasharray': '4 3',
    'stroke-linejoin': 'round',
  },
};

const handleDefault = {
  fill: 'rgb(255, 255, 255)',
  stroke: 'rgb(51, 51, 51)',
  'stroke-width': 1,
  opacity: 0.3,
  cursor: 'pointer',
};

const handleHoverDefault = {
  opacity: 0.6,
};

const getDefaultStyle = () => ({
  component: Object.assign({}, componentDefault),
  componentHover: Object.assign({}, componentHoverDefault),
  componentSelect: Object.assign({}, componentSelectDefault),
  handle: Object.assign({}, handleDefault),
  handleHover: Object.assign({}, handleHoverDefault),
});

const setStyle = (element, style) =>
  Object.entries(style).forEach(([attr, value]) => element.setAttribute(attr, value));

const addHover = (element, defaultStyle, hoverStyle) => {
  addEventListeners(element, 'mouseenter touchstart', () => setStyle(element, hoverStyle));
  addEventListeners(element, 'mouseleave touchend touchleave', () =>
    setStyle(element, defaultStyle),
  );
};

export { getDefaultStyle, setStyle, addHover };
