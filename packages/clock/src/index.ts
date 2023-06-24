import { GameEngine } from "@headless-game-engine/core";

export const sleep = (ms: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

const DEFAULT_VALUES = {
    tickRate: 20
}

function throwIfTickRateIsZero() {
    if (Time.tickRate <= 0)
        throw new Error("Time.tickRate is 0 ticks per second! Please set to number larger than 0.");
}

export abstract class Time {
    /** Unit: Ticks per Second */
    public static tickRate: number = DEFAULT_VALUES.tickRate;

    /** Unit: Seconds */
    public static get fixedDeltaTime() {
        throwIfTickRateIsZero();

        return 1 / this.tickRate
    }

    public static resetToDefaultValues() {
        this.tickRate = DEFAULT_VALUES.tickRate;
    }
}

export class Clock {
    private _callback: () => void;
    private _interval: number;
    private _clockInterval?: NodeJS.Timer;

    /**
     * 
     * @param callback The function to call when the timer elapses.
     * @param interval The number of milliseconds to wait before calling the `callback`.
     */
    constructor(callback: () => void, interval: number) {
        this._callback = callback;
        this._interval = interval;
    }

    public get isRunning(): boolean {
        return this._clockInterval ? true : false;
    }

    public start(): void {
        if (this.isRunning)
            throw new Error("Clock is already running!");

        this._callback(); // Call immediately once first
        this._clockInterval = setInterval(this._callback, this._interval);
    }

    public stop(): void {
        if (this.isRunning)
            clearInterval(this._clockInterval);

        this._clockInterval = undefined;
    }
}

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