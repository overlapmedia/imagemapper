import { createCornerShapedComponentConstructor } from './factory.js';

const Rectangle = createCornerShapedComponentConstructor('rect', {
  // move
  x: function (x, prevX, dim) {
    this.element.setAttribute('x', dim.width < 0 ? x + dim.width : x);
  },
  // move
  y: function (y, prevY, dim) {
    this.element.setAttribute('y', dim.height < 0 ? y + dim.height : y);
  },
  // resize
  width: function (width, prevWidth, dim) {
    this.element.setAttribute('width', Math.abs(width));
    this.element.setAttribute('x', width < 0 ? dim.x + width : dim.x);
  },
  // resize
  height: function (height, prevHeight, dim) {
    this.element.setAttribute('height', Math.abs(height));
    this.element.setAttribute('y', height < 0 ? dim.y + height : dim.y);
  },
});

export { Rectangle };
