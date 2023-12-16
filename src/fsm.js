import { Handle } from './handle.js';
import { createMachine, assign, createActor, enqueueActions } from 'xstate';

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
      KEYDOWN_ARRAY
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
    initial: 'mouseIsUp',
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
      mouseIsUp: {},
    },
  },
  circle: {
    initial: 'mouseIsUp',
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
      mouseIsUp: {},
    },
  },
  ellipse: {
    initial: 'mouseIsUp',
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
      mouseIsUp: {},
    },
  },
  polygon: {
    on: {
      KEYDOWN_ESC: '#idle.drawMode.polygon',
    },
    initial: 'mouseIsUp',
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
              guard: 'isHandle',
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
        MODE_SELECT: '.idle.selectMode',
        MODE_DRAW_RECT: '.idle.drawMode.rect',
        MODE_DRAW_CIRCLE: '.idle.drawMode.circle',
        MODE_DRAW_ELLIPSE: '.idle.drawMode.ellipse',
        MODE_DRAW_POLYGON: '.idle.drawMode.polygon',
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
                    KEYDOWN_ARRAY: {
                      actions: 'mouseDownInSelectModeObjectMove',
                    },
                  },
                },
                mouseIsDown: {
                  on: {
                    MT_UP: 'mouseIsUp',
                    MT_MOVE: {
                      actions: 'mouseDownInSelectModeObjectMove',
                    },
                  },
                },
              },
              on: {
                KEYDOWN_ESC: {
                  actions: ['unselectAll', 'mouseDownInSelectModeUnassign'],
                },
                KEYDOWN_DEL: {
                  actions: ['deleteComponent', 'mouseDownInSelectModeUnassign'],
                },
                mouseDownInSelectModeUnassign: {
                  actions: 'mouseDownInSelectModeUnassign',
                },
              },
              entry: 'selectModeEntry',
              exit: ['unselectAll', 'mouseDownInSelectModeUnassign'],
            },
            drawMode: {
              initial: 'polygon',
              states: idleDrawModeStates,
              on: {
                KEYDOWN_ESC: '#idle.selectMode',
              },
            },
          },
        },
        drawing: {
          id: 'drawing',
          initial: 'polygon',
          states: drawingSpecificComponentStates,
          exit: enqueueActions(({ enqueue, check }) => {
            if (check('unfinishedIsValid')) {
              enqueue('unselectAll');
              enqueue('validComponentFinished');
            } else {
              enqueue('discardUnfinished');
            }
          }),
        },
      },
    },
    {
      actions: {
        createRectangle: assign({
          unfinishedComponent: (a) =>
            a.context._editor.createRectangle({
              x: a.event.offsetX,
              y: a.event.offsetY,
            }),
        }),
        createCircle: assign({
          unfinishedComponent: (a) =>
            a.context._editor.createCircle({
              x: a.event.offsetX,
              y: a.event.offsetY,
            }),
        }),
        createEllipse: assign({
          unfinishedComponent: (a) =>
            a.context._editor.createEllipse({
              x: a.event.offsetX,
              y: a.event.offsetY,
            }),
        }),
        createPolygon: assign({
          unfinishedComponent: (a) =>
            a.context._editor.createPolygon({
              x: a.event.offsetX,
              y: a.event.offsetY,
            }),
        }),
        discardUnfinished: (a) => {
          a.context._editor.unregisterComponent(a.context.unfinishedComponent);
        },
        resizeUnfinished: (a) => {
          a.context.unfinishedComponent.resize(a.event.offsetX, a.event.offsetY);
        },
        selectUnfinished: (a) => {
          a.context._editor.selectComponent(a.context.unfinishedComponent);
        },
        validComponentFinished: (a) => {
          const c = a.context.unfinishedComponent;
          a.context._editor.componentDrawnHandler &&
            a.context._editor.componentDrawnHandler(c, c.element.id);
        },
        // polygons only
        addPoint: (a) => {
          a.context.unfinishedComponent.addPoint(a.event.offsetX, a.event.offsetY);
          a.context._editor.selectComponent(a.context.unfinishedComponent); // send('selectUnfinished'); ?
        },
        // polygons only
        moveLastPoint: (a) => {
          a.context.unfinishedComponent.moveLastPoint(a.event.offsetX, a.event.offsetY);
        },
        mouseDownInSelectModeAssign: assign({
          mouseDownInSelectModeObject: (a) => a.event.component,
        }),
        mouseDownInSelectModeUnassign: assign({
          mouseDownInSelectModeObject: null,
        }),
        mouseDownInSelectModeObjectMove: (a) => {
          const mouseDownObj = a.context.mouseDownInSelectModeObject;
          mouseDownObj &&
            mouseDownObj.move &&
            mouseDownObj.move(a.event.movementX, a.event.movementY);
        },
        selectComponent: (a) => {
          // When a.event.component is falsy, this operation works as unselectAll.
          a.context._editor.selectComponent(a.event.component);
        },
        deleteComponent: (a) => {
          const mouseDownObj = a.context.mouseDownInSelectModeObject;
          mouseDownObj && a.context._editor.unregisterComponent(mouseDownObj);
        },
        unselectAll: (a) => {
          a.context._editor.selectComponent(null);
        },
        selectModeEntry: (a) => {
          a.context._editor.selectModeHandler && a.context._editor.selectModeHandler();
        },
      },
      guards: {
        isHandle: (a) => a.event.component instanceof Handle,
        unfinishedIsValid: (a) => a.context.unfinishedComponent.isValid(),
      },
    },
  );
};

const createFSMService = (editor) => createActor(createFSM(editor));
export default createFSMService;
