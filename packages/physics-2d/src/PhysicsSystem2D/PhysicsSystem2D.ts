import { Scene, System, SystemConfig, SystemConstructor, SystemFields } from "@headless-game-engine/core";
import { Collider2D, Rigidbody2D } from "..";

export class PhysicsSystem2DConfig implements SystemConfig<PhysicsSystem2D, PhysicsSystem2DFields> {
    system: SystemConstructor<PhysicsSystem2D, PhysicsSystem2DFields>;
    systemFields?: PhysicsSystem2DFields | undefined;

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

    constructor(scene: Scene, fields: PhysicsSystem2DFields) {
        super(scene, fields);

        this._rigidbodies = scene.getComponents(Rigidbody2D);
        this._colliders = scene.getAbstractComponents(Collider2D);
        this._collisions = new Map<Collider2D, Collider2D[]>();
        this._collisionCount = 0;
    }

    public getCollisionCount(): number {
        return this._collisionCount;
    }

    public override fixedUpdate(): void {
        this.movementIntegration();
        this.collisionDetection();
        this.collisionResolution();
    }

    private movementIntegration(): void {
        this._rigidbodies.forEach(rigidbody => {
            rigidbody.cachePositionBeforeIntegration();
            rigidbody.integrateMovement();
        })
    }

    private collisionDetection(): void {
        this._collisions.clear();
        this._collisionCount = 0;

        // Narrow phase detection. Inefficient but can do the broad phase detection for optimization later.
        for (let i = 0; i < this._colliders.length; i++) {
            // Start from i + 1 to have unique pairs
            for (let j = i + 1; j < this._colliders.length; j++) {
                const colliderA = this._colliders[i];
                const colliderB = this._colliders[j];

                // TODO : Ignore if both colliders are static

                if (!colliderA.isIntersectingWith(colliderB)) continue;

                if (!this._collisions.has(colliderA))
                    this._collisions.set(colliderA, []);

                this._collisions.get(colliderA)?.push(colliderB);
                this._collisionCount++;
            }
        }
    }

    private collisionResolution(): void {
        // TODO
    }
}