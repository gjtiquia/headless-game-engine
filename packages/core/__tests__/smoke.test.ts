import { GameEngine, GameObject, GameObjectConfig } from "../src"

describe("Smoke Test", () => {
    it("should initialize without any game objects correctly", () => {
        const gameEngine = new GameEngine({ initialSceneConfig: {} })
        expect(gameEngine.tick).toBe(0);
    })

    it("should initialize an empty game object array correctly", () => {
        const gameEngine = new GameEngine({
            initialSceneConfig: {
                initialGameObjects: []
            }
        })

        expect(gameEngine.tick).toBe(0);
    })

    it("should return undefined for a game object that does not exist with the specified name", () => {
        const gameEngine = new GameEngine({ initialSceneConfig: {} })

        const undefinedGameObject = gameEngine.findGameObjectByName("dummy name");
        expect(undefinedGameObject).toBeUndefined();
    })

    it("should successfully find a game object by name", () => {
        const dummyConfig: GameObjectConfig = {
            name: "Dummy",
            initialPosition: { x: 0, y: 0 }
        }

        const gameEngine = new GameEngine({
            initialSceneConfig: {
                initialGameObjects: [dummyConfig]
            }
        })

        const dummy = gameEngine.findGameObjectByName(dummyConfig.name);
        expect(dummy).toBeDefined();
        expect(dummy).toBeInstanceOf(GameObject);
    })

    it("should not have a reference to the config object", () => {
        const dummyConfig: GameObjectConfig = {
            name: "Dummy",
            initialPosition: { x: 0, y: 0 }
        }

        const gameEngine = new GameEngine({
            initialSceneConfig: {
                initialGameObjects: [dummyConfig]
            }
        })

        const dummy = gameEngine.findGameObjectByName(dummyConfig.name);
        expect(dummy?.transform.position).not.toBe(dummyConfig.initialPosition);
        expect(dummy?.transform.position).toStrictEqual(dummyConfig.initialPosition);

        dummyConfig.initialPosition.x = 2;
        expect(dummy?.transform.position).not.toStrictEqual(dummyConfig.initialPosition);
    })
})