import { GameEngine } from "@headless-game-engine/core";

describe("GameEngine", () => {
    it("should initialize correctly", () => {
        const gameEngine = new GameEngine({ initialSceneConfig: {} });

        expect(gameEngine.tick).toStrictEqual(0);
    })
})