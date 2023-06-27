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

        // Painted row-by-row, so it is the y-coordinate first
        for (let y = 0; y < this._size.y; y++) {
            this._characterTable[y] = []

            for (let x = 0; x < this._size.x; x++) {
                this._characterTable[y][x] = this._background
            }
        }
    }

    public paint(): void {
        const leftBorder = "·"
        const rightBorder = "·"
        const topBorder = "·"
        const bottomBorder = "·"

        console.log(topBorder.repeat(2 + this._size.x));
        this._characterTable.forEach(row => console.log(`${leftBorder}${row.join("")}${rightBorder}`))
        console.log(bottomBorder.repeat(2 + this._size.x));
    }

    public drawRect(bottomLeftPosition: Vector2, size: Vector2, character: string = "x"): void {
        const leftmost = bottomLeftPosition.x;
        const rightmost = bottomLeftPosition.x + size.x;

        const bottommost = bottomLeftPosition.y;
        const topmost = bottomLeftPosition.y + size.y;

        for (let x = leftmost; x < rightmost; x++) {
            for (let y = bottommost; y < topmost; y++) {
                this.setCharacter(x, y, character);
            }
        }
    }

    private setCharacter(x: number, y: number, character: string): void {
        // Painted row-by-row, so it is the y-coordinate first
        // Also need to flip the y-coordinate, because the canvas is painted from top to bottom

        if (x < 0) return;
        if (x >= this._size.x) return;

        const flippedY = this._size.y - y - 1;
        if (flippedY < 0) return;
        if (flippedY >= this._size.y) return;

        this._characterTable[this._size.y - y - 1][x] = character;
    }
}