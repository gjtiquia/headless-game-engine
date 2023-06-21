import { GameEngine, defaultConfig } from "./GameEngine";

describe("Game Engine", () => {
    it("should initialize correctly", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine.tick).toStrictEqual(0);
    })

    it("should tick correctly", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine.tick).toStrictEqual(0);

        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(1);

        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(2);

        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(3);
    })

    it("should reinitialize correctly", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine.tick).toStrictEqual(0);

        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(1);

        gameEngine.initialize();

        expect(gameEngine.tick).toStrictEqual(0);

        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(1);
    })
})