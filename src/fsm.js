import { Handle } from './handle.js';
import { createMachine, assign, interpret, actions, send } from 'xstate';
const { choose } = actions;

/*
  Machine
  -------
  States:
    idle          (no shapes being drawn)
      selectMode  (shapes could be selected)
        mouseIsDown
        mouseIsUp
      drawMode    (a shape type is chosen, but not started drawing)
        rect
        circle
        ellipse
        polygon
    drawing       (shape started, but not finished)
      rect
        mouseIsDown
      circle
        mouseIsDown
      ellipse
        mouseIsDown
      polygon
        mouseIsDown
        mouseIsUp

  Events:
    Mouse and keyboard:
      MT_DOWN
      MT_UP
      MT_MOVE
      KEYDOWN_ESC
      KEYDOWN_DEL
    API:
      MODE_SELECT
      MODE_DRAW_RECT
      MODE_DRAW_CIRCLE
      MODE_DRAW_ELLIPSE
      MODE_DRAW_POLYGON

*/

const idleDrawModeStates = {
  rect: {
    on: {
      MT_DOWN: {
        actions: ['createRectangle', 'selectUnfinished'],
        target: '#drawing.rect.mouseIsDown',
      },
    },
  },
  circle: {
    on: {
      MT_DOWN: {
        actions: ['createCircle', 'selectUnfinished'],
        target: '#drawing.circle.mouseIsDown',
      },
    },
  },
  ellipse: {
    on: {
      MT_DOWN: {
        actions: ['createEllipse', 'selectUnfinished'],
        target: '#drawing.ellipse.mouseIsDown',
      },
    },
  },
  polygon: {
    on: {
      MT_DOWN: {
        actions: ['createPolygon', 'selectUnfinished'],
        target: '#drawing.polygon.mouseIsDown',
      },
    },
  },
};

const drawingSpecificComponentStates = {
  rect: {
    states: {
      mouseIsDown: {
        on: {
          MT_UP: '#idle.drawMode.rect', // consider selection if mouse has not moved
          KEYDOWN_ESC: '#idle.drawMode.rect',
          MT_MOVE: {
            actions: 'resizeUnfinished',
          },
        },
      },
    },
  },
  circle: {
    states: {
      mouseIsDown: {
        on: {
          MT_UP: '#idle.drawMode.circle', // consider selection if mouse has not moved
          KEYDOWN_ESC: '#idle.drawMode.circle',
          MT_MOVE: {
            actions: 'resizeUnfinished',
          },
        },
      },
    },
  },
  ellipse: {
    states: {
      mouseIsDown: {
        on: {
          MT_UP: '#idle.drawMode.ellipse', // consider selection if mouse has not moved
          KEYDOWN_ESC: '#idle.drawMode.ellipse',
          MT_MOVE: {
            actions: 'resizeUnfinished',
          },
        },
      },
    },
  },
  polygon: {
    on: {
      KEYDOWN_ESC: '#idle.drawMode.polygon',
    },
    states: {
      mouseIsDown: {
        on: {
          MT_UP: 'mouseIsUp',
          MT_MOVE: {
            actions: 'moveLastPoint',
          },
        },
      },
      mouseIsUp: {
        on: {
          MT_DOWN: [
            {
              cond: 'isHandle',
              target: '#idle.drawMode.polygon',
            },
            {
              // else
              actions: 'addPoint',
              target: 'mouseIsDown',
            },
          ],
        },
      },
    },
  },
};

const createFSM = (editor) => {
  return createMachine(
    {
      context: {
        unfinishedComponent: undefined,
        mouseDownInSelectModeObject: undefined,
        _editor: editor,
      },
      on: {
        MODE_SELECT: 'idle.selectMode',
        MODE_DRAW_RECT: 'idle.drawMode.rect',
        MODE_DRAW_CIRCLE: 'idle.drawMode.circle',
        MODE_DRAW_ELLIPSE: 'idle.drawMode.ellipse',
        MODE_DRAW_POLYGON: 'idle.drawMode.polygon',
      },
      initial: 'idle',
      states: {
        idle: {
          id: 'idle',
          initial: 'selectMode',
          states: {
            selectMode: {
              initial: 'mouseIsUp',
              states: {
                mouseIsUp: {
                  on: {
                    MT_DOWN: {
                      actions: ['selectComponent', 'mouseDownInSelectModeAssign'],
                      target: 'mouseIsDown',
                    },
                  },
                },
                mouseIsDown: {
                  on: {
                    MT_UP: 'mouseIsUp',
                    MT_MOVE: {
                      actions: 'mouseDownMoveInSelectMode',
                    },
                  },
                },
              },
              // https://xstate.js.org/docs/guides/actions.html#action-order:
              // In XState version 4.x, assign actions have priority and are executed before any other actions.
              // We use send on the 'mouseDownInSelectModeUnassign' action to overcome this limitation.
              on: {
                KEYDOWN_ESC: {
                  actions: ['unselectAll', send('mouseDownInSelectModeUnassign')],
                },
                KEYDOWN_DEL: {
                  actions: ['deleteComponent', send('mouseDownInSelectModeUnassign')],
                },
                mouseDownInSelectModeUnassign: {
                  actions: 'mouseDownInSelectModeUnassign',
                },
              },
              entry: 'selectModeEntry',
              exit: ['unselectAll', send('mouseDownInSelectModeUnassign')],
            },
            drawMode: {
              initial: undefined,
              states: idleDrawModeStates,
              on: {
                KEYDOWN_ESC: {
                  target: '#idle.selectMode',
                  actions: 'unselectAll',
                },
              },
            },
          },
        },
        drawing: {
          id: 'drawing',
          initial: undefined,
          states: drawingSpecificComponentStates,
          exit: choose([
            {
              cond: 'unfinishedIsValid',
            },
            {
              // else
              actions: 'discardUnfinished',
            },
          ]),
        },
      },
    },
    {
      actions: {
        createRectangle: assign({
          unfinishedComponent: (context, e) =>
            context._editor.createRectangle({ x: e.offsetX, y: e.offsetY }),
        }),
        createCircle: assign({
          unfinishedComponent: (context, e) =>
            context._editor.createCircle({ x: e.offsetX, y: e.offsetY }),
        }),
        createEllipse: assign({
          unfinishedComponent: (context, e) =>
            context._editor.createEllipse({ x: e.offsetX, y: e.offsetY }),
        }),
        createPolygon: assign({
          unfinishedComponent: (context, e) =>
            context._editor.createPolygon({ x: e.offsetX, y: e.offsetY }),
        }),
        discardUnfinished: (context, e) => {
          context._editor.unregisterComponent(context.unfinishedComponent);
        },
        resizeUnfinished: (context, e) => {
          context.unfinishedComponent.resize(e.offsetX, e.offsetY);
        },
        selectUnfinished: (context, e) => {
          context._editor.selectComponent(context.unfinishedComponent);
        },
        // polygons only
        addPoint: (context, e) => {
          context.unfinishedComponent.addPoint(e.offsetX, e.offsetY);
          context.unfinishedComponent.setHandlesVisibility(true);
        },
        // polygons only
        moveLastPoint: (context, e) => {
          context.unfinishedComponent.moveLastPoint(e.offsetX, e.offsetY);
        },
        mouseDownInSelectModeAssign: assign({
          mouseDownInSelectModeObject: (context, e) => e.component,
        }),
        mouseDownInSelectModeUnassign: assign({
          mouseDownInSelectModeObject: null,
        }),
        mouseDownMoveInSelectMode: (context, e) => {
          const mouseDownObj = context.mouseDownInSelectModeObject;
          mouseDownObj && mouseDownObj.move && mouseDownObj.move(e.movementX, e.movementY);
        },
        selectComponent: (context, e) => {
          // When e.component is falsy, this operation works as unselectAll.
          context._editor.selectComponent(e.component);
        },
        deleteComponent: (context, e) => {
          const mouseDownObj = context.mouseDownInSelectModeObject;
          mouseDownObj && context._editor.unregisterComponent(mouseDownObj);
        },
        unselectAll: (context, e) => {
          context._editor.selectComponent(null);
        },
        selectModeEntry: (context, e) => {
          context._editor.selectModeHandler && context._editor.selectModeHandler();
        },
      },
      guards: {
        isHandle: (context, e) => e.component instanceof Handle,
        unfinishedIsValid: (context, e) => context.unfinishedComponent.isValid(),
      },
    },
  );
};

const createFSMService = (editor) => interpret(createFSM(editor));
export default createFSMService;
