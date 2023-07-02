import { Time } from "@headless-game-engine/clock";
import { Component, ComponentConfig, ComponentConstructor, ComponentFields, GameObject, Vector2 } from "@headless-game-engine/core";
import { Collider2D } from "../Collider2D";
import { BoxCollider2D } from "..";

export class Rigidbody2DConfig implements ComponentConfig<Rigidbody2D, Rigidbody2DFields> {
    component: ComponentConstructor<Rigidbody2D, Rigidbody2DFields>;
    componentFields: Rigidbody2DFields;

    constructor(fields: Rigidbody2DFields) {
        this.component = Rigidbody2D;
        this.componentFields = fields;
    }
}

export interface Rigidbody2DFields extends ComponentFields {

}

export class Rigidbody2D extends Component {
    private _cachedPositionBeforeIntegration: Vector2;
    private _netAcceleration: Vector2;
    private _velocity: Vector2;

    constructor(gameObject: GameObject, fields: Rigidbody2DFields) {
        super(gameObject, fields)

        this._cachedPositionBeforeIntegration = { x: 0, y: 0 };
        this._netAcceleration = { x: 0, y: 0 };
        this._velocity = { x: 0, y: 0 };
    }

    public addForce(force: Vector2): void {
        // F = ma, Assuming mass = 1 and force is applied over time

        this._netAcceleration.x += force.x * Time.fixedDeltaTime;
        this._netAcceleration.y += force.y * Time.fixedDeltaTime;
    }

    public setVelocity(velocity: Vector2): void {
        this._velocity = { ...velocity };
    }

    public getVelocity(): Vector2 {
        return { ...this._velocity };
    }

    public cachePositionBeforeIntegration(): void {
        this._cachedPositionBeforeIntegration = { ...this.transform.position };
    }

    public getCachedPositionBeforeIntegration(): Vector2 {
        return { ...this._cachedPositionBeforeIntegration }
    }

    public integrateMovement(): void {
        this._velocity.x += this._netAcceleration.x;
        this._velocity.y += this._netAcceleration.y;

        const position = this.transform.position;

        position.x += this._velocity.x * Time.fixedDeltaTime;
        position.y += this._velocity.y * Time.fixedDeltaTime;

        this.transform.position = position;
        this._netAcceleration = { x: 0, y: 0 }; // Reset the acceleration
    }

    public resolveCollision(thisCollider: Collider2D, otherCollider: Collider2D) {
        if (thisCollider instanceof BoxCollider2D && otherCollider instanceof BoxCollider2D)
            this.resolveAABBCollisionWithAABB(thisCollider, otherCollider);
        else
            throw new Error(`Did not implement resolution logic between ${typeof thisCollider} and ${typeof otherCollider}!`)
    }

    private resolveAABBCollisionWithAABB(thisCollider: BoxCollider2D, otherCollider: BoxCollider2D) {
        // TODO : Resolve while making use of rigidbody's cached position, velocity etc.
    }
}