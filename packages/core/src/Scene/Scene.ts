import { Component, ComponentFields, ComponentConstructor } from "../Component";
import { GameObject, GameObjectConfig } from "../GameObject";

export interface SceneConfig {
    gameObjects?: GameObjectConfig[]
}

export class Scene {
    private _gameObjects: GameObject[];

    constructor(config: SceneConfig) {
        this._gameObjects = createGameObjects(config.gameObjects);
    }

    public awake(): void {
        this._gameObjects.forEach(gameObject => gameObject.awake());
    }

    public fixedUpdate(): void {
        this._gameObjects.forEach(gameObject => gameObject.earlyUpdate());
        this._gameObjects.forEach(gameObject => gameObject.fixedUpdate());
    }

    public destroy(): void {
        this._gameObjects.forEach(gameObject => gameObject.destroy());
        this.clearGameObjectsArray();
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

    private clearGameObjectsArray(): void {
        this._gameObjects.length = 0;
    }
}

function createGameObjects(configs?: GameObjectConfig[]): GameObject[] {
    if (configs)
        return configs.map(config => new GameObject(config));

    return new Array<GameObject>();
}
