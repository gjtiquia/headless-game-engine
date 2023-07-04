import { GameObject, GameObjectConfig, Scene, SceneConfig } from "@headless-game-engine/core"
import { Time } from "@headless-game-engine/clock"
import { Rigidbody2D, Rigidbody2DConfig } from "../../Rigidbody2D"
import { PhysicsSystem2D, PhysicsSystem2DConfig } from "../PhysicsSystem2D"
import { BoxCollider2D, BoxCollider2DConfig } from "../../BoxCollider2D"

const rigidbodyComponent = new Rigidbody2DConfig({})
const boxColliderComponent = new BoxCollider2DConfig({ size: { x: 4, y: 4 } })

const movingPrefab: GameObjectConfig = {
    name: "Moving",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [rigidbodyComponent, boxColliderComponent]
}

const staticPrefab: GameObjectConfig = {
    name: "Static",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [boxColliderComponent]
}

const physicsSystem = new PhysicsSystem2DConfig({})

const sceneConfig: SceneConfig = {
    gameObjects: [movingPrefab, staticPrefab],
    systems: [physicsSystem]
}

describe("PhysicsSystem2D: Swept Collision Resolution", () => {

    let scene: Scene;
    let physicsSystem: PhysicsSystem2D;
    let staticGameObject: GameObject;
    let movingGameObject: GameObject;
    let movingRigidbody: Rigidbody2D;
    let movingBoxCollider: BoxCollider2D;

    beforeEach(() => {
        Time.resetToDefaultValues();

        scene = new Scene(sceneConfig);
        physicsSystem = scene.getSystem(PhysicsSystem2D)!;

        staticGameObject = scene.findGameObjectByName("Static")!;

        movingGameObject = scene.findGameObjectByName("Moving")!;
        movingRigidbody = movingGameObject.getComponent(Rigidbody2D)!;
        movingBoxCollider = movingGameObject.getComponent(BoxCollider2D)!;

        scene.awake();
    })

    it("should resolve collision correctly when colliding diagonally with velocity", () => {
        Time.tickRate = 1;

        staticGameObject.transform.position = { x: 7, y: 2, z: 0 };
        movingGameObject.transform.position = { x: 1, y: 7, z: 0 };
        movingRigidbody.setVelocity({ x: 5, y: -5 });
        movingBoxCollider.setSize({ x: 2, y: 2 });

        scene.fixedUpdate();

        expect(physicsSystem.getCollisionCount()).toBe(1);

        expect(movingGameObject.transform.position.x).toBeCloseTo(4);
        expect(movingGameObject.transform.position.y).toBeCloseTo(2);

        expect(movingRigidbody.getVelocity().x).toBeCloseTo(0);
        expect(movingRigidbody.getVelocity().y).toBeCloseTo(-2);
    })

    it("should resolve collision correctly when colliding diagonally with velocity and continue sliding", () => {
        Time.tickRate = 1;

        staticGameObject.transform.position = { x: 7, y: 2, z: 0 };
        movingGameObject.transform.position = { x: 1, y: 7, z: 0 };
        movingRigidbody.setVelocity({ x: 5, y: -5 });
        movingBoxCollider.setSize({ x: 2, y: 2 });

        scene.fixedUpdate();
        scene.fixedUpdate();

        expect(movingRigidbody.getVelocity().y).toBeCloseTo(-2);
        expect(movingGameObject.transform.position.y).toBeCloseTo(0);

        scene.fixedUpdate();

        expect(movingRigidbody.getVelocity().y).toBeCloseTo(-2);
        expect(movingGameObject.transform.position.y).toBeCloseTo(-2);
    })

    it("(diagonal -> horizontal) should resolve collision correctly when a rigidbody overlaps a box collider", () => {
        Time.tickRate = 1;

        staticGameObject.transform.position = { x: 2, y: 2, z: 0 }
        movingGameObject.transform.position = { x: 12, y: 12, z: 0 }
        movingRigidbody.setVelocity({ x: -4, y: -4 })

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 8, y: 8, z: 0 });
        expect(movingRigidbody.getVelocity()).toStrictEqual({ x: -4, y: -4 });
        expect(physicsSystem.getCollisionCount()).toBe(0);

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 4, y: 6, z: 0 });
        expect(movingRigidbody.getVelocity().x).toBeCloseTo(-2);
        expect(movingRigidbody.getVelocity().y).toBeCloseTo(0);
        expect(physicsSystem.getCollisionCount()).toBe(1); // Touching counts as collision

        scene.fixedUpdate();
        expect(movingRigidbody.getVelocity().x).toBeCloseTo(-2);
        expect(movingRigidbody.getVelocity().y).toBeCloseTo(0);
        expect(movingGameObject.transform.position).toStrictEqual({ x: 2, y: 6, z: 0 });
        expect(physicsSystem.getCollisionCount()).toBe(1); // Touching counts as collision
    })

    it("(diagonal -> horizontal) should resolve collision correctly when a rigidbody tunnels through a box collider", () => {
        Time.tickRate = 1;

        staticGameObject.transform.position = { x: 2, y: 2, z: 0 }
        movingGameObject.transform.position = { x: 50, y: 50, z: 0 }
        movingRigidbody.setVelocity({ x: -20, y: -20 })

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 30, y: 30, z: 0 });
        expect(physicsSystem.getCollisionCount()).toBe(0);

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: 10, y: 10, z: 0 });
        expect(physicsSystem.getCollisionCount()).toBe(0);

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: -10, y: 6, z: 0 });
        expect(movingRigidbody.getVelocity().x).toBeCloseTo(-16);
        expect(movingRigidbody.getVelocity().y).toBeCloseTo(0);
        expect(physicsSystem.getCollisionCount()).toBe(1); // Touching counts as collision

        scene.fixedUpdate();
        expect(movingGameObject.transform.position).toStrictEqual({ x: -26, y: 6, z: 0 });
        expect(movingRigidbody.getVelocity().x).toBeCloseTo(-16);
        expect(movingRigidbody.getVelocity().y).toBeCloseTo(0);
        expect(physicsSystem.getCollisionCount()).toBe(0); // Far away from static box, should not have any collision
    })
})