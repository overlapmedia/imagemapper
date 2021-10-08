import { SVG_NS } from './constants.js';
import { root, doc } from './globals.js';
import createFSMService from './fsm.js';
import { addEventListeners, removeEventListeners, eventEmitter } from './events.js';
import { onChange } from './onChangeProxy.js';
import { Polygon } from './polygon.js';
import { Rectangle } from './rect.js';
import { Circle } from './circle.js';
import { Ellipse } from './ellipse.js';
import { Handle } from './handle.js';
import { getDefaultStyle } from './style.js';

function Editor(svgEl, options = {}, style = {}) {
  [
    this.viewPortWidth = 100,
    this.viewPortHeight = 100,
    this.selectModeHandler,
    this.viewClickHandler,
  ] = [
    options.viewPortWidth,
    options.viewPortHeight,
    options.selectModeHandler, // applies to Editor only
    options.viewClickHandler, // applies to View only
  ];

  this.style = deepMerge(getDefaultStyle(), style);

  this.fsmService = createFSMService(this).start();

  if (svgEl && svgEl.tagName === 'svg') {
    this.svg = svgEl;
  } else if (typeof svgEl === 'string' || svgEl instanceof String) {
    this.svg = doc.getElementById(svgEl);

    if (!this.svg) {
      this.svg = doc.createElementNS(SVG_NS, 'svg');
      this.svg.setAttribute('version', '1.1');
      this.svg.setAttribute('id', svgEl);
      // this.svg.setAttribute("shape-rendering", "crispEdges");

      this.svg.setAttribute('width', this.viewPortWidth);
      this.svg.setAttribute('height', this.viewPortHeight);
      this.svg.setAttribute('viewBox', `0, 0, ${this.viewPortWidth} ${this.viewPortHeight}`);
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
  }

  this.cgroup = doc.createElementNS(SVG_NS, 'g');
  this.hgroup = doc.createElementNS(SVG_NS, 'g');
  this.svg.appendChild(this.cgroup);
  this.svg.appendChild(this.hgroup);

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
  this._idCounter = 1;
  this._handleIdCounter = 1;
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
  if (typeof component === 'string' || component instanceof String) {
    component = this.getComponentById(component);
  }

  // When component is defined, we require a component which supports select() (handles do not).
  if (!component || component.setIsSelected) {
    Object.values(this._cacheElementMapping).forEach(
      (c) => c.setIsSelected && c.setIsSelected(c === component),
    );
  }

  return this;
};

Editor.prototype.setStyle = function (style) {
  this.style = deepMerge(this.style, style);
  return this;
};

Editor.prototype.export = function (escape) {
  const data = {
    idCounter: this._idCounter,
    components: Object.entries(this._cacheElementMapping)
      .filter(([id, component]) => !(component instanceof Handle))
      .map(([id, component]) => ({
        id,
        type: component.element.tagName,
        data: component.export(),
      })),
  };

  const result = JSON.stringify(data);
  return escape ? result.replace(/[\"]/g, '\\"') : result;
};

Editor.prototype.import = function (data) {
  const jsData = JSON.parse(data);

  this._idCounter = jsData.idCounter; // TODO: what if user decides to import _after_ drawing, or import multiple times?
  jsData.components.forEach((c) => {
    switch (c.type) {
      case 'rect':
        this.createRectangle(c.data, c.id); // c.data = dim object
        break;
      case 'circle':
        this.createCircle(c.data, c.id); // c.data = dim object
        break;
      case 'ellipse':
        this.createEllipse(c.data, c.id); // c.data = dim object
        break;
      case 'polygon':
        this.createPolygon(c.data, c.id); // c.data = array of points
        break;
      default:
        console.error('Unknown type', c.type);
    }
  });

  return this;
};

Editor.prototype.on = function (eventTypes, handler) {
  addEventListeners(this.svg, eventTypes, handler);
  return this;
};

Editor.prototype.off = function (eventTypes, handler) {
  removeEventListeners(this.svg, eventTypes, handler);
  return this;
};

Editor.prototype.appendChild = function (node) {
  this.svg.appendChild(node);
  return this;
};

Editor.prototype.removeChild = function (node) {
  this.svg.removeChild(node);
  return this;
};

Editor.prototype.createRectangle = function (dim, id) {
  const { x, y, width, height } = dim;
  return this.registerComponent(
    new Rectangle(x, y, width, height).setStyle(this.style.component, this.style.componentHover),
    id,
  );
};

Editor.prototype.createCircle = function (dim, id) {
  const { x, y, width, height } = dim;
  return this.registerComponent(
    new Circle(x, y, width, height).setStyle(this.style.component, this.style.componentHover),
    id,
  );
};

Editor.prototype.createEllipse = function (dim, id) {
  const { x, y, width, height } = dim;
  return this.registerComponent(
    new Ellipse(x, y, width, height).setStyle(this.style.component, this.style.componentHover),
    id,
  );
};

Editor.prototype.createPolygon = function (points, id) {
  return this.registerComponent(
    new Polygon(points).setStyle(this.style.component, this.style.componentHover),
    id,
  );
};

Editor.prototype.removeComponent = function (component) {
  if (typeof component === 'string' || component instanceof String) {
    component = this.getComponentById(component);
  }
  this.unregisterComponent(component);
  return this;
};

Editor.prototype.getComponentById = function (id) {
  return this._cacheElementMapping && this._cacheElementMapping[id];
};

Editor.prototype.registerComponent = function (component, id) {
  if (component instanceof Handle) {
    id = 'handle_' + this._handleIdCounter++;
  } else {
    id = id || component.element.tagName + '_' + this._idCounter++;
  }

  this._cacheElementMapping[id] = component;
  component.element.id = id;
  return component;
};

Editor.prototype.unregisterComponent = function (component) {
  this._cacheElementMapping[component.element.id] = null; // tell observer
  delete this._cacheElementMapping[component.element.id];
};

const addEditorListeners = (editor) => {
  addEventListeners(editor.svg, 'mousedown touchstart', (e) => {
    e.stopPropagation(); // avoid both mouse and touch event on devices firing both

    editor.fsmService.send({
      type: 'MT_DOWN',
      component: editor.getComponentById(e.target.id), // undefined when mousedown on editor
      offsetX: e.offsetX,
      offsetY: e.offsetY,
    });
  });

  addEventListeners(editor.svg, 'mouseup touchend mouseleave touchleave', (e) => {
    e.stopPropagation(); // avoid both mouse and touch event on devices firing both

    editor.fsmService.send({
      type: 'MT_UP',
    });
  });

  addEventListeners(editor.svg, 'mousemove touchmove', (e) => {
    e.stopPropagation(); // avoid both mouse and touch event on devices firing both

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

  return editor;
};

const addViewListeners = (view) => {
  addEventListeners(view.cgroup, 'click touchstart', (e) => {
    e.stopPropagation(); // avoid both mouse and touch event on devices firing both

    view.viewClickHandler && view.viewClickHandler(e, e.target.id);
  });

  return view;
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

export default (isView) => {
  return function () {
    return isView
      ? addViewListeners(new Editor(...arguments))
      : addEditorListeners(new Editor(...arguments));
  };
};
