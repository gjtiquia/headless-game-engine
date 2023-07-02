import { GameObject, GameObjectConfig, Scene, SceneConfig } from "@headless-game-engine/core"
import { Rigidbody2D, Rigidbody2DConfig } from "."
import { PhysicsSystem2DConfig } from ".."
import { Time } from "@headless-game-engine/clock"

const rigidbodyComponent = new Rigidbody2DConfig({})

const dummyPrefab: GameObjectConfig = {
    name: "Dummy",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [rigidbodyComponent]
}

const physicsSystem = new PhysicsSystem2DConfig({})

const sceneConfig: SceneConfig = {
    gameObjects: [dummyPrefab],
    systems: [physicsSystem]
}

describe("Rigidbody2D", () => {
    let scene: Scene;
    let dummyGameObject: GameObject;
    let dummyRigidbody: Rigidbody2D;

    beforeEach(() => {
        Time.resetToDefaultValues();

        scene = new Scene(sceneConfig);

        dummyGameObject = scene.findGameObjectByName("Dummy")!;
        dummyRigidbody = dummyGameObject.getComponent(Rigidbody2D)!;

        scene.awake();
    })

    it("should be in the position set in scene before fixed update", () => {
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 0, y: 0, z: 0 });
    })

    it("should not move when the velocity is zero and acceleration is zero", () => {
        Time.tickRate = 1;
        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 0, y: 0, z: 0 });
    })

    it("(tickRate = 1) should move in a constant speed when the velocity non-zero and acceleration is zero", () => {
        Time.tickRate = 1;
        dummyRigidbody.setVelocity({ x: 1, y: 1 })

        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 1, y: 1, z: 0 });

        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 2, y: 2, z: 0 });

        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 3, y: 3, z: 0 });
    })

    it("(tickRate = 2) should move in a constant speed when the velocity non-zero and acceleration is zero", () => {
        Time.tickRate = 2;
        dummyRigidbody.setVelocity({ x: 1, y: 1 })

        scene.fixedUpdate();
        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 1, y: 1, z: 0 });

        scene.fixedUpdate();
        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 2, y: 2, z: 0 });

        scene.fixedUpdate();
        scene.fixedUpdate();
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 3, y: 3, z: 0 });
    })

    it("should move in an increasing speed when force is applied in every frame", () => {
        Time.tickRate = 1;
        dummyRigidbody.setVelocity({ x: 0, y: 0 })

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 1, y: 1 });

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 2, y: 2 });

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 3, y: 3 });
    })

    it("should change position exponentially when force is applied in every frame", () => {
        Time.tickRate = 1;
        dummyRigidbody.setVelocity({ x: 0, y: 0 })

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 1, y: 1 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 1, y: 1, z: 0 });

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 2, y: 2 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 3, y: 3, z: 0 });

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 3, y: 3 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 6, y: 6, z: 0 });

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 4, y: 4 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 10, y: 10, z: 0 });
    })

    it("should stay in constant speed when force is no longer added after a few frames", () => {
        Time.tickRate = 1;

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 1, y: 1 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 1, y: 1, z: 0 });

        dummyRigidbody.addForce({ x: 1, y: 1 });
        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 2, y: 2 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 3, y: 3, z: 0 });

        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 2, y: 2 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 5, y: 5, z: 0 });

        scene.fixedUpdate();
        expect(dummyRigidbody.getVelocity()).toStrictEqual({ x: 2, y: 2 });
        expect(dummyGameObject.transform.position).toStrictEqual({ x: 7, y: 7, z: 0 });
    })
})