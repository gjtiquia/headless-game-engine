import { GameEngine, GameObjectConfig, SceneConfig } from "@headless-game-engine/core";
import { BoxCollider2DConfig, PhysicsSystem2DConfig, Rigidbody2DConfig } from "../src";

const boxCollider = new BoxCollider2DConfig({ size: { x: 2, y: 2 } })
const rigidbody = new Rigidbody2DConfig({});

const dummyPrefab: GameObjectConfig = {
    name: "Dummy",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [rigidbody, boxCollider]
}

const physicsSystem = new PhysicsSystem2DConfig({})

const scene: SceneConfig = {
    gameObjects: [dummyPrefab],
    systems: [physicsSystem]
}

describe("Smoke Test", () => {
    it("should not raise any errors", () => {
        const gameEngine = new GameEngine({ initialSceneConfig: scene })

        gameEngine.awake();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();

        expect(gameEngine).toBeTruthy();
    })
})