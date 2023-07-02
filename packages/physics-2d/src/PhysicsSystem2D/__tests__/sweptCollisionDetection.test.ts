import { GameObject, GameObjectConfig, Scene, SceneConfig } from "@headless-game-engine/core"
import { Time } from "@headless-game-engine/clock"
import { Rigidbody2D, Rigidbody2DConfig } from "../../Rigidbody2D"
import { PhysicsSystem2D, PhysicsSystem2DConfig } from "../PhysicsSystem2D"
import { BoxCollider2DConfig } from "../../BoxCollider2D"

const rigidbodyComponent = new Rigidbody2DConfig({})
const boxColliderComponent = new BoxCollider2DConfig({ size: { x: 4, y: 4 } })

const movingPrefab: GameObjectConfig = {
    name: "Moving",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [rigidbodyComponent, boxColliderComponent]
}

const staticPrefab: GameObjectConfig = {
    name: "Static",
    transform: { position: { x: 2, y: 2, z: 0 } },
    components: [boxColliderComponent]
}

const physicsSystem = new PhysicsSystem2DConfig({})

const sceneConfig: SceneConfig = {
    gameObjects: [movingPrefab, staticPrefab],
    systems: [physicsSystem]
}

describe("PhysicsSystem2D: Swept Collision Detection", () => {

    let scene: Scene;
    let movingGameObject: GameObject;
    let movingRigidbody: Rigidbody2D;
    let physicsSystem: PhysicsSystem2D;

    beforeEach(() => {
        Time.resetToDefaultValues();

        scene = new Scene(sceneConfig);

        physicsSystem = scene.getSystem(PhysicsSystem2D)!;

        movingGameObject = scene.findGameObjectByName("Moving")!;
        movingRigidbody = movingGameObject.getComponent(Rigidbody2D)!;

        scene.awake();
    })

    it("should detect collision when a rigidbody overlaps a box collider", () => {
        Time.tickRate = 1;
        movingGameObject.transform.position = { x: 12, y: 12, z: 0 }
        movingRigidbody.setVelocity({ x: -4, y: -4 })

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 8, y: 8, z: 0 });
        expect(physicsSystem.getCollisionCount()).toBe(0);

        scene.fixedUpdate();
        expect(physicsSystem.getCollisionCount()).toBe(1);

        // No Resolution
        // expect(movingGameObject.transform.position).toStrictEqual({ x: 4, y: 4, z: 0 });

        // With Resolution
        expect(movingGameObject.transform.position).toStrictEqual({ x: 6, y: 6, z: 0 });

        //     xxxx
        //     xxxx
        //     xxxx
        //     xxxx
        // oooo
        // oooo
        // oooo
        // oooo
    })

    it("should detect a collision when a rigidbody tunnels through a box collider", () => {
        Time.tickRate = 1;
        movingGameObject.transform.position = { x: 50, y: 50, z: 0 }
        movingRigidbody.setVelocity({ x: -20, y: -20 })

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 30, y: 30, z: 0 });
        expect(physicsSystem.getCollisionCount()).toBe(0);

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 10, y: 10, z: 0 });
        expect(physicsSystem.getCollisionCount()).toBe(0);

        scene.fixedUpdate();
        expect(physicsSystem.getCollisionCount()).toBe(1);

        // No Resolution
        // expect(movingGameObject.transform.position).toStrictEqual({ x: -10, y: -10, z: 0 });

        // With Resolution
        expect(movingGameObject.transform.position).toStrictEqual({ x: 6, y: 6, z: 0 });

        //     xxxx
        //     xxxx
        //     xxxx
        //     xxxx
        // oooo
        // oooo
        // oooo
        // oooo
    })
})