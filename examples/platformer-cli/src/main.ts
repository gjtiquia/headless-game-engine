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

const rectRenderers = gameEngine.getComponents(RectRenderer);

function render() {
    canvas.clear();

    rectRenderers.forEach(renderer =>
        canvas.drawRect(renderer.transform.position, renderer.size, renderer.character)
    );

    canvas.paint();
}

