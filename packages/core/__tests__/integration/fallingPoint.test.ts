import { Component, GameEngine, GameObjectConfig, SceneConfig } from "../../src"

class FallingPoint extends Component {
    public override awake(): void {
        this.transform.position = { x: 0, y: 5 }
    }

    public override fixedUpdate(): void {
        const currentPosition = this.transform.position;
        currentPosition.y -= 1;

        if (currentPosition.y < 0)
            currentPosition.y = 0

        this.transform.position = currentPosition;
    }
}

describe("A Falling Point Custom Component", () => {

    it("should be able to fall from y = 5 and stay on y = 0", () => {
        const fallingPointPrefab: GameObjectConfig = {
            name: "FallingPoint",
            initialPosition: { x: 0, y: 10 },
            initialComponents: [{ component: FallingPoint }]
        }

        const sceneConfig: SceneConfig = {
            initialGameObjects: [fallingPointPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig })

        const fallingPointInstance = gameEngine.findGameObjectByName("FallingPoint");
        expect(fallingPointInstance).toBeDefined();
        expect(fallingPointInstance?.transform.position).toStrictEqual(fallingPointPrefab.initialPosition);
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual(fallingPointPrefab.initialPosition);

        gameEngine.awake();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 5 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual(fallingPointPrefab.initialPosition); // expected because value is copied on GameObject.earlyUpdate

        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 4 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 5 });

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 2 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 3 });

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 1 });

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 0 });
    })
})