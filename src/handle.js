import { SVG_NS } from './constants.js';
import { doc } from './globals.js';
import { addHover, setStyle } from './style.js';

function Handle(x, y, moveHandler, frozen) {
  this.moveHandler = moveHandler;

  this.element = doc.createElementNS(SVG_NS, 'circle');
  this.element.setAttribute('cx', x);
  this.element.setAttribute('cy', y);
  this.element.setAttribute('r', 5);
  this.element.setAttribute('visibility', 'hidden');

  this.isFrozen = frozen !== undefined ? !!frozen : false;
}

Handle.prototype.freeze = function (freeze) {
  this.isFrozen = freeze !== undefined ? !!freeze : true;
  this.isFrozen && this.setVisible(false);
  return this;
};

Handle.prototype.setAttrX = function (value) {
  this.element.setAttribute('cx', value);
  return this;
};

Handle.prototype.setAttrY = function (value) {
  this.element.setAttribute('cy', value);
  return this;
};

Handle.prototype.move = function (deltaX, deltaY) {
  this.moveHandler(deltaX, deltaY);
  return this;
};

Handle.prototype.setVisible = function (visible) {
  visible = visible !== undefined ? !!visible : true;
  this.element.setAttribute('visibility', visible ? 'visible' : 'hidden');
  return this;
};

Handle.prototype.setStyle = function (style, hoverStyle) {
  setStyle(this.element, style);
  addHover(this.element, style, hoverStyle);
  return this;
};

export { Handle };
