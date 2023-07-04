import { ComponentConfig, GameObject, Scene, SceneConfig, Vector2 } from "@headless-game-engine/core";
import { BoxCollider2D, BoxCollider2DConfig } from "../BoxCollider2D";


describe("BoxCollider2D: Line Segment Intersection", () => {

    let boxCollider: BoxCollider2D

    beforeEach(() => {
        const boxColliderComponent = new BoxCollider2DConfig({ size: { x: 4, y: 4 } })

        const gameObject = new GameObject({
            name: "Box",
            transform: { position: { x: 7, y: 2, z: 0 } },
            components: [boxColliderComponent]
        })

        boxCollider = gameObject.getComponent(BoxCollider2D)!;
    })

    it("should be able to find the intersection point without padding", () => {
        const pointA: Vector2 = { x: 1, y: 7 };
        const pointB: Vector2 = { x: 6, y: 2 };

        const intersection = boxCollider.getIntersectionWithLineSegment(pointA, pointB);
        expect(intersection).toBeDefined();

        const { point } = intersection!;
        expect(point.x).toBeCloseTo(5);
        expect(point.y).toBeCloseTo(3);
    })

    it("should be able to find the intersection point with padding", () => {
        const pointA: Vector2 = { x: 1, y: 7 };
        const pointB: Vector2 = { x: 6, y: 2 };
        const padding: Vector2 = { x: 1, y: 1 };

        const intersection = boxCollider.getIntersectionWithLineSegment(pointA, pointB, padding);
        expect(intersection).toBeDefined();

        const { point } = intersection!;
        expect(point.x).toBeCloseTo(4);
        expect(point.y).toBeCloseTo(4);
    })

    it("should be able to find the intersection point when touch a corner", () => {
        const pointA: Vector2 = { x: 3, y: 2 };
        const pointB: Vector2 = { x: 7, y: -2 };

        const intersection = boxCollider.getIntersectionWithLineSegment(pointA, pointB);
        expect(intersection).toBeDefined();

        const { point } = intersection!;
        expect(point.x).toBeCloseTo(5);
        expect(point.y).toBeCloseTo(0);
    })

    it("should return undefined if there is no intersection", () => {
        const pointA: Vector2 = { x: 0, y: 2 };
        const pointB: Vector2 = { x: 10, y: -10 };

        const intersection = boxCollider.getIntersectionWithLineSegment(pointA, pointB);
        expect(intersection).toBeUndefined();
    })

})