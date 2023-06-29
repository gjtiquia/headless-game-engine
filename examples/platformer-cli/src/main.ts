import { EngineClock } from "@headless-game-engine/clock";
import { Vector2 } from "@headless-game-engine/core";

import { gameEngine } from "./gameEngine.config.js";
import { Canvas } from "./Canvas.js";
import { RectRenderer } from "./assets/index.js";

const SCREEN_SIZE: Vector2 = { x: 80, y: 20 }
const canvas = new Canvas({ size: SCREEN_SIZE, background: " " });

export async function main() {
    EngineClock.start(gameEngine);
    render();

    process.exit();
}

const basePlatform = gameEngine.findGameObjectByName("Base Platform");
const baseRectRenderer = basePlatform?.getComponent(RectRenderer);
baseRectRenderer?.setSize({ x: SCREEN_SIZE.x, y: 1 })

const platform1 = gameEngine.findGameObjectByName("Platform 1");
const platform2 = gameEngine.findGameObjectByName("Platform 2");

function render() {
    canvas.clear();

    if (basePlatform && baseRectRenderer)
        canvas.drawRect(basePlatform.transform.position, baseRectRenderer.size, baseRectRenderer.character)

    if (platform1)
        canvas.drawRect(platform1.transform.position, { x: 20, y: 1 }, "=")

    if (platform2)
        canvas.drawRect(platform2.transform.position, { x: 20, y: 1 }, "=")

    canvas.paint();
}

