import { GameObject } from "../GameObject"
export { GameObject } from "../GameObject" // For Transform to use

export type AbstractComponentConstructor<T extends Component, F extends ComponentFields> = abstract new (gameObject: GameObject, fields: F) => T;

export type ComponentConstructor<T extends Component, F extends ComponentFields> = new (gameObject: GameObject, fields: F) => T;

export interface ComponentConfig<T extends Component, F extends ComponentFields = ComponentFields> {
    // Match the constructor signature of Component
    component: ComponentConstructor<T, F>
    componentFields?: F
}

export interface ComponentFields {

}

export abstract class Component {
    private _gameObject: GameObject;

    constructor(gameObject: GameObject, fields: ComponentFields) {
        this._gameObject = gameObject;
    }

    public get transform() { return this._gameObject.transform }

    public getComponent<T extends Component, F extends ComponentFields>(componentClass: ComponentConstructor<T, F>): T | undefined {
        return this._gameObject.getComponent(componentClass)
    }

    public awake(): void { }
    public earlyUpdate(): void { }
    public fixedUpdate(): void { }
    public onDestroy(): void { }
}