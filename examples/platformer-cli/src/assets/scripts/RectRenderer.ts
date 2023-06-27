import { Component, ComponentFields, GameObject, Vector2 } from "@headless-game-engine/core";

export interface RectRendererFields extends ComponentFields {
    size: Vector2
}

export class RectRenderer extends Component {
    private _size: Vector2;

    constructor(gameObject: GameObject, fields: RectRendererFields) {
        super(gameObject, fields);
        this._size = fields.size;
    }

    public get size(): Vector2 {
        return this._size;
    }
}