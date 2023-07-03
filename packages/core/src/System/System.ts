import { Scene } from "../Scene";

export type SystemConstructor<T extends System, F extends SystemFields> = new (scene: Scene, fields: F) => T;


export interface SystemConfig<T extends System, F extends SystemFields = SystemFields> {
    system: SystemConstructor<T, F>,
    systemFields?: F
}

export interface SystemFields {

}

export abstract class System {
    protected _scene: Scene;

    constructor(scene: Scene, fields: SystemFields) {
        this._scene = scene;
    }

    public awake(): void { }
    public earlyUpdate(): void { }
    public fixedUpdate(): void { }
    public onDestroy(): void { }
}