import { GameEngine } from "@headless-game-engine/core";
import { EngineClock, Time } from "@headless-game-engine/clock";

describe("GameEngine", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');
        jest.spyOn(global, 'setTimeout');

        Time.resetToDefaultValues();
    })

    afterEach(() => {
        jest.clearAllTimers();
    })

    it("should initialize correctly", () => {
        const gameEngine = new GameEngine({
            initialSceneConfig: {
                gameObjects: [
                    {
                        name: "Dummy",
                        transform: { position: { x: 0, y: 0, z: 0 } }
                    }
                ]
            }
        });

        expect(gameEngine.tick).toStrictEqual(0);
        expect(gameEngine.findGameObjectByName("Dummy")).toBeDefined();
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