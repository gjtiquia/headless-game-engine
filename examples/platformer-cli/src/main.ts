import { EngineClock, sleep } from "@headless-game-engine/clock";
import { Vector2 } from "@headless-game-engine/core";

import { gameEngine } from "./gameEngine.config.js";
import { RectRenderer } from "./assets/index.js";
import { RenderClock } from "./RenderClock.js";

const SCREEN_SIZE: Vector2 = { x: 80, y: 20 }
const REFRESH_RATE = 120;

const basePlatform = gameEngine.findGameObjectByName("Base Platform");
const baseRectRenderer = basePlatform?.getComponent(RectRenderer);
baseRectRenderer?.setSize({ x: SCREEN_SIZE.x, y: 1 })

export async function main() {
    EngineClock.start(gameEngine);
    RenderClock.start(gameEngine, SCREEN_SIZE, REFRESH_RATE)

    // console.clear();
    // process.exit();
}




