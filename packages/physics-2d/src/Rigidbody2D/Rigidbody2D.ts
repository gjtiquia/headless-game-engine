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
    private _velocity: Vector2;

    constructor(gameObject: GameObject, fields: Rigidbody2DFields) {
        super(gameObject, fields)

        this._cachedPositionBeforeIntegration = { x: 0, y: 0 };
        this._velocity = { x: 0, y: 0 };
    }

    public addForce(force: Vector2): void {
        // dF = m * da
        // Assuming mass = 1 and force is applied over time 
        // => da = dF

        // da = dv/dt 
        // => dv = da * dt 
        // => dv = dF * dt

        this._velocity.x += force.x * Time.fixedDeltaTime;
        this._velocity.y += force.y * Time.fixedDeltaTime;
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
        const position = this.transform.position;

        position.x += this._velocity.x * Time.fixedDeltaTime;
        position.y += this._velocity.y * Time.fixedDeltaTime;

        this.transform.position = position;
    }

    public hasContinuousCollisionWithStaticCollider(rigidbodyCollider: Collider2D, staticCollider: Collider2D): boolean {
        if (rigidbodyCollider instanceof BoxCollider2D && staticCollider instanceof BoxCollider2D)
            return this.checkIfAABBHasContinousCollisionWithStaticAABB(rigidbodyCollider, staticCollider);

        throw new Error(`Did not implement continous collision detection logic between rigidbody ${typeof rigidbodyCollider} and static ${typeof staticCollider}!`)
    }

    public checkIfAABBHasContinousCollisionWithStaticAABB(thisCollider: BoxCollider2D, staticCollider: BoxCollider2D): boolean {
        // References:
        // https://noonat.github.io/intersect/#aabb-vs-swept-aabb
        // https://www.emanueleferonato.com/2021/10/21/understanding-physics-continuous-collision-detection-using-swept-aabb-method-and-minkowski-sum/

        const cachedPosition = this.getCachedPositionBeforeIntegration();
        const currentPosition = this.transform.position;
        const padding = { x: thisCollider.half.x, y: thisCollider.half.y };

        return staticCollider.isIntersectingWithLineSegment(cachedPosition, currentPosition, padding)
    }

    public resolveCollisionWithStaticCollider(rigidbodyCollider: Collider2D, staticCollider: Collider2D): void {
        if (rigidbodyCollider instanceof BoxCollider2D && staticCollider instanceof BoxCollider2D)
            this.resolveAABBCollisionWithStaticAABB(rigidbodyCollider, staticCollider);
        else
            throw new Error(`Did not implement resolution logic between ${typeof rigidbodyCollider} and ${typeof staticCollider}!`)
    }

    private resolveAABBCollisionWithStaticAABB(rigidbodyCollider: BoxCollider2D, staticCollider: BoxCollider2D): void {

        const pointA: Vector2 = this.getCachedPositionBeforeIntegration();
        const pointB = this.transform.position;
        const padding: Vector2 = rigidbodyCollider.half

        const intersection = staticCollider.getIntersectionWithLineSegment(pointA, pointB, padding);
        if (!intersection) return;

        this.transform.position = { ...intersection!, z: pointB.z };

        // TODO : Take velocity into account for bounce / slide

        //! temporarily hardcode for platformer to only resolve vertical collision
        this._velocity.y = 0;
        this.transform.position = { ...intersection!, x: pointB.x, z: pointB.z };
    }
}