import { AbstractComponentConstructor, Component, ComponentConfig, ComponentConstructor, ComponentFields, Transform, TransformFields } from "../Component";

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

    public getAbstractComponent<T extends Component, F extends ComponentFields>(abstractComponentClass: AbstractComponentConstructor<T, F>): T | undefined {
        const component = this._components.find(component => component instanceof abstractComponentClass);

        if (!component)
            return undefined

        return component as T;
    }

    public hasComponent<T extends Component, F extends ComponentFields>(componentClass: ComponentConstructor<T, F>): boolean {
        const component = this.getComponent(componentClass);

        if (!component)
            return false

        return true;
    }

    // PRIVATE METHODS
    private createComponents(configs?: ComponentConfig<any, any>[]): Component[] {
        if (!configs)
            return new Array<Component>();


        return configs.map(config => {
            if (config.component === undefined)
                throw new Error("Component Constructor is undefined! This may occur due to circular dependencies. Have you defined the class before passing it in the game object config?");

            return new config.component(this, config.componentFields ? config.componentFields : {})
        })
    }
}

