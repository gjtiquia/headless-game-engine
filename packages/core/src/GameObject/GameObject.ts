import { Vector3 } from "../types";
import { Component, ComponentConfig, Transform } from "../Component";

export interface GameObjectConfig {
    // Required
    name: string
    position: Vector3, // TODO : This should be a serialized field of Transform

    // Optional
    components?: ComponentConfig[]
}

export class GameObject {
    private _name: string;
    private _components: Component[];
    private _transform: Transform;

    constructor(config: GameObjectConfig) {
        this._name = config.name;

        this._components = this.createComponents(config.components);

        this._transform = new Transform(this, config.position);
        this._components.push(this._transform);
    }

    public get name(): string { return this._name };
    public get transform(): Transform { return this._transform };

    public awake(): void {
        this._components.forEach(component => component.awake());
    }

    public earlyUpdate(): void {
        this._components.forEach(component => component.earlyUpdate());
    }

    public fixedUpdate(): void {
        this._components.forEach(component => component.fixedUpdate());
    }

    private createComponents(configs?: ComponentConfig[]): Component[] {
        if (configs)
            return configs.map(config => new config.component(this))

        return new Array<Component>();
    }
}

