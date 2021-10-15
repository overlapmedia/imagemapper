import { createCornerShapedComponentConstructor } from './factory.js';

const Ellipse = createCornerShapedComponentConstructor('ellipse', {
  // move
  x: function (x, prevX, dim) {
    this.element.setAttribute('cx', x + dim.width / 2);
  },
  // move
  y: function (y, prevY, dim) {
    this.element.setAttribute('cy', y + dim.height / 2);
  },
  // resize
  width: function (width, prevWidth, dim) {
    this.element.setAttribute('rx', Math.abs(width) / 2);
    this.element.setAttribute('cx', dim.x + width / 2);
  },
  // resize
  height: function (height, prevHeight, dim) {
    this.element.setAttribute('ry', Math.abs(height) / 2);
    this.element.setAttribute('cy', dim.y + height / 2);
  },
});

export { Ellipse };
