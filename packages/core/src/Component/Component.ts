import { GameObject } from "../GameObject"
export { GameObject } from "../GameObject" // For Transform to use

export interface ComponentConfig {
    // Match the constructor signature of Component
    component: new (gameObject: GameObject) => Component
}

export abstract class Component {
    private _gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
    }

    public get transform() { return this._gameObject.transform }

    public awake(): void { }
    public earlyUpdate(): void { }
    public fixedUpdate(): void { }
}