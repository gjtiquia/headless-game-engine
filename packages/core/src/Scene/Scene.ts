import { Component, ComponentFields, ComponentConstructor, AbstractComponentConstructor } from "../Component";
import { GameObject, GameObjectConfig } from "../GameObject";
import { System, SystemConfig, SystemConstructor, SystemFields } from "../System";

export interface SceneConfig {
    gameObjects?: GameObjectConfig[]
    systems?: SystemConfig<any, any>[]
}

export class Scene {
    private _gameObjects: GameObject[];
    private _systems: System[];

    constructor(config: SceneConfig) {
        this._gameObjects = createGameObjects(config.gameObjects);
        this._systems = createSystems(this, config.systems)
    }

    public awake(): void {
        this._gameObjects.forEach(gameObject => gameObject.awake());
        this._systems.forEach(system => system.awake());
    }

    public fixedUpdate(): void {
        this._gameObjects.forEach(gameObject => gameObject.earlyUpdate());
        this._systems.forEach(system => system.earlyUpdate());

        this._gameObjects.forEach(gameObject => gameObject.fixedUpdate());
        this._systems.forEach(system => system.fixedUpdate());
    }

    public destroy(): void {
        this._gameObjects.forEach(gameObject => gameObject.destroy());
        this.clearGameObjectsArray();

        this._systems.forEach(system => system.onDestroy());
        this.clearSystemsArray();
    }

    public findGameObjectByName(name: string): GameObject | undefined {
        const gameObject = this._gameObjects.find(gameObject => gameObject.name === name);
        return gameObject;
    }

    public getComponents<T extends Component, F extends ComponentFields>(componentClass: ComponentConstructor<T, F>): T[] {
        // TODO : Would be nice if there was a list of components, so that can keep the reference to that list, no need to run through the entire game object array each time want to cache the list of components

        return this._gameObjects.reduce<T[]>((componentArray, gameObject) => {
            const component = gameObject.getComponent(componentClass);

            if (component)
                componentArray.push(component);

            return componentArray;
        }, [])
    }

    public getAbstractComponents<T extends Component, F extends ComponentFields>(abstractComponentClass: AbstractComponentConstructor<T, F>): T[] {
        // TODO : Would be nice if there was a list of components, so that can keep the reference to that list, no need to run through the entire game object array each time want to cache the list of components

        return this._gameObjects.reduce<T[]>((componentArray, gameObject) => {
            const component = gameObject.getAbstractComponent(abstractComponentClass);

            if (component)
                componentArray.push(component);

            return componentArray;
        }, [])
    }

    public getSystem<T extends System, F extends SystemFields>(systemClass: SystemConstructor<T, F>): T | undefined {
        const system = this._systems.find(system => system instanceof systemClass);

        if (!system)
            return undefined;

        return system as T;
    }

    private clearGameObjectsArray(): void {
        this._gameObjects.length = 0;
    }

    private clearSystemsArray(): void {
        this._systems.length = 0;
    }
}

function createGameObjects(configs?: GameObjectConfig[]): GameObject[] {
    if (configs)
        return configs.map(config => new GameObject(config));

    return new Array<GameObject>();
}

function createSystems(scene: Scene, configs?: SystemConfig<any, any>[]): System[] {
    if (configs)
        return configs.map(config => {
            const fields = config.systemFields ?? {};
            return new config.system(scene, fields)
        });

    return new Array<System>();
}
