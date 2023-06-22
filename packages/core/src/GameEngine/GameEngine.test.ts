import { GameEngine, GameEngineConfig } from "./GameEngine";

describe("Game Engine", () => {
    let defaultConfig: GameEngineConfig;
    beforeEach(() => defaultConfig = { initialSceneConfig: {} })

    it("should initialize correctly", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine.tick).toStrictEqual(0);
    })

    it("should tick correctly", () => {
        const gameEngine = new GameEngine(defaultConfig);
        expect(gameEngine.tick).toStrictEqual(0);

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(3);
    })

    it("should reinitialize correctly", () => {
        const gameEngine = new GameEngine(defaultConfig);

        expect(gameEngine.tick).toStrictEqual(0);

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(2);

        gameEngine.initialize();
        expect(gameEngine.tick).toStrictEqual(0);

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(gameEngine.tick).toStrictEqual(2);
    })
})