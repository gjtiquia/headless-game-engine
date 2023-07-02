import { Component } from "@headless-game-engine/core";
import { Rigidbody2D } from "..";

export abstract class Collider2D extends Component {
    private _rigidbody?: Rigidbody2D;

    public override awake(): void {
        this._rigidbody = this.getComponent(Rigidbody2D);
    }

    public abstract isIntersectingWith(collider: Collider2D): boolean;

    public hasRigidbody(): boolean {
        return (this._rigidbody !== undefined);
    }

    public getRigidbody(): Rigidbody2D | undefined {
        return this._rigidbody;
    }

    public static hasCollision(colliderA: Collider2D, colliderB: Collider2D): boolean {
        return (this.hasDiscreteCollision(colliderA, colliderB) || this.hasContinuousCollision(colliderA, colliderB));
    }

    public static hasDiscreteCollision(colliderA: Collider2D, colliderB: Collider2D): boolean {
        return colliderA.isIntersectingWith(colliderB);
    }

    public static hasContinuousCollision(colliderA: Collider2D, colliderB: Collider2D): boolean {
        const colliderAHasRigidbody = colliderA.hasRigidbody();
        const colliderBHasRigidbody = colliderB.hasRigidbody();

        if (!colliderAHasRigidbody && !colliderBHasRigidbody)
            return false;

        if (colliderAHasRigidbody && colliderBHasRigidbody)
            throw new Error("Both colliders have rigidbodies! Unsure how to proceed!")

        if (colliderAHasRigidbody && !colliderBHasRigidbody)
            return colliderA.getRigidbody()!.hasContinuousCollisionWithStaticCollider(colliderA, colliderB);

        if (colliderBHasRigidbody && !colliderAHasRigidbody)
            return colliderB.getRigidbody()!.hasContinuousCollisionWithStaticCollider(colliderB, colliderA);

        throw new Error("Unimplemented case for continous collision detection!")
    }
}