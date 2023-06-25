const DEFAULT_VALUES = {
    tickRate: 20
}

export function throwIfTickRateIsZero() {
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