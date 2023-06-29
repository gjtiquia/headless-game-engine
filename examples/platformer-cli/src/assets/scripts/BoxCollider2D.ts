import { Component, ComponentFields, GameObject, Vector2 } from "@headless-game-engine/core";

const DEFAULT_OFFSET: Vector2 = { x: 0, y: 0 }

export interface BoxCollider2DFields extends ComponentFields {
    size: Vector2,
    offset?: Vector2
}

export class BoxCollider2D extends Component {
    private _size: Vector2;
    private _offset: Vector2;

    constructor(gameObject: GameObject, fields: BoxCollider2DFields) {
        super(gameObject, fields);

        this._size = fields.size;
        this._offset = fields.offset ? fields.offset : DEFAULT_OFFSET;
    }

    public isPointInsideCollider(point: Vector2): boolean {

        const bottomLeftPoint = this.getBottomLeftPoint();
        const topRightPoint = this.getTopRightPoint();

        if (point.x < bottomLeftPoint.x) return false;
        if (point.x >= topRightPoint.x) return false;
        if (point.y < bottomLeftPoint.y) return false;
        if (point.y >= topRightPoint.y) return false;

        return true;
    }

    private getBottomLeftPoint(): Vector2 {
        const currentPosition = this.transform.position;

        const x = currentPosition.x - this._offset.x;
        const y = currentPosition.y - this._offset.y;

        return { x, y }
    }

    private getTopRightPoint(): Vector2 {
        const bottomLeftPoint = this.getBottomLeftPoint();

        const x = bottomLeftPoint.x + this._size.x;
        const y = bottomLeftPoint.y + this._size.y;

        return { x, y }
    }
}