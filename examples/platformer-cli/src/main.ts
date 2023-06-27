import { EngineClock, Time } from "@headless-game-engine/clock";
import { Vector2 } from "@headless-game-engine/core";

import { gameEngine } from "./gameEngine.config.js";
import { Canvas } from "./Canvas.js";

const SCREEN_SIZE: Vector2 = { x: 80, y: 20 }
const canvas = new Canvas({ size: SCREEN_SIZE, background: " " });

export async function main() {
    EngineClock.start(gameEngine);
    render();

    process.exit();
}

function render() {
    canvas.clear();
    canvas.draw();
}

