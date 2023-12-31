import { Component, GameEngine, GameObjectConfig, SceneConfig } from "../../src"

class FallingPoint extends Component {
    public override awake(): void {
        this.transform.position = { x: 0, y: 5, z: 0 }
    }

    public override fixedUpdate(): void {
        const currentPosition = this.transform.position;
        currentPosition.y -= 1;

        if (currentPosition.y < 0)
            currentPosition.y = 0

        this.transform.position = currentPosition;
    }

    public helloWorld(): string {
        return "Hello World!";
    }
}

describe("A Falling Point Custom Component", () => {

    it("should be able to fall from y = 5 and stay on y = 0", () => {
        const fallingPointPrefab: GameObjectConfig = {
            name: "FallingPoint",
            transform: { position: { x: 0, y: 10, z: 0 } },
            components: [{ component: FallingPoint }]
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
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 5, z: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual(fallingPointPrefab.transform.position); // expected because value is copied on GameObject.earlyUpdate

        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 4, z: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 5, z: 0 });

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 2, z: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 3, z: 0 });

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 0, z: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 1, z: 0 });

        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        expect(fallingPointInstance?.transform.position).toStrictEqual({ x: 0, y: 0, z: 0 });
        expect(fallingPointInstance?.transform.previousPosition).toStrictEqual({ x: 0, y: 0, z: 0 });
    })

    it("should be able to get component", () => {
        const fallingPointPrefab: GameObjectConfig = {
            name: "FallingPoint",
            transform: { position: { x: 0, y: 10, z: 0 } },
            components: [{ component: FallingPoint }]
        }

        const sceneConfig: SceneConfig = {
            gameObjects: [fallingPointPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig })

        const fallingPointInstance = gameEngine.findGameObjectByName("FallingPoint");

        const fallingPointComponent = fallingPointInstance?.getComponent(FallingPoint);
        expect(fallingPointComponent).toBeDefined();
        expect(fallingPointComponent).toBeInstanceOf(FallingPoint);
        expect(fallingPointComponent?.helloWorld()).toStrictEqual("Hello World!");
    })

    it("should return undefined for component that does not exist", () => {
        class DummyComponent extends Component { }

        const fallingPointPrefab: GameObjectConfig = {
            name: "FallingPoint",
            transform: { position: { x: 0, y: 10, z: 0 } },
            components: [{ component: FallingPoint }]
        }

        const sceneConfig: SceneConfig = {
            gameObjects: [fallingPointPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig })

        const fallingPointInstance = gameEngine.findGameObjectByName("FallingPoint");
        const dummyComponent = fallingPointInstance?.getComponent(DummyComponent);
        expect(dummyComponent).toBeUndefined();
    })
})