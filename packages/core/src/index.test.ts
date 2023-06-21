import { GameEngine, defaultConfig } from "./index";

describe("Basic TypeScript Example", () => {
    it("should have a game engine", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine).toBeDefined();
        expect(gameEngine).toBeInstanceOf(GameEngine);
        expect(gameEngine).not.toBeNull();
    })
})