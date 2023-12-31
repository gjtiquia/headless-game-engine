import { Vector2 } from "@headless-game-engine/core";

const DEFAULT_BACKGROUND = " ";

export interface CanvasConfig {
    size: Vector2
    background?: string
}


export class Canvas {
    private _size: Vector2;
    private _background: string;
    private _characterTable: string[][];

    constructor(config: CanvasConfig) {
        this._size = config.size;
        this._background = config.background ? config.background : DEFAULT_BACKGROUND;
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

        console.log("\nHeadless Game Engine: Command-Line Platformer Example");
        console.log("\nPress Ctrl-C to Quit.\n");
        console.log("\nControls: WASD / Arrow Keys / Space");
        console.log("\nInstructions:");
        console.log("\n- Move Left: W or Left Arrow");
        console.log("\n- Move Right: D or Right Arrow");
        console.log("\n- Stop Moving: S or Down Arrow");
        console.log("\n- Jump: W or Up Arrow or Space\n");
        console.log("\nNote: Command line can only listen to keydown events. The player will NOT stop moving if you stop pressing left/right.");

    }

    public drawRect(bottomLeftPosition: Vector2, size: Vector2, character: string = "x"): void {
        const leftmost = Math.round(bottomLeftPosition.x);
        const rightmost = Math.round(bottomLeftPosition.x + size.x);

        const bottommost = Math.round(bottomLeftPosition.y);
        const topmost = Math.round(bottomLeftPosition.y + size.y);

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

        if (!this._characterTable[flippedY][x]) {
            console.error(flippedY);
            console.error(x);
            console.error(this._characterTable);
        }

        this._characterTable[flippedY][x] = character;
    }
}