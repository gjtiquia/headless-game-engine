export function sign(value: number): number {
    return value < 0 ? -1 : 1;
}

export function clamp(value: number, min: number, max: number): number {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}