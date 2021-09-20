import { SVG_NS } from './constants.js';
import { root, doc } from './globals.js';
import createFSMService from './fsm.js';
import { addEventListeners, eventEmitter } from './events.js';
import { onChange } from './onChangeProxy.js';
import { Polygon } from './polygon.js';
import { Rectangle } from './rect.js';
import { Circle } from './circle.js';
import { Ellipse } from './ellipse.js';
import { Handle } from './handle.js';
import { getDefaultStyle } from './style.js';

function Editor(svgEl, options, selectModeCallback, style = {}) {
  const { viewPortWidth, viewPortHeight } = options;
  this.selectModeCallback = selectModeCallback;
  this.style = deepMerge(getDefaultStyle(), style);

  this.fsmService = createFSMService(this);

  if (svgEl && svgEl.tagName === 'svg') {
    this.svg = svgEl;
  } else if (typeof svgEl === 'string' || svgEl instanceof String) {
    this.svg = doc.getElementById(svgEl);

    if (!this.svg) {
      this.svg = doc.createElementNS(SVG_NS, 'svg');
      this.svg.setAttribute('version', '1.1');
      this.svg.setAttribute('id', svgEl);
      // this.svg.setAttribute("shape-rendering", "crispEdges");

      this.svg.setAttribute('width', viewPortWidth);
      this.svg.setAttribute('height', viewPortHeight);
      this.svg.setAttribute('viewBox', `0, 0, ${viewPortWidth} ${viewPortHeight}`);
      this.svg.setAttribute('preserveAspectRatio', 'xMinYMin');

      const svg = this.svg;
      window.addEventListener(
        'load',
        function load() {
          doc.body.appendChild(svg);
        },
        { once: true },
      );
    }

    this.cgroup = doc.createElementNS(SVG_NS, 'g');
    this.hgroup = doc.createElementNS(SVG_NS, 'g');
    this.svg.appendChild(this.cgroup);
    this.svg.appendChild(this.hgroup);
  }

  addAppListeners(this);

  this._cacheElementMapping = onChange({}, (prop, newComponent, prevComponent) => {
    if (newComponent) {
      if (newComponent instanceof Handle) {
        this.hgroup.appendChild(newComponent.element);
      } else {
        this.cgroup.appendChild(newComponent.element);
      }
    } else {
      if (prevComponent instanceof Handle) {
        this.hgroup.removeChild(prevComponent.element);
      } else {
        this.cgroup.removeChild(prevComponent.element);
        // Using emitter to get unregister op in the queue after registering handles
        eventEmitter.emit('unregisterHandle', prevComponent.getHandles());
      }
    }
  });
  this._idCounter = 0;
}

Editor.prototype.rect = function () {
  this.fsmService.send('MODE_DRAW_RECT');
};

Editor.prototype.circle = function () {
  this.fsmService.send('MODE_DRAW_CIRCLE');
};

Editor.prototype.ellipse = function () {
  this.fsmService.send('MODE_DRAW_ELLIPSE');
};

Editor.prototype.polygon = function () {
  this.fsmService.send('MODE_DRAW_POLYGON');
};

Editor.prototype.selectMode = function () {
  this.fsmService.send('MODE_SELECT');
};

Editor.prototype.selectComponent = function (component) {
  // When component is defined, we require a component which supports select() (handles do not).
  if (!component || component.setIsSelected) {
    Object.values(this._cacheElementMapping).forEach(
      (c) => c.setIsSelected && c.setIsSelected(c === component),
    );
  }
};

Editor.prototype.setStyle = function (style) {
  this.style = deepMerge(this.style, style);
};

Editor.prototype.createRectangle = function (x, y) {
  return this.registerComponent(
    new Rectangle(x, y).setStyle(this.style.component, this.style.componentHover),
  );
};

Editor.prototype.createCircle = function (x, y) {
  return this.registerComponent(
    new Circle(x, y).setStyle(this.style.component, this.style.componentHover),
  );
};

Editor.prototype.createEllipse = function (x, y) {
  return this.registerComponent(
    new Ellipse(x, y).setStyle(this.style.component, this.style.componentHover),
  );
};

Editor.prototype.createPolygon = function (x, y) {
  return this.registerComponent(
    new Polygon(x, y).setStyle(this.style.component, this.style.componentHover),
  );
};

Editor.prototype.getComponentById = function (id) {
  return this._cacheElementMapping && this._cacheElementMapping[id];
};

Editor.prototype.registerComponent = function (component) {
  const id = 'svg_' + this._idCounter++;
  this._cacheElementMapping[id] = component;
  component.element.id = id;
  return component;
};

Editor.prototype.unregisterComponent = function (component) {
  this._cacheElementMapping[component.element.id] = null; // tell observer
  delete this._cacheElementMapping[component.element.id];
};

const addAppListeners = (editor) => {
  addEventListeners([editor.svg, editor.cgroup, editor.hgroup], 'mousedown touchstart', (e) => {
    e.stopPropagation();

    editor.fsmService.send({
      type: 'MT_DOWN',
      component: editor.getComponentById(e.target.id), // undefined when mousedown on editor
      offsetX: e.offsetX,
      offsetY: e.offsetY,
    });
  });

  addEventListeners(editor.svg, 'mouseup touchend mouseleave touchleave', (e) => {
    editor.fsmService.send({
      type: 'MT_UP',
    });
  });

  addEventListeners(editor.svg, 'mousemove touchmove', (e) => {
    editor.fsmService.send({
      type: 'MT_MOVE',
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      movementX: e.movementX,
      movementY: e.movementY,
    });
  });

  addEventListeners(root.window, 'keydown', (e) => {
    if (e.key === 'Escape') {
      editor.fsmService.send('KEYDOWN_ESC');
    }
  });

  addEventListeners(root.window, 'keydown', (e) => {
    if (e.key === 'Delete') {
      editor.fsmService.send('KEYDOWN_DEL');
    }
  });

  eventEmitter.on('registerHandle', (handle) => {
    editor.registerComponent(handle.setStyle(editor.style.handle, editor.style.handleHover));
  });

  eventEmitter.on('unregisterHandle', (handles) => {
    [handles].flat().forEach((h) => {
      editor.unregisterComponent(h);
    });
  });
};

const deepMerge = (target, ...sources) => {
  if (!sources.length || !sources[0]) {
    return target;
  }
  const source = sources.shift();

  Object.entries(source).forEach(([key, value]) => {
    if (Object.getPrototypeOf(value) === Object.prototype) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  });

  return deepMerge(target, ...sources);
};

export { Editor };
