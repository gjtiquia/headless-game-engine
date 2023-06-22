import { Vector2 } from "../types";
import { Component, GameObject } from "./Component";

export class Transform extends Component {
    private _position: Vector2;
    private _previousPosition: Vector2;

    constructor(gameObject: GameObject, initialPosition: Vector2) {
        super(gameObject);
        this._position = { ...initialPosition };
        this._previousPosition = { ...initialPosition };
    }

    public get position() { return { ...this._position } }
    public set position(value) { this._position = { ...value } }
    public get previousPosition() { return { ...this._previousPosition } }

    public override earlyUpdate(): void {
        this._previousPosition = { ...this._position };
    }
}