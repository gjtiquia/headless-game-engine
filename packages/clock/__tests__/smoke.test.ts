import { GameEngine } from "@headless-game-engine/core";
import { EngineClock, Time } from "../src"

describe("SmokeTest", () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');
        jest.spyOn(global, 'setTimeout');

        Time.resetToDefaultValues();
    })

    afterEach(() => {
        jest.clearAllTimers();
    })

    afterEach(() => {
        EngineClock.stop();
    })

    it("should throw an error if the tick rate is zero", () => {
        Time.tickRate = 0;

        const gameEngine = new GameEngine({ initialSceneConfig: {} })
        expect(() => EngineClock.start(gameEngine)).toThrowError();
    })

    it("should throw an error if trying to start while another game engine is running", () => {
        const gameEngine_1 = new GameEngine({ initialSceneConfig: {} })
        const gameEngine_2 = new GameEngine({ initialSceneConfig: {} })

        EngineClock.start(gameEngine_1);
        expect(() => EngineClock.start(gameEngine_2)).toThrowError();
    })

    it("should not throw an error if start again after stopping", () => {
        const gameEngine_1 = new GameEngine({ initialSceneConfig: {} })
        const gameEngine_2 = new GameEngine({ initialSceneConfig: {} })

        EngineClock.start(gameEngine_1);
        EngineClock.stop();

        expect(() => EngineClock.start(gameEngine_2)).not.toThrowError();
    })

    it("should tick correctly", () => {
        const gameEngine = new GameEngine({ initialSceneConfig: {} })
        Time.tickRate = 1; // 1 tick per second
        expect(Time.fixedDeltaTime).toBe(1); // Unit in seconds

        EngineClock.start(gameEngine);
        jest.advanceTimersByTime(3.5 * 1000); // Unit in ms
        EngineClock.stop();

        expect(gameEngine.tick).toBe(4);
    })
})