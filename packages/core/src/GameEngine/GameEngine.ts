import { Scene, SceneConfig } from "../Scene";
import { GameObject } from "../GameObject";
import { Component, ComponentConstructor, ComponentFields } from "../Component";

interface GameEngineEssentialConfig {
    initialSceneConfig: SceneConfig
}

interface GameEngineOptionalConfig {
    // TODO
}

export interface GameEngineConfig extends GameEngineEssentialConfig, GameEngineOptionalConfig {

}

const defaultOptionalConfig: GameEngineOptionalConfig = {
    // TODO
}

export class GameEngine {
    private _tick: number = 0;
    private _activeScene: Scene;

    constructor(config: GameEngineConfig) {
        this._activeScene = new Scene(config.initialSceneConfig)
        this.initialize;
    }

    public get tick() {
        return this._tick
    }

    public get activeScene() {
        return this._activeScene
    }

    public initialize(): void {
        this._tick = 0;
    }

    public awake(): void {
        this._activeScene.awake();
    }

    public fixedUpdate(): void {
        this._activeScene.fixedUpdate();
        this._tick++;
    }

    public destroy(): void {
        this._activeScene.destroy();
    }

    public findGameObjectByName(name: string): GameObject | undefined {
        return this._activeScene.findGameObjectByName(name);
    }

    public getComponents<T extends Component, F extends ComponentFields>(componentClass: ComponentConstructor<T, F>): T[] {
        return this._activeScene.getComponents(componentClass);
    }
}