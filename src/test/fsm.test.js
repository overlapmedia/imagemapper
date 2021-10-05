/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import createFSMService from '../fsm.js';

describe('State machine', () => {
  const fsmService = createFSMService({
    selectComponent: jest.fn(),
    createRectangle: () => ({ isValid: jest.fn() }),
    unregisterComponent: jest.fn(),
  }).start();

  test('transition by MT_DOWN event in "selectMode"', (done) => {
    fsmService
      .onTransition((state) => {
        if (state.matches('idle.selectMode.mouseIsDown')) {
          done();
        }
      })
      .send('MT_DOWN');
  });

  test('transition by MT_DOWN event in "drawMode"', (done) => {
    fsmService.onTransition((state) => {
      if (state.matches('drawing.rect.mouseIsDown')) {
        done();
      }
    });

    // failing with "Expected done to be called once, but it was called multiple times." (???)
    //fsmService.send(['MODE_DRAW_RECT', 'MT_DOWN']);
    fsmService.send('MODE_DRAW_RECT');
    fsmService.send('MT_DOWN');
  });

  test('transition by KEYDOWN_ESC event in "drawMode"', (done) => {
    fsmService.onTransition((state) => {
      if (state.matches('idle.selectMode.mouseIsUp')) {
        done();
      }
    });

    fsmService.send('MODE_DRAW_RECT');
    fsmService.send('KEYDOWN_ESC');
  });

  test('transition by KEYDOWN_ESC event in "drawing"', (done) => {
    let counter = 0;

    fsmService.onTransition((state) => {
      if (state.matches('idle.drawMode.rect')) {
        counter++ && counter === 2 && done();
      }
    });

    fsmService.send('MODE_DRAW_RECT'); // first match
    fsmService.send('MT_DOWN');
    fsmService.send('KEYDOWN_ESC'); // second match
  });
});
