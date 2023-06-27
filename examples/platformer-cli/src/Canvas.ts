import { Vector2 } from "@headless-game-engine/core";

export interface CanvasConfig {
    size: Vector2
    background: string
}

export class Canvas {
    private _size: Vector2;
    private _background: string;
    private _characterTable: string[][];

    constructor(config: CanvasConfig) {
        this._size = config.size;
        this._background = config.background;
        this._characterTable = [];

        this.clear();
    }

    public clear(): void {
        console.clear();

        for (let y = 0; y < this._size.y; y++) {
            this._characterTable[y] = []

            for (let x = 0; x < this._size.x; x++) {
                this._characterTable[y][x] = this._background
            }
        }
    }

    public draw(): void {
        const leftBorder = "·"
        const rightBorder = "·"
        const topBorder = "·"
        const bottomBorder = "·"

        console.log(topBorder.repeat(2 + this._size.x));
        this._characterTable.forEach(row => console.log(`${leftBorder}${row.join("")}${rightBorder}`))
        console.log(bottomBorder.repeat(2 + this._size.x));
    }
}