import { Component, GameEngine, GameObjectConfig, SceneConfig } from "../../src";

class WrongFallingPoint extends Component {
    public override awake(): void {
        this.transform.position.y = 5
    }

    public override fixedUpdate(): void {
        // This is the wrong way of changing the y-position
        // Look at fallingPoint.test.ts for the correct way

        this.transform.position.y -= 1;

        if (this.transform.position.y < 0)
            this.transform.position.y = 0
    }
}

describe("Wrong Falling Point Custom Component", () => {
    it("should not be able to move", () => {
        const fallingPointPrefab: GameObjectConfig = {
            name: "FallingPoint",
            transform: { position: { x: 0, y: 10, z: 0 } },
            components: [{ component: WrongFallingPoint }]
        }

        const sceneConfig: SceneConfig = {
            gameObjects: [fallingPointPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig })

        const fallingPointInstance = gameEngine.findGameObjectByName("FallingPoint");
        expect(fallingPointInstance).toBeDefined();
        expect(fallingPointInstance?.transform.position).toStrictEqual(fallingPointPrefab.transform.position);
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual(fallingPointPrefab.transform.position);

        gameEngine.awake();
        expect(fallingPointInstance?.transform.position).toStrictEqual(fallingPointPrefab.transform.position);
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual(fallingPointPrefab.transform.position);

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual(fallingPointPrefab.transform.position);
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual(fallingPointPrefab.transform.position);
    })
})