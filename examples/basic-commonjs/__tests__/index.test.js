const { GameEngine, defaultConfig } = require("@headless-game-engine/core");

describe("Basic CommonJS Example", () => {
    it("should have a game engine", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine).toBeDefined();
        expect(gameEngine).toBeInstanceOf(GameEngine);
        expect(gameEngine).not.toBeNull();
    })
})