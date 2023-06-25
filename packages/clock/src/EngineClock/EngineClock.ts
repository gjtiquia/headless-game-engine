import { GameEngine } from "@headless-game-engine/core";
import { Time, throwIfTickRateIsZero } from "../Time";
import { Clock } from "../Clock";

export abstract class EngineClock {
    private static _clock?: Clock = undefined;
    private static _gameEngineInstance?: GameEngine = undefined;

    public static start(gameEngine: GameEngine) {
        throwIfTickRateIsZero();
        this.throwIfGameEngineAlreadyStarted();

        this._gameEngineInstance = gameEngine;

        gameEngine.awake();

        this._clock = new Clock(() => gameEngine.fixedUpdate(), 1000 * Time.fixedDeltaTime);
        this._clock.start();
    }

    public static stop() {
        if (this._clock) {
            this._clock.stop();
            this._clock = undefined;
        }

        if (this._gameEngineInstance) {
            this._gameEngineInstance.destroy();
            this._gameEngineInstance = undefined;
        }
    }

    private static throwIfGameEngineAlreadyStarted() {
        if (this._gameEngineInstance || (this._clock && this._clock.isRunning))
            throw new Error("A game engine has already started running! Please stop the current game engine first before starting another one, or consider using more scenes instead of more game engines.");
    }
}