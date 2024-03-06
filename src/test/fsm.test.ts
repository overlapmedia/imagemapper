import { jest } from "@jest/globals";
import createFSMService from "../fsm";
import { Editor } from "../editor";
jest.mock("../editor");

describe("State machine", () => {
    const fsmService = createFSMService(new Editor("mock")).start();

    test('transition by MT_DOWN event in "selectMode"', done => {
        fsmService.subscribe(state => {
            if (state.matches("idle.selectMode.mouseIsDown")) {
                done();
            }
        });

        fsmService.send({ type: "MT_DOWN" });
    });

    test('transition by MT_DOWN event in "drawMode"', done => {
        fsmService.subscribe(state => {
            if (state.matches("drawing.rect.mouseIsDown")) {
                done();
            }
        });

        // failing with "Expected done to be called once, but it was called multiple times." (???)
        //fsmService.send(['MODE_DRAW_RECT', 'MT_DOWN']);
        fsmService.send({ type: "MODE_DRAW_RECT" });
        fsmService.send({ type: "MT_DOWN" });
    });

    test('transition by KEYDOWN_ESC event in "drawMode"', done => {
        fsmService.subscribe(state => {
            if (state.matches("idle.selectMode.mouseIsUp")) {
                done();
            }
        });

        fsmService.send({ type: "MODE_DRAW_RECT" });
        fsmService.send({ type: "KEYDOWN_ESC" });
    });

    test('transition by KEYDOWN_ESC event in "drawing"', done => {
        let counter = 0;

        fsmService.subscribe(state => {
            if (state.matches("idle.drawMode.rect")) {
                counter++ && counter === 2 && done();
            }
        });

        fsmService.send({ type: "MODE_DRAW_RECT" }); // first match
        fsmService.send({ type: "MT_DOWN" });
        fsmService.send({ type: "KEYDOWN_ESC" }); // second match
    });
});
