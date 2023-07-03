import { Scene, System, SystemConfig, SystemConstructor, SystemFields } from "@headless-game-engine/core";
import { Collider2D, Rigidbody2D } from "..";

export class PhysicsSystem2DConfig implements SystemConfig<PhysicsSystem2D, PhysicsSystem2DFields> {
    system: SystemConstructor<PhysicsSystem2D, PhysicsSystem2DFields>;
    systemFields: PhysicsSystem2DFields;

    constructor(fields: PhysicsSystem2DFields) {
        this.system = PhysicsSystem2D;
        this.systemFields = fields;
    }
}

export interface PhysicsSystem2DFields extends SystemFields {

}

export class PhysicsSystem2D extends System {
    private _rigidbodies: Rigidbody2D[];
    private _colliders: Collider2D[];
    private _collisions: Map<Collider2D, Collider2D[]>;
    private _collisionCount: number;
    private _enableCollisionResolution: boolean;

    constructor(scene: Scene, fields: PhysicsSystem2DFields) {
        super(scene, fields);

        this._rigidbodies = scene.getComponents(Rigidbody2D);
        this._colliders = scene.getAbstractComponents(Collider2D);
        this._collisions = new Map<Collider2D, Collider2D[]>();
        this._collisionCount = 0;
        this._enableCollisionResolution = true;
    }

    public getCollisionCount(): number {
        return this._collisionCount;
    }

    public toggleCollisionResolution(isEnabled: boolean): void {
        this._enableCollisionResolution = isEnabled;
    }

    public override fixedUpdate(): void {
        this.movementIntegration();
        this.collisionDetection();

        if (this._enableCollisionResolution)
            this.collisionResolution();
    }

    private movementIntegration(): void {
        this._rigidbodies.forEach(rigidbody => {
            rigidbody.cachePositionBeforeIntegration();
            rigidbody.integrateMovement();
        })
    }

    private collisionDetection(): void {
        this.clearCollisions();

        // Narrow phase detection. Inefficient but can do the broad phase detection for optimization later.
        for (let i = 0; i < this._colliders.length; i++) {
            // Start from i + 1 to have unique pairs
            for (let j = i + 1; j < this._colliders.length; j++) {
                const colliderA = this._colliders[i];
                const colliderB = this._colliders[j];

                if (Collider2D.hasCollision(colliderA, colliderB))
                    this.addToCollisions(colliderA, colliderB)
            }
        }
    }

    private clearCollisions(): void {
        this._collisions.clear();
        this._collisionCount = 0;
    }

    private addToCollisions(colliderA: Collider2D, colliderB: Collider2D): void {
        if (!this._collisions.has(colliderA))
            this._collisions.set(colliderA, []);

        this._collisions.get(colliderA)?.push(colliderB);
        this._collisionCount++;
    }

    private collisionResolution(): void {
        this._collisions.forEach((colliders, colliderA) => {
            colliders.forEach(colliderB => {
                if (!Collider2D.hasCollision(colliderA, colliderB))
                    return;

                const colliderAHasRigidbody = colliderA.hasRigidbody();
                const colliderBHasRigidbody = colliderB.hasRigidbody();

                if (colliderAHasRigidbody && colliderBHasRigidbody)
                    throw new Error("Both colliders have rigidbodies! Unsure how to proceed!")

                if (colliderAHasRigidbody && !colliderBHasRigidbody)
                    colliderA.getRigidbody()?.resolveCollisionWithStaticCollider(colliderA, colliderB);

                if (colliderBHasRigidbody && !colliderAHasRigidbody)
                    colliderB.getRigidbody()?.resolveCollisionWithStaticCollider(colliderB, colliderA);
            })
        })
    }
}