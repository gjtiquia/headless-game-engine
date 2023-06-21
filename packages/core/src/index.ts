export interface Vector2 {
    x: number,
    y: number
}

export interface GameEngineConfig {
    referenceResoulution: Vector2
}

export const defaultConfig: GameEngineConfig = {
    referenceResoulution: { x: 4096, y: 4096 }
}

export class GameEngine {
    constructor(config: GameEngineConfig) {
        console.log("Game Engine Instantiated")
        console.log("Reference Resolution: ", config.referenceResoulution)
    }
}