import { SVG_NS, XLINK_NS } from './constants.js';
import { root, doc } from './globals.js';
import createFSMService from './fsm.js';
import { addEventListeners, removeEventListeners } from './events.js';
import { onChange } from './onChangeProxy.js';
import { Polygon } from './polygon.js';
import { Rectangle } from './rect.js';
import { Circle } from './circle.js';
import { Ellipse } from './ellipse.js';
import { Handle } from './handle.js';
import { getDefaultStyle } from './style.js';

/**
 * @callback componentDrawnHandler
 * @param {Rectangle|Circle|Ellipse|Polygon}
 * @param {string} id
 */

/**
 * @callback selectModeHandler
 */

/**
 * @callback viewClickHandler
 * @param {Event} e
 * @param {string} id
 */

/**
 * An Editor or View containing everything needed by the drawing/display board: DOM, event listeners, state and API functions.
 *
 * @memberof module:imagemapper
 * @inner
 *
 * @param {string|SVGElement} - the id of the SVG element to be created or the SVG element itself if it's already made
 * @param {object} [options]
 * @param {string} [options.width] - if you let imagemapper create the SVGElement for you, you could specify width for it here
 * @param {string} [options.height] - if you let imagemapper create the SVGElement for you, you could specify height for it here
 * @param {componentDrawnHandler} [options.componentDrawnHandler] - function being called when finished drawing a valid component (eg. rectangle with width and height greater than 0 or polygon width at least three points), does not apply to importing
 * @param {selectModeHandler} [options.selectModeHandler] - function being called when editor switches to select mode when eg. Esc keydown event or mousedown event on handle is causing it to leave draw mode
 * @param {viewClickHandler} [options.viewClickHandler] - when using view this function will be called on click events from the shapes
 * @param {object} [style] - see {@link module:imagemapper~Editor#setStyle}
 */
function Editor(svgEl, options = {}, style = {}) {
  [
    this.width = 1200,
    this.height = 600,
    this.componentDrawnHandler,
    this.selectModeHandler,
    this.viewClickHandler,
  ] = [
    options.width,
    options.height,
    options.componentDrawnHandler, // applies to Editor only
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

      this.svg.setAttribute('width', this.width);
      this.svg.setAttribute('height', this.height);
      this.svg.setAttribute('viewBox', `0, 0, ${this.width} ${this.height}`);
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
        prevComponent.getHandles().forEach((h) => {
          this.unregisterComponent(h);
        });
      }
    }
  });
  this._idCounter = 1;
  this._handleIdCounter = 1;
}

/**
 * Add an image element into the SVG element.
 *
 * @param {string} path
 * @param {number} [width]
 * @param {number} [height]
 * @returns {Editor}
 */
Editor.prototype.loadImage = function (path, width, height) {
  const image = doc.createElementNS(SVG_NS, 'image');
  image.setAttributeNS(XLINK_NS, 'href', path);
  width && image.setAttribute('width', width);
  height && image.setAttribute('height', height);
  this.svg.prepend(image);
  return this;
};

/**
 * Completely or partly set current style of components, handles, hovering etc.
 *
 * @param {object} style
 * @returns {Editor}
 *
 * @example
 * ```js
 * editor.setStyle({
 *   component: {
 *     fill: 'rgb(102, 102, 102)',
 *     stroke: 'rgb(51, 51, 51)',
 *   },
 *   componentHover: {
 *     off: {
 *       'stroke-width': 1,
 *       opacity: 0.5,
 *     },
 *     on: {
 *       'stroke-width': 2,
 *       opacity: 0.6,
 *     },
 *   },
 *   componentSelect: {
 *     off: {
 *       'stroke-dasharray': 'none',
 *       'stroke-linejoin': 'miter',
 *     },
 *     on: {
 *       'stroke-dasharray': '4 3',
 *       'stroke-linejoin': 'round',
 *     },
 *   },
 *   handle: {
 *     fill: 'rgb(255, 255, 255)',
 *     stroke: 'rgb(51, 51, 51)',
 *     'stroke-width': 1,
 *     opacity: 0.3,
 *   },
 *   handleHover: {
 *     opacity: 0.6,
 *   },
 * });
 * ```
 */
Editor.prototype.setStyle = function (style) {
  this.style = deepMerge(this.style, style);
  return this;
};

/**
 * Put editor in draw mode of rectangles.
 */
Editor.prototype.rect = function () {
  this.fsmService.send('MODE_DRAW_RECT');
};

/**
 * Put editor in draw mode of circles.
 */
Editor.prototype.circle = function () {
  this.fsmService.send('MODE_DRAW_CIRCLE');
};

/**
 * Put editor in draw mode of ellipses.
 */
Editor.prototype.ellipse = function () {
  this.fsmService.send('MODE_DRAW_ELLIPSE');
};

/**
 * Put editor in draw mode of polygons.
 */
Editor.prototype.polygon = function () {
  this.fsmService.send('MODE_DRAW_POLYGON');
};

/**
 * Put editor in select mode.
 */
Editor.prototype.selectMode = function () {
  this.fsmService.send('MODE_SELECT');
};

/**
 * @param {string} id
 * @returns {Rectangle|Circle|Ellipse|Polygon}
 */
Editor.prototype.getComponentById = function (id) {
  return this._cacheElementMapping && this._cacheElementMapping[id];
};

/**
 * Make programmatically selection of a component which basically enables its handles by making them visible.
 * Please note that all components will be unselected when leaving select mode or leaving draw mode.
 *
 * @param {string|Rectangle|Circle|Ellipse|Polygon} component - a component or a component id
 * @returns {Rectangle|Circle|Ellipse|Polygon}
 */
Editor.prototype.selectComponent = function (component) {
  if (typeof component === 'string' || component instanceof String) {
    component = this.getComponentById(component);
  }

  // When component is defined, we require a component which supports setIsSelected() (handles do not).
  if (!component || component.setIsSelected) {
    Object.values(this._cacheElementMapping).forEach((c) => {
      if (c === component) {
        c.setIsSelected && c.setIsSelected(true);
      }
      if (c !== component && !c.isFrozen) {
        c.setIsSelected && c.setIsSelected(false);
      }
    });
  }

  return component;
};

/**
 * Remove a component (shape) from the editor or view.
 *
 * @param {string|Rectangle|Circle|Ellipse|Polygon} component - a component or a component id
 * @returns {Rectangle|Circle|Ellipse|Polygon}
 */
Editor.prototype.removeComponent = function (component) {
  if (typeof component === 'string' || component instanceof String) {
    component = this.getComponentById(component);
  }
  this.unregisterComponent(component);
  return component;
};

/**
 * @callback handler
 * @param {Event} e
 */

/**
 * Add event listener(s).
 *
 * @param {Array.<string>} eventTypes
 * @param {handler} handler
 * @returns {Editor}
 */
Editor.prototype.on = function (eventTypes, handler) {
  addEventListeners(this.svg, eventTypes, handler);
  return this;
};

/**
 * Remove event listener(s).
 *
 * @param {Array.<string>} eventTypes
 * @param {handler} handler
 * @returns {Editor}
 */
Editor.prototype.off = function (eventTypes, handler) {
  removeEventListeners(this.svg, eventTypes, handler);
  return this;
};

/**
 * @callback idInterceptor
 * @param {string} id - the id to be modified
 */

/**
 * Import shapes from JSON.
 *
 * @param {string} data
 * @param {idInterceptor} [idInterceptor] - function to change the imported id to avoid name conflicts, eg. in case user decides to import multiple times or import _after_ drawing
 * @returns {Array.<Rectangle|Circle|Ellipse|Polygon>}
 *
 * @example
 * ```js
 * {
 *   "components": [{
 *     "id": "circle_1",
 *     "type": "circle",
 *     "data": {
 *       "x": 444,
 *       "y": 71,
 *       "width": 241,
 *       "height": 211
 *     }
 *   }]
 * }
 * ```
 *
 * @example
 * ```js
 * {
 *   "components": [{
 *     "id": "rect_1",
 *     "type": "rect",
 *     "data": {
 *       "x": 444,
 *       "y": 71,
 *       "width": 241,
 *       "height": 211
 *     }
 *   }]
 * }
 * ```
 *
 * @example
 * ```js
 * {
 *   "components": [{
 *     "id": "ellipse_1",
 *     "type": "ellipse",
 *     "data": {
 *       "x": 444,
 *       "y": 71,
 *       "width": 241,
 *       "height": 211
 *     }
 *   }]
 * }
 * ```
 *
 * @example
 * ```js
 * {
 *   "components": [{
 *     "id": "polygon_1",
 *     "type": "polygon",
 *     "data": [{
 *       "x": 603,
 *       "y": 114
 *     }, {
 *       "x": 625,
 *       "y": 203
 *     }, {
 *       "x": 699,
 *       "y": 124
 *     }]
 *   }]
 * }
 * ```
 */
Editor.prototype.import = function (data, idInterceptor) {
  const jsData = JSON.parse(data);
  this._idCounter = jsData.idCounter;

  return jsData.components
    .map((c) => {
      const id = idInterceptor ? idInterceptor(c.id) : c.id;

      switch (c.type) {
        case 'rect':
          return this.createRectangle(c.data, id); // c.data = dim object
        case 'circle':
          return this.createCircle(c.data, id); // c.data = dim object
        case 'ellipse':
          return this.createEllipse(c.data, id); // c.data = dim object
        case 'polygon':
          return this.createPolygon(c.data, id); // c.data = array of points
        default:
          console.error('Unknown type', c.type);
          return null;
      }
    })
    .filter((c) => c);
};

/**
 * Export drawn shapes as JSON.
 *
 * @param {boolean} [escape] - whether double quotes should be escaped
 * @returns {string} - JSON data
 */
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

Editor.prototype.createRectangle = function (dim, id) {
  const { x, y, width, height } = dim;
  return this.registerComponent(new Rectangle(this, x, y, width, height).setStyle(this.style), id);
};

Editor.prototype.createCircle = function (dim, id) {
  const { x, y, width, height } = dim;
  return this.registerComponent(new Circle(this, x, y, width, height).setStyle(this.style), id);
};

Editor.prototype.createEllipse = function (dim, id) {
  const { x, y, width, height } = dim;
  return this.registerComponent(new Ellipse(this, x, y, width, height).setStyle(this.style), id);
};

Editor.prototype.createPolygon = function (points, id) {
  return this.registerComponent(new Polygon(this, points).setStyle(this.style), id);
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

Editor.prototype.registerComponentHandle = function (handle) {
  return this.registerComponent(handle.setStyle(this.style.handle, this.style.handleHover));
};

Editor.prototype.unregisterComponent = function (component) {
  component._logWarnOnOpOnFrozen && component._logWarnOnOpOnFrozen('Deleting');

  this._cacheElementMapping[component.element.id] = null; // tell observer
  delete this._cacheElementMapping[component.element.id];
};

const addEditorListeners = (editor) => {
  let prevTouch; // used by touchmove

  addEventListeners(editor.svg, 'mousedown touchstart', (e) => {
    e.preventDefault(); // avoid both mouse and touch event on devices firing both

    const storedComponent = editor.getComponentById(e.target.id);
    const componentTarget = storedComponent && storedComponent.isFrozen ? null : storedComponent;

    const touchBCR = editor.svg.getBoundingClientRect();
    const touch = e.targetTouches && e.targetTouches[0];

    editor.fsmService.send({
      type: 'MT_DOWN',
      component: componentTarget, // not defined when mousedown on editor
      offsetX: e.offsetX !== undefined ? e.offsetX : touch && touch.clientX - touchBCR.x,
      offsetY: e.offsetY !== undefined ? e.offsetY : touch && touch.clientY - touchBCR.y,
    });

    prevTouch = touch;
  });

  addEventListeners(editor.svg, 'mouseup touchend mouseleave touchleave', (e) => {
    e.preventDefault(); // avoid both mouse and touch event on devices firing both

    editor.fsmService.send({
      type: 'MT_UP',
    });

    prevTouch = null;
  });

  addEventListeners(editor.svg, 'mousemove touchmove', (e) => {
    const touchBCR = editor.svg.getBoundingClientRect();
    const touch = e.targetTouches && e.targetTouches[0];

    editor.fsmService.send({
      type: 'MT_MOVE',
      offsetX: e.offsetX !== undefined ? e.offsetX : touch && touch.clientX - touchBCR.x,
      offsetY: e.offsetY !== undefined ? e.offsetY : touch && touch.clientY - touchBCR.y,
      movementX:
        e.movementX !== undefined ? e.movementX : prevTouch ? touch.clientX - prevTouch.clientX : 0,
      movementY:
        e.movementY !== undefined ? e.movementY : prevTouch ? touch.clientY - prevTouch.clientY : 0,
    });

    prevTouch = touch;
  });

  addEventListeners(root.window, 'keydown', (e) => {
    switch (e.key) {
      case 'Escape':
        editor.fsmService.send('KEYDOWN_ESC');
        break;
      case 'Delete':
        editor.fsmService.send('KEYDOWN_DEL');
        break;
      case 'ArrowUp':
        e.preventDefault();
        editor.fsmService.send({
          type: 'KEYDOWN_ARRAY',
          movementX: 0,
          movementY: -1,
        });
        break;
      case 'ArrowDown':
        e.preventDefault();
        editor.fsmService.send({
          type: 'KEYDOWN_ARRAY',
          movementX: 0,
          movementY: 1,
        });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        editor.fsmService.send({
          type: 'KEYDOWN_ARRAY',
          movementX: -1,
          movementY: 0,
        });
        break;
      case 'ArrowRight':
        e.preventDefault();
        editor.fsmService.send({
          type: 'KEYDOWN_ARRAY',
          movementX: 1,
          movementY: 0,
        });
        break;
    }
  });

  return editor;
};

const addViewListeners = (view) => {
  addEventListeners(view.cgroup, 'click touchstart', (e) => {
    e.preventDefault(); // avoid both touch and pointer event on devices firing both

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
  return function EditorConstructor() {
    return isView
      ? addViewListeners(new Editor(...arguments))
      : addEditorListeners(new Editor(...arguments));
  };
};
