import { Vector2 } from "../types";

export interface GameEngineConfig {
    referenceResoulution: Vector2
}

export const defaultConfig: GameEngineConfig = {
    referenceResoulution: { x: 4096, y: 4096 }
}

export class GameEngine {
    private _tick: number = 0;

    constructor(config: GameEngineConfig) {
        this.initialize;
    }

    public initialize(): void {
        this._tick = 0;
    }

    public awake(): void { }

    public fixedUpdate(): void {
        this._tick++;
    }

    public get tick() { return this._tick }
}