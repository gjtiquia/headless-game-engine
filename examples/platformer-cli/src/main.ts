import { EngineClock } from "@headless-game-engine/clock";
import { Vector2 } from "@headless-game-engine/core";
import { BoxCollider2D } from "@headless-game-engine/physics-2d";
import * as readline from "readline"

import { gameEngine } from "./gameEngine.config.js";
import { PlayerAgent, RectRenderer } from "./assets/index.js";
import { RenderClock } from "./RenderClock.js";

const SCREEN_SIZE: Vector2 = { x: 80, y: 20 }
const REFRESH_RATE = 120;

const basePlatform = gameEngine.findGameObjectByName("Base Platform");
basePlatform?.getComponent(RectRenderer)?.setSize({ x: SCREEN_SIZE.x, y: 1 });
basePlatform?.getComponent(BoxCollider2D)?.setSize({ x: SCREEN_SIZE.x, y: 1 });

const player = gameEngine.findGameObjectByName("Player");
const playerAgent = player?.getComponent(PlayerAgent);

export async function main() {
    EngineClock.start(gameEngine);
    RenderClock.start(gameEngine, SCREEN_SIZE, REFRESH_RATE)
    startListeningToKeypress();
}

function startListeningToKeypress() {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.on('keypress', keypressEventHandler);
}

function keypressEventHandler(str: string, key: readline.Key) {
    // "Raw" mode so we must do our own kill switch
    if (key.ctrl && key.name === "c")
        process.exit();

    if (key.name === "space" || key.name === "w" || key.name === "up")
        playerAgent?.jump();

    if (key.name === "a" || key.name === "left")
        playerAgent?.moveLeft();

    if (key.name === "d" || key.name === "right")
        playerAgent?.moveRight();

    if (key.name === "s" || key.name === "down")
        playerAgent?.stop();
}



