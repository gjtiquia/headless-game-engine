import { Component, ComponentConfig, ComponentConstructor, ComponentFields, Transform, TransformFields } from "../Component";

export interface GameObjectConfig {
    // Required
    name: string
    transform: TransformFields,

    // Optional
    components?: ComponentConfig<any, any>[]
}

export class GameObject {
    private _name: string;
    private _components: Component[];
    private _transform: Transform;

    constructor(config: GameObjectConfig) {
        this._name = config.name;

        this._components = this.createComponents(config.components);

        this._transform = new Transform(this, config.transform);
        this._components.push(this._transform);
    }

    // PUBLIC GETTERS
    public get name(): string { return this._name };
    public get transform(): Transform { return this._transform };

    // PUBLIC LIFECYCLE METHODS
    public awake(): void {
        this._components.forEach(component => component.awake());
    }

    public earlyUpdate(): void {
        this._components.forEach(component => component.earlyUpdate());
    }

    public fixedUpdate(): void {
        this._components.forEach(component => component.fixedUpdate());
    }

    public destroy(): void {
        this._components.forEach(component => component.onDestroy());
    }

    // PUBLIC METHODS
    public getComponent<T extends Component, F extends ComponentFields>(componentClass: ComponentConstructor<T, F>): T | undefined {
        const component = this._components.find(component => component instanceof componentClass);

        if (!component)
            return undefined

        return component as T;
    }

    // PRIVATE METHODS
    private createComponents(configs?: ComponentConfig<any, any>[]): Component[] {
        if (configs)
            return configs.map(config => new config.component(this, config.componentFields ? config.componentFields : {}))

        return new Array<Component>();
    }
}

