import { GameEngine, GameObjectConfig, SceneConfig, Vector2 } from "@headless-game-engine/core"
import { BoxCollider2D, BoxCollider2DConfig } from "./BoxCollider2D"
import { Collider2D } from "..";

describe("BoxCollider2D", () => {
    it("should be able to detect two boxes that are colliding", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxes({ x: 5, y: 5 }, { x: 10, y: 10 });
        const { boxColliderA, boxColliderB } = getBoxColliders(scene)

        expect(boxColliderA.isIntersectingWith(boxColliderB)).toBeTruthy();
    })

    it("should be able to detect two boxes using the parent abstract Collider2D", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxes({ x: 5, y: 5 }, { x: 10, y: 10 });
        const { colliderA, colliderB } = getColliders(scene)

        expect(colliderA.isIntersectingWith(colliderB)).toBeTruthy();
    })

    it("should be able to detect two boxes that are colliding when the edges are touching horizontally side-by-side", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxes({ x: 0, y: 0 }, { x: 20, y: 0 });
        const { boxColliderA, boxColliderB } = getBoxColliders(scene)

        expect(boxColliderA.isIntersectingWith(boxColliderB)).toBeTruthy();
    })

    it("should not intersect if the collider has been offset even with the same position when it was 'touching'", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxesAndOneHasOffset({ x: 0, y: 0 }, { x: 20, y: 0 });
        const { boxColliderA, boxColliderB } = getBoxColliders(scene)

        expect(boxColliderA.isIntersectingWith(boxColliderB)).toBeFalsy();
    })

    it("should be able to detect two boxes that are colliding when stacked on each other", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxes({ x: 0, y: 0 }, { x: 0, y: 10 });
        const { boxColliderA, boxColliderB } = getBoxColliders(scene)

        expect(boxColliderA.isIntersectingWith(boxColliderB)).toBeTruthy();
    })

    it("should not intersect if the collider has been offset even with the same position when it was 'stacking'", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxesAndOneHasOffset({ x: 0, y: 0 }, { x: 0, y: 10 });
        const { boxColliderA, boxColliderB } = getBoxColliders(scene)

        expect(boxColliderA.isIntersectingWith(boxColliderB)).toBeFalsy();
    })

    it("should return false if they are not intersecting", () => {
        const scene: SceneConfig = givenSceneWithTwoBoxes({ x: 0, y: 0 }, { x: 0, y: 20 });
        const { boxColliderA, boxColliderB } = getBoxColliders(scene)

        expect(boxColliderA.isIntersectingWith(boxColliderB)).toBeFalsy();
    })

    it("should throw an error for a collision that has not been implemented", () => {
        const scene: SceneConfig = {
            gameObjects: [
                boxPrefab,
                {
                    name: "Dummy",
                    transform: { position: { x: 0, y: 0, z: 0 } },
                    components: [{ component: DummyCollider }]
                }
            ]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: scene })

        const box = gameEngine.findGameObjectByName("Box")
        const boxCollider = box?.getComponent(BoxCollider2D)

        if (!boxCollider)
            throw new Error("box does not have BoxCollider2D component!")

        const dummy = gameEngine.findGameObjectByName("Dummy")
        const dummyCollider = dummy?.getComponent(DummyCollider)

        if (!dummyCollider)
            throw new Error("dummy does not have DummyCollider component!")

        expect(() => boxCollider.isIntersectingWith(dummyCollider)).toThrowError();
    })
})

const boxColllider2DComponent = new BoxCollider2DConfig({
    size: { x: 20, y: 10 }
})

const boxPrefab: GameObjectConfig = {
    name: "Box",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [boxColllider2DComponent]
}

const boxColllider2DComponentWithOffset = new BoxCollider2DConfig({
    size: { x: 20, y: 10 },
    offset: { x: 1, y: 1 }
})

const boxPrefabWithOffset: GameObjectConfig = {
    name: "Box",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [boxColllider2DComponentWithOffset]
}

class DummyCollider extends Collider2D {
    public override isIntersectingWithLineSegment(pointA: Vector2, pointB: Vector2): boolean {
        return false;
    }

    public override isIntersectingWith(collider: Collider2D): boolean {
        return false;
    }
}

function givenSceneWithTwoBoxes(position1: Vector2, position2: Vector2): SceneConfig {
    return {
        gameObjects: [
            {
                ...boxPrefab,
                name: "Box 1",
                transform: { position: { ...position1, z: 0 } }
            },
            {
                ...boxPrefab,
                name: "Box 2",
                transform: { position: { ...position2, z: 0 } }
            }
        ]
    }
}

function givenSceneWithTwoBoxesAndOneHasOffset(position1: Vector2, position2: Vector2): SceneConfig {
    return {
        gameObjects: [
            {
                ...boxPrefab,
                name: "Box 1",
                transform: { position: { ...position1, z: 0 } }
            },
            {
                ...boxPrefabWithOffset,
                name: "Box 2",
                transform: { position: { ...position2, z: 0 } }
            }
        ]
    }
}

function getBoxColliders(scene: SceneConfig) {
    const gameEngine = new GameEngine({ initialSceneConfig: scene })

    const boxA = gameEngine.findGameObjectByName("Box 1")
    const boxColliderA = boxA?.getComponent(BoxCollider2D)

    if (!boxColliderA)
        throw new Error("box A does not have BoxCollider2D component!")

    const boxB = gameEngine.findGameObjectByName("Box 2")
    const boxColliderB = boxB?.getComponent(BoxCollider2D)

    if (!boxColliderB)
        throw new Error("box B does not have BoxCollider2D component!")

    return { boxColliderA, boxColliderB }
}

function getColliders(scene: SceneConfig) {
    const gameEngine = new GameEngine({ initialSceneConfig: scene })

    const boxA = gameEngine.findGameObjectByName("Box 1")
    const colliderA = boxA?.getAbstractComponent(Collider2D)

    if (!colliderA)
        throw new Error("box A does not have Collider2D component!")

    const boxB = gameEngine.findGameObjectByName("Box 2")
    const colliderB = boxB?.getAbstractComponent(Collider2D)

    if (!colliderB)
        throw new Error("box B does not have Collider2D component!")

    return { colliderA, colliderB }
}


