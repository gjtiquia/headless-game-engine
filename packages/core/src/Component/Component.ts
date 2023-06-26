import { GameObject } from "../GameObject"
export { GameObject } from "../GameObject" // For Transform to use

export type ComponentConstructor<T extends Component> = new (gameObject: GameObject, fields: ComponentFields) => T;

export interface ComponentConfig {
    // Match the constructor signature of Component
    component: ComponentConstructor<Component>
    componentFields?: ComponentFields
}

export interface ComponentFields {

}

export abstract class Component {
    private _gameObject: GameObject;

    constructor(gameObject: GameObject, fields: ComponentFields) {
        this._gameObject = gameObject;
    }

    public get transform() { return this._gameObject.transform }

    public awake(): void { }
    public earlyUpdate(): void { }
    public fixedUpdate(): void { }
    public onDestroy(): void { }
}