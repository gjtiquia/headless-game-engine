import { ComponentConfig, ComponentConstructor, ComponentFields, GameObject, Vector2 } from "@headless-game-engine/core";
import { Collider2D } from "../Collider2D";

const DEFAULT_OFFSET: Vector2 = { x: 0, y: 0 }

export class BoxCollider2DConfig implements ComponentConfig<BoxCollider2D, BoxCollider2DFields> {
    component: ComponentConstructor<BoxCollider2D, BoxCollider2DFields>;
    componentFields?: BoxCollider2DFields | undefined;

    constructor(fields: BoxCollider2DFields) {
        this.component = BoxCollider2D;
        this.componentFields = fields;
    }
}

export interface BoxCollider2DFields extends ComponentFields {
    size: Vector2,
    offset?: Vector2
}

export class BoxCollider2D extends Collider2D {
    // Remember that the transform.position = the center by default
    private _size: Vector2;
    private _offset: Vector2;

    constructor(gameObject: GameObject, fields: BoxCollider2DFields) {
        super(gameObject, fields);
        this._size = fields.size;
        this._offset = fields.offset ?? DEFAULT_OFFSET;
    }

    public override isIntersectingWith(collider: Collider2D): boolean {
        if (collider instanceof BoxCollider2D) {
            return this.isIntersectingWithBoxCollider(collider);
        }

        throw new Error(`Did not implement intersection logic with ${typeof collider}!`)
    }

    private isIntersectingWithBoxCollider(boxCollider: BoxCollider2D): boolean {
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection#aabb_vs._aabb

        return (
            this.minX <= boxCollider.maxX &&
            this.maxX >= boxCollider.minX &&

            this.minY <= boxCollider.maxY &&
            this.maxY >= boxCollider.minY
        );
    }

    private get minX() {
        return this.transform.position.x - (this._size.x / 2) + this._offset.x
    }

    private get maxX() {
        return this.transform.position.x + (this._size.x / 2) + this._offset.x
    }

    private get minY() {
        return this.transform.position.y - (this._size.y / 2) + this._offset.y
    }

    private get maxY() {
        return this.transform.position.y + (this._size.y / 2) + this._offset.y
    }
}