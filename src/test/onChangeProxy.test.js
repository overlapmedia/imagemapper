import { jest } from '@jest/globals';
import { onChange } from '../onChangeProxy.js';

describe('onChange with handler function', () => {
  const mockHandler = jest.fn();
  const unproxied = { someprop: 1 };
  const proxied = onChange(unproxied, mockHandler);

  afterEach(() => {
    mockHandler.mockRestore();
  });

  test('listens to proxied object', () => {
    proxied.someprop = 2;
    expect(mockHandler).toBeCalledWith('someprop', 2, 1, { someprop: 2 });
  });

  test('does not listen to unproxied object', () => {
    unproxied.someprop = 2;
    expect(mockHandler).not.toBeCalled();
  });
});

describe('onChange with handler map of functions', () => {
  const mockHandlers = {
    prop1: jest.fn(),
    prop2: jest.fn(),
    prop3: jest.fn(),
  };
  const unproxied = { prop1: 1 };
  const proxied = onChange(unproxied, mockHandlers);

  afterEach(() => {
    mockHandlers.prop1.mockRestore();
    mockHandlers.prop2.mockRestore();
    mockHandlers.prop3.mockRestore();
  });

  test('listens to proxied object', () => {
    proxied.prop1 = 2;
    proxied.prop2 = 2;
    expect(mockHandlers.prop1).toBeCalledWith(2, 1, { prop1: 2, prop2: 2 });
    expect(mockHandlers.prop2).toBeCalledWith(2, undefined, { prop1: 2, prop2: 2 });
    expect(mockHandlers.prop3).not.toBeCalled();
  });

  test('does not listen to unproxied object', () => {
    unproxied.prop1 = 2;
    expect(mockHandlers.prop1).not.toBeCalled();
    expect(mockHandlers.prop2).not.toBeCalled();
    expect(mockHandlers.prop3).not.toBeCalled();
  });
});
