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