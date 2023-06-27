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

const platform1 = gameEngine.findGameObjectByName("Platform 1");
const platform2 = gameEngine.findGameObjectByName("Platform 2");

function render() {
    canvas.clear();

    canvas.drawRect({ x: 0, y: 0 }, { x: 1, y: 1 })
    canvas.drawRect({ x: 0, y: 2 }, { x: 10, y: 3 })

    canvas.paint();
}

