/**
 * @jest-environment jsdom
 */

import { Rectangle } from '../rect.js';
import { Circle } from '../circle.js';
import { Ellipse } from '../ellipse.js';
import { Polygon } from '../polygon.js';

describe('Components', () => {
  const components = [new Rectangle(), new Circle(), new Ellipse(), new Polygon()];

  test('has element', () => {
    components.every((c) => expect(c.element).toBeInstanceOf(SVGElement));
  });

  test('has function move', () => {
    components.every((c) => expect(typeof c.move).toBe('function'));
  });

  test('has function isValid', () => {
    components.every((c) => expect(typeof c.isValid).toBe('function'));
  });

  test('has function setHandlesVisibility', () => {
    components.every((c) => expect(typeof c.setHandlesVisibility).toBe('function'));
  });

  test('has function setIsSelected', () => {
    components.every((c) => expect(typeof c.setIsSelected).toBe('function'));
  });

  test('has function getHandles', () => {
    components.every((c) => expect(typeof c.getHandles).toBe('function'));
  });

  test('has function setStyle', () => {
    components.every((c) => expect(typeof c.setStyle).toBe('function'));
  });

  test('has function export', () => {
    components.every((c) => expect(typeof c.export).toBe('function'));
  });
});
