import { SVG_NS } from './constants.js';
import { doc } from './globals.js';
import { Handle } from './handle.js';
import { eventEmitter } from './events.js';
import { onChange } from './onChangeProxy.js';
import { addHover, setStyle } from './style.js';

function Polygon(x, y) {
  this.element = doc.createElementNS(SVG_NS, 'polygon');
  this.points = [];
  this.addPoint(x, y);
}

Polygon.prototype.updateElementPoints = function () {
  this.element.setAttribute('points', this.points.map((p) => `${p.x},${p.y}`).join(' '));
  return this;
};

Polygon.prototype.addPoint = function (x, y) {
  const point = { x, y };
  const pointProxy = onChange(point, (prop, newValue, prevValue, obj) => {
    this.updateElementPoints();
    obj.handle['setAttr' + prop.toUpperCase()](newValue);
  });

  // don't observe handle assignment
  point.handle = new Handle(x, y, (deltaX, deltaY) => {
    pointProxy.x += deltaX;
    pointProxy.y += deltaY;
  });
  eventEmitter.emit('registerHandle', point.handle);

  this.points.push(pointProxy);
  this.updateElementPoints();

  return this;
};

Polygon.prototype.moveLastPoint = function (x, y) {
  const lastPoint = this.points[this.points.length - 1];
  [lastPoint.x, lastPoint.y] = [x, y];
  return this;
};

// TODO: move by transform:translate instead?
Polygon.prototype.move = function (deltaX, deltaY) {
  this.points.forEach((p) => {
    p.x += deltaX;
    p.y += deltaY;
  });
  return this;
};

Polygon.prototype.isValid = function () {
  return this.points.length >= 3;
};

Polygon.prototype.setHandlesVisibility = function (visible) {
  this.points.forEach((p) => p.handle.setVisible(visible));
  return this;
};

Polygon.prototype.setIsSelected = function (isSelected) {
  this.setHandlesVisibility(isSelected);
  return this;
};

Polygon.prototype.getHandles = function () {
  return this.points.map((p) => p.handle);
};

Polygon.prototype.setStyle = function (style, hoverStyle) {
  setStyle(this.element, style);
  addHover(this.element, style, hoverStyle);
  return this;
};

export { Polygon };
