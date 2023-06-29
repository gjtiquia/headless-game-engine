import { GameEngine, Vector2 } from "@headless-game-engine/core";
import { BoxCollider2D } from "./assets/index.js";

export abstract class Physics2D {
    private static _boxColliders: BoxCollider2D[]

    public static initialize(gameEngine: GameEngine) {
        this._boxColliders = gameEngine.getComponents(BoxCollider2D);
    }

    public static raycastPoint(point: Vector2): BoxCollider2D[] {
        if (!this._boxColliders)
            throw new Error("BoxColliders undefined! Have you initialized Physics2D?");

        return this._boxColliders.reduce<BoxCollider2D[]>((arr, collider) => {

            if (collider.isPointInsideCollider(point))
                arr.push(collider);

            return arr;
        }, [])
    }
}