import { Component, ComponentFields, GameObject, Vector2 } from "@headless-game-engine/core";

const DEFAULT_CHARACTER = "x";

export interface RectRendererFields extends ComponentFields {
    size: Vector2
    character?: string
}

export class RectRenderer extends Component {
    private _size: Vector2;
    private _character: string;

    constructor(gameObject: GameObject, fields: RectRendererFields) {
        super(gameObject, fields);
        this._size = fields.size;
        this._character = fields.character ? fields.character : DEFAULT_CHARACTER;
    }

    public get size(): Vector2 {
        return this._size;
    }

    public get character(): string {
        return this._character;
    }

    public setSize(size: Vector2) {
        this._size = size;
    }

    public setCharacter(character: string) {
        this._character = character;
    }
}