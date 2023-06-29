#!/usr/bin/env node

import { Component, GameEngine } from "@headless-game-engine/core";
import { EngineClock, Clock, Time, sleep } from "@headless-game-engine/clock";
import * as readline from "readline";

const SCREEN_WIDTH = 30;
const REFRESH_RATE = 120;
const MAX_RUNTIME = 300;
const TICK_RATE = 60;

const main = async () => {
    EngineClock.start(gameEngine);
    renderClock.start();
    startListeningToKeypress();

    await sleep(MAX_RUNTIME * 1e3);

    console.clear();
    stopListeningToKeypress();
    EngineClock.stop();
    renderClock.stop();

    quit();
};

const MovingPoint = class extends Component {
    _acceleration = -50;
    _velocity = 0;

    fixedUpdate() {
        const currentPosition = this.transform.position;
        this._velocity += this._acceleration * Time.fixedDeltaTime;
        currentPosition.x += this._velocity * Time.fixedDeltaTime;
        if (currentPosition.x < 0) {
            this._velocity *= -1 * 0.65;
            currentPosition.x = 0;
        }
        this.transform.position = currentPosition;
    }

    jump() {
        this._velocity = 50;
    }
};

const movingPointPrefab = {
    name: "MovingPoint",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [{ component: MovingPoint }]
};

const sceneConfig = {
    gameObjects: [movingPointPrefab]
};

const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });
Time.tickRate = TICK_RATE;

const movingPointInstance = gameEngine.findGameObjectByName(movingPointPrefab.name);
if (!movingPointInstance)
    throw new Error(`Cannot find game object with name ${movingPointPrefab.name}!`);

const movingPointComponent = movingPointInstance.getComponent(MovingPoint);
if (!movingPointComponent)
    throw new Error(`Cannot find component with class ${MovingPoint.name}!`);

const renderClock = new Clock(() => render(), 1e3 / REFRESH_RATE);

const render = () => {
    const position = Math.round(movingPointInstance.transform.position.x);
    const pointGraphic = position > 0 ? "🏀" : "🏀";
    const leftSpace = " ".repeat(Math.max(0, position));
    const rightSpace = " ".repeat(Math.max(0, SCREEN_WIDTH - position));

    console.clear();
    console.log(`Refresh Rate: ${REFRESH_RATE}, Tick Rate: ${TICK_RATE}, Ticks: ${gameEngine.tick}`);
    console.log(`➡️${leftSpace}${pointGraphic}${rightSpace}|`);
    console.log("\nHeadless Game Engine Demo");
    console.log("\nPress Space to Jump.");
    console.log("Press Ctrl-C to Quit.");
};

function startListeningToKeypress() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", keypressEventHandler);
}

function stopListeningToKeypress() {
    process.stdin.setRawMode(false);
    process.stdin.removeListener("keypress", keypressEventHandler);
}

function quit() {
    process.exit();
}

function keypressEventHandler(str, key) {
    if (key.ctrl && key.name === "c") {
        process.exit();
    }
    if (key.name === "space") {
        onJumpPressed();
    }
}

function onJumpPressed() {
    movingPointComponent == null ? void 0 : movingPointComponent.jump();
}

main();
