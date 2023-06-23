const { GameEngine } = require("@headless-game-engine/core");

describe("GameEngine", () => {
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
})