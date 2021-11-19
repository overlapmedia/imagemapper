/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import editorFactory from '../editor.js';
import { SVG_NS } from '../constants.js';
import { doc } from '../globals.js';

describe('Editor', () => {
  const editorConstr = editorFactory();

  const makeValidPolygon = (editor) => {
    editor.polygon();

    // Making valid polygon (having at least three points)
    editor.svg.dispatchEvent(new MouseEvent('mousedown'));
    editor.svg.dispatchEvent(new MouseEvent('mouseup'));
    editor.svg.dispatchEvent(new MouseEvent('mousedown'));
    editor.svg.dispatchEvent(new MouseEvent('mouseup'));
    editor.svg.dispatchEvent(new MouseEvent('mousedown'));
    editor.svg.dispatchEvent(new MouseEvent('mouseup'));
  };

  test('with SVGElement', () => {
    const svgEl = doc.createElementNS(SVG_NS, 'svg');
    const editor = editorConstr(svgEl);
    expect(editor.svg).toBe(svgEl);
  });

  test('with existing SVG id', () => {
    document.body.innerHTML = '<svg id="svgid" width="1337"></svg>';

    const editor = editorConstr('svgid');
    expect(editor.svg).toBeInstanceOf(SVGElement);
    expect(editor.svg.id).toEqual('svgid');
    expect(editor.svg.getAttribute('width')).toEqual('1337');
  });

  test('with SVG element to be created', () => {
    document.body.innerHTML = '<svg id="svgid"></svg>';

    const editor = editorConstr('svgidother', { width: 1337 });
    expect(editor.svg).toBeInstanceOf(SVGElement);
    expect(editor.svg.id).toEqual('svgidother');
    expect(editor.svg.getAttribute('width')).toEqual('1337');
  });

  test('drawing component should cache a new valid component', () => {
    const editor = editorConstr('svgid');
    makeValidPolygon(editor);
    const polygon = editor.getComponentById('polygon_1');

    expect(polygon.element instanceof SVGElement).toBeTruthy();
    expect(polygon.element.tagName).toEqual('polygon');
    expect(polygon.element.id).toEqual('polygon_1');
  });

  test('should get callback on componentDrawnHandler when finished drawing', () => {
    const componentDrawnHandler = jest.fn();
    const editor = editorConstr('svgid', { componentDrawnHandler });

    makeValidPolygon(editor);
    editor.fsmService.send('KEYDOWN_ESC'); // exit drawing

    expect(componentDrawnHandler).toBeCalledTimes(1);
    expect(componentDrawnHandler).toBeCalledWith(
      expect.objectContaining({
        element: expect.any(SVGElement),
      }),
      'polygon_1',
    );
  });

  test('should get callback on selectModeHandler before drawing', () => {
    const selectModeHandler = jest.fn();
    const editor = editorConstr('svgid', { selectModeHandler });

    editor.rect();
    editor.fsmService.send('KEYDOWN_ESC'); // TODO: should preferably simulate keydown with key="Escape"
    expect(selectModeHandler).toBeCalledTimes(2); // called initially by fsm too
  });

  test('should get callback on selectModeHandler when started drawing', () => {
    const selectModeHandler = jest.fn();
    const editor = editorConstr('svgid', { selectModeHandler });

    // TODO: event emitter removing handles when discarding component is not working in jsdom env
    // editor.svg.dispatchEvent(new MouseEvent('mousedown'));

    // Instead we skip discardUnfinished by making a valid polygon (having at least three points)
    makeValidPolygon(editor);

    editor.fsmService.send('KEYDOWN_ESC'); // to drawMode
    editor.fsmService.send('KEYDOWN_ESC'); // to selectMode
    expect(selectModeHandler).toBeCalledTimes(2); // called initially by fsm too
  });
});

describe('View', () => {
  const editorConstr = editorFactory();
  const viewConstr = editorFactory(true);

  test('should get callback on viewClickHandler', () => {
    const viewClickHandler = jest.fn();
    const view = viewConstr('view', { viewClickHandler });

    const mouseEvent = new MouseEvent('click'); // we skip testing target as it is readonly in MouseEvent
    view.cgroup.dispatchEvent(mouseEvent);

    expect(viewClickHandler).toBeCalledTimes(1);
    expect(viewClickHandler).toBeCalledWith(mouseEvent, '');
  });

  test('should be able to import Editor`s exported data', () => {
    const editor = editorConstr('editor');
    const view = viewConstr('view');

    // First create some data
    editor.rect();
    // can't use MouseEvent as offsetX and offsetY properties are readonly
    editor.fsmService.send({
      type: 'MT_DOWN',
      offsetX: 0,
      offsetY: 0,
    });
    editor.fsmService.send({
      type: 'MT_MOVE',
      offsetX: 1,
      offsetY: 1,
    });

    // Now import the data to the view
    view.import(editor.export(), (id) => id + '_test-import');
    const viewRect = view.getComponentById('rect_1_test-import');

    expect(viewRect.element instanceof SVGElement).toBeTruthy();
    expect(viewRect.element.tagName).toEqual('rect');
    expect(viewRect.element.id).toEqual('rect_1_test-import');
  });
});
