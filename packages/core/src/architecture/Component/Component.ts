import { GameObject } from "../GameObject";

export abstract class Component {
    private _gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    public awake(): void { }
    public fixedUpdate(): void { }
    public earlyUpdate(): void { }
    public lateUpdate(): void { }
}