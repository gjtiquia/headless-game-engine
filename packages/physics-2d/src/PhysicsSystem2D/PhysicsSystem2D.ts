import { Scene, System, SystemFields } from "@headless-game-engine/core";
import { Rigidbody2D } from "..";

export interface PhysicsSystem2DFields extends SystemFields {

}

export class PhysicsSystem2D extends System {
    private _rigidbodies: Rigidbody2D[];

    constructor(scene: Scene, fields: PhysicsSystem2DFields) {
        super(scene, fields);

        this._rigidbodies = scene.getComponents(Rigidbody2D);
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
        // TODO
    }

    private collisionResolution(): void {
        // TODO
    }
}