import { Vector3 } from "../types";
import { Component, ComponentFields, GameObject } from "./Component";

export interface TransformFields extends ComponentFields {
    position: Vector3
}

export class Transform extends Component {
    private _position: Vector3;
    private _previousPosition: Vector3;

    constructor(gameObject: GameObject, fields: TransformFields) {
        super(gameObject, fields);
        this._position = { ...fields.position };
        this._previousPosition = { ...fields.position };
    }

    public get position() { return { ...this._position } }
    public set position(value) { this._position = { ...value } }

    public get previousPosition() { return { ...this._previousPosition } }

    public override earlyUpdate(): void {
        this._previousPosition = { ...this._position };
    }
}