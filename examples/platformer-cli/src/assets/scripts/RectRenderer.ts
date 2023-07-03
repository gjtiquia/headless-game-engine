import { Component, ComponentConfig, ComponentConstructor, ComponentFields, GameObject, Vector2 } from "@headless-game-engine/core";

const DEFAULT_OFFSET: Vector2 = { x: 0, y: 0 }
const DEFAULT_CHARACTER = "x";

export class RectRendererConfig implements ComponentConfig<RectRenderer, RectRendererFields> {
    component: ComponentConstructor<RectRenderer, RectRendererFields>;
    componentFields: RectRendererFields;

    constructor(fields: RectRendererFields) {
        this.component = RectRenderer;
        this.componentFields = fields;
    }
}

export interface RectRendererFields extends ComponentFields {
    size: Vector2
    offset?: Vector2
    character?: string

    // TODO : Sorting Order
}

/** The position is at the center of the rect by default. */
export class RectRenderer extends Component {
    private _size: Vector2;
    private _offset: Vector2;
    private _character: string;

    constructor(gameObject: GameObject, fields: RectRendererFields) {
        super(gameObject, fields);
        this._size = fields.size;
        this._offset = fields.offset ? fields.offset : DEFAULT_OFFSET;
        this._character = fields.character ? fields.character : DEFAULT_CHARACTER;
    }

    public get size(): Vector2 {
        return this._size;
    }

    public get character(): string {
        return this._character;
    }

    public get bottomLeftPosition(): Vector2 {
        const currentPosition = this.transform.position;

        const bottomLeftX = currentPosition.x - this._size.x / 2;
        const bottomLeftY = currentPosition.y - this._size.y / 2;

        const offsetX = bottomLeftX - this._offset.x;
        const offsetY = bottomLeftY - this._offset.y;

        return { x: offsetX, y: offsetY }
    }

    public setSize(size: Vector2) {
        this._size = size;
    }

    public setOffset(offset: Vector2) {
        this._offset = offset;
    }

    public setCharacter(character: string) {
        this._character = character;
    }
}