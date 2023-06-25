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

    private clearGameObjectsArray(): void {
        this._gameObjects.length = 0;
    }
}

function createGameObjects(configs?: GameObjectConfig[]): GameObject[] {
    if (configs)
        return configs.map(config => new GameObject(config));

    return new Array<GameObject>();
}
