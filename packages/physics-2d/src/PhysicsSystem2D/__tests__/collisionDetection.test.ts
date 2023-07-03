import { GameObject, GameObjectConfig, Scene, SceneConfig } from "@headless-game-engine/core"
import { PhysicsSystem2D, PhysicsSystem2DConfig } from "../PhysicsSystem2D";
import { BoxCollider2DConfig } from "../../BoxCollider2D";

const boxColliderComponent = new BoxCollider2DConfig({ size: { x: 4, y: 4 } })

const dummyPrefab: GameObjectConfig = {
    name: "Dummy",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [boxColliderComponent]
}

const physicsSystemConfig = new PhysicsSystem2DConfig({})

const sceneConfig: SceneConfig = {
    gameObjects: [
        { ...dummyPrefab, name: "Dummy A" },
        { ...dummyPrefab, name: "Dummy B" },
        { ...dummyPrefab, name: "Dummy C" },
    ],
    systems: [physicsSystemConfig]
}

describe("PhysicsSystem2D: Collision Detection", () => {
    let scene: Scene;
    let physicsSystem: PhysicsSystem2D;
    let dummyA: GameObject;
    let dummyB: GameObject;
    let dummyC: GameObject;

    beforeEach(() => {
        scene = new Scene(sceneConfig);

        physicsSystem = scene.getSystem(PhysicsSystem2D)!;
        dummyA = scene.findGameObjectByName("Dummy A")!;
        dummyB = scene.findGameObjectByName("Dummy B")!;
        dummyC = scene.findGameObjectByName("Dummy C")!;

        scene.awake();
    })

    it("should detect 3 pairs of collisions when they are in the same position", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 0, y: 0, z: 0 };
        dummyC.transform.position = { x: 0, y: 0, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(3);
    })

    it("should detect 3 pairs of collisions when they are all overlapping", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 1, y: 1, z: 0 };
        dummyC.transform.position = { x: -1, y: -1, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(3);
    })

    it("should detect 1 pair of collisions when 2 of them are in the same position", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 0, y: 0, z: 0 };
        dummyC.transform.position = { x: 10, y: 10, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(1);
    })

    it("should detect 1 pair of collisions when 2 of them are overlapping", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 2, y: 2, z: 0 };
        dummyC.transform.position = { x: 10, y: 10, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(1);
    })

    it("should detect 1 pair of collisions when 2 of them are touching", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 4, y: 4, z: 0 };
        dummyC.transform.position = { x: 10, y: 10, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(1);
    })

    it("should detect 2 pairs of collisions when 3 of them are touching", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 4, y: 4, z: 0 };
        dummyC.transform.position = { x: -4, y: -4, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(2);
    })

    it("should detect 2 pairs of collisions when 3 of them are overlapping", () => {
        dummyA.transform.position = { x: 0, y: 0, z: 0 };
        dummyB.transform.position = { x: 3, y: 3, z: 0 };
        dummyC.transform.position = { x: -3, y: -3, z: 0 };

        scene.fixedUpdate();

        expect(physicsSystem?.getCollisionCount()).toBe(2);
    })
})