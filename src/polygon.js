import { SVG_NS } from './constants.js';
import { doc } from './globals.js';
import { Handle } from './handle.js';
import { eventEmitter } from './events.js';
import { onChange } from './onChangeProxy.js';
import { addHover, setStyle } from './style.js';

function Polygon(points) {
  this.element = doc.createElementNS(SVG_NS, 'polygon');
  this.points = []; // proxied points
  points && [points].flat().forEach((p) => this.addPoint(p.x, p.y));

  this.style = {};
  this.isSelected = false;
  this.isFrozen = false;
}

Polygon.prototype.freeze = function (freeze) {
  this.isFrozen = freeze !== undefined ? !!freeze : true;
  this.getHandles().forEach((handle) => handle.freeze(freeze));
  return this;
};

Polygon.prototype.updateElementPoints = function () {
  this.element.setAttribute('points', this.points.map((p) => `${p.x},${p.y}`).join(' '));
  return this;
};

Polygon.prototype.addPoint = function (x, y) {
  const point = { x, y };
  const pointProxy = onChange(point, (prop, newValue, prevValue, obj) => {
    this._logWarnOnOpOnFrozen('Point moved on');
    this.updateElementPoints();
    obj.handle['setAttr' + prop.toUpperCase()](newValue);
  });

  // don't observe handle assignment
  point.handle = new Handle(
    x,
    y,
    (deltaX, deltaY) => {
      pointProxy.x += deltaX;
      pointProxy.y += deltaY;
    },
    this.isFrozen,
  );
  eventEmitter.emit('registerHandle', point.handle);

  this.points.push(pointProxy);
  this.updateElementPoints();

  this.setIsSelected(this.isSelected); // to apply visibility/style to new handle

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
  this.getHandles().forEach((handle) => handle.setVisible(visible));
  return this;
};

Polygon.prototype.setIsSelected = function (isSelected) {
  this._logWarnOnOpOnFrozen('Select/unselect performed on');

  this.isSelected = isSelected = isSelected !== undefined ? !!isSelected : true;
  this.setHandlesVisibility(isSelected);
  this.style &&
    setStyle(
      this.element,
      isSelected ? this.style.componentSelect.on : this.style.componentSelect.off,
    );
  return this;
};

Polygon.prototype.getHandles = function () {
  return this.points.map((p) => p.handle);
};

Polygon.prototype.setStyle = function (style) {
  this.style = style;
  setStyle(this.element, style.component);
  setStyle(this.element, style.componentHover.off);
  setStyle(this.element, style.componentSelect.off);

  addHover(this.element, style.componentHover.off, style.componentHover.on);
  return this;
};

Polygon.prototype.export = function () {
  return this.points.map((p) => ({ x: p.x, y: p.y }));
};

Polygon.prototype._logWarnOnOpOnFrozen = function (op) {
  if (this.isFrozen) {
    console.warn(`${op} frozen ${this.element.tagName} with id ${this.element.id}`);
  }
};

export { Polygon };
