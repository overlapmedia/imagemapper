import { SVG_NS } from './constants.js';
import { doc } from './globals.js';
import { Handle } from './handle.js';
import { eventEmitter } from './events.js';
import { onChange } from './onChangeProxy.js';
import { addHover, setStyle } from './style.js';

const createCornerShapedComponentConstructor = (svgElementName, propChangeListener) => {
  const CornerShapedElement = function (x, y) {
    this.element = doc.createElementNS(SVG_NS, svgElementName);
    this.dim = onChange(
      { x, y, width: 0, height: 0 },
      {
        /*
          this.handles[]
          index location:

            0_______2
             |     |
             |_____|
            1       3
        */
        // move
        x: function (x, prevX, dim) {
          propChangeListener.x.call(this, ...arguments);
          this.handles[0].setAttrX(x);
          this.handles[1].setAttrX(x);
          this.handles[2].setAttrX(x + dim.width);
          this.handles[3].setAttrX(x + dim.width);
        },
        // move
        y: function (y, prevY, dim) {
          propChangeListener.y.call(this, ...arguments);
          this.handles[0].setAttrY(y);
          this.handles[1].setAttrY(y + dim.height);
          this.handles[2].setAttrY(y);
          this.handles[3].setAttrY(y + dim.height);
        },
        // resize
        width: function (width, prevWidth, dim) {
          propChangeListener.width.call(this, ...arguments);
          this.handles[2].setAttrX(dim.x + width);
          this.handles[3].setAttrX(dim.x + width);
        },
        // resize
        height: function (height, prevHeight, dim) {
          propChangeListener.height.call(this, ...arguments);
          this.handles[1].setAttrY(dim.y + height);
          this.handles[3].setAttrY(dim.y + height);
        },
      },
      this,
    );

    this.handles = [
      new Handle(x, y, (deltaX, deltaY) => {
        this.dim.x += deltaX;
        this.dim.width -= deltaX;

        this.dim.y += deltaY;
        this.dim.height -= deltaY;
      }),
      new Handle(x, y, (deltaX, deltaY) => {
        this.dim.x += deltaX;
        this.dim.width -= deltaX;

        this.dim.height += deltaY;
      }),
      new Handle(x, y, (deltaX, deltaY) => {
        this.dim.width += deltaX;

        this.dim.y += deltaY;
        this.dim.height -= deltaY;
      }),
      new Handle(x, y, (deltaX, deltaY) => {
        this.dim.width += deltaX;
        this.dim.height += deltaY;
      }),
    ];
    this.handles.forEach((h) => {
      eventEmitter.emit('registerHandle', h);
    });
  };

  CornerShapedElement.prototype.resize = function (x, y) {
    this.dim.width = x - this.dim.x;
    this.dim.height = y - this.dim.y;
    return this;
  };

  CornerShapedElement.prototype.move = function (deltaX, deltaY) {
    this.dim.x += deltaX;
    this.dim.y += deltaY;
    return this;
  };

  CornerShapedElement.prototype.isValid = function () {
    return this.dim.width && this.dim.height;
  };

  CornerShapedElement.prototype.setHandlesVisibility = function (visible) {
    this.handles.forEach((handle) => handle.setVisible(visible));
    return this;
  };

  CornerShapedElement.prototype.setIsSelected = function (isSelected) {
    this.setHandlesVisibility(isSelected);
    return this;
  };

  CornerShapedElement.prototype.getHandles = function () {
    return this.handles;
  };

  CornerShapedElement.prototype.setStyle = function (style, hoverStyle) {
    setStyle(this.element, style);
    addHover(this.element, style, hoverStyle);
    return this;
  };

  return CornerShapedElement;
};

export { createCornerShapedComponentConstructor };
