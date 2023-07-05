#!/usr/bin/env node

import { Component, GameEngine, GameObjectConfig, SceneConfig } from "@headless-game-engine/core";
import { EngineClock, Clock, Time, sleep } from "@headless-game-engine/clock";

import * as readline from "readline"

// Console Configuration
const SCREEN_WIDTH = 30; // characters
const REFRESH_RATE = 120; // Hz
const MAX_RUNTIME = 300; // seconds

// GameEngine Configuration
const TICK_RATE = 60; // Ticks per second

const main = async () => {
    EngineClock.start(gameEngine);
    renderClock.start();
    startListeningToKeypress();

    await sleep(MAX_RUNTIME * 1000);
    console.clear();

    stopListeningToKeypress();
    EngineClock.stop();
    renderClock.stop();

    quit();
}

// Custom MovingPoint Component
class MovingPoint extends Component {
    private _acceleration = -50;
    private _velocity = 0;

    public override fixedUpdate(): void {
        const currentPosition = this.transform.position;

        this._velocity += this._acceleration * Time.fixedDeltaTime;
        currentPosition.x += this._velocity * Time.fixedDeltaTime;

        if (currentPosition.x < 0) {
            this._velocity *= -1 * 0.65
            currentPosition.x = 0;
        }

        this.transform.position = currentPosition;
    }

    public jump(): void {
        this._velocity = 50;
    }
}

// MovingPoint Prefab Configuration
const movingPointPrefab: GameObjectConfig = {
    name: "MovingPoint",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [{ component: MovingPoint }]
}

// Scene Configuration
const sceneConfig: SceneConfig = {
    gameObjects: [movingPointPrefab]
}

// Game Engine Initialization
const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });
Time.tickRate = TICK_RATE;

// Get reference to game objects and components in the game engine.
const movingPointInstance = gameEngine.findGameObjectByName(movingPointPrefab.name)!;
const movingPointComponent = movingPointInstance.getComponent(MovingPoint)!;

// Render Clock Initialization
const renderClock = new Clock(() => render(), 1000 / REFRESH_RATE);

const render = () => {
    const position = Math.round(movingPointInstance.transform.position.x);

    const player = "0";
    const leftSpace = " ".repeat(Math.max(0, position));
    const rightSpace = " ".repeat(Math.max(0, SCREEN_WIDTH - position));

    console.clear();
    console.log(`Refresh Rate: ${REFRESH_RATE}, Tick Rate: ${TICK_RATE}, Ticks: ${gameEngine.tick}`);
    console.log(`\n-->|${leftSpace}${player}${rightSpace}|`)
    console.log("\nHeadless Game Engine Demo");
    console.log("\nPress Space to Jump.");
    console.log("Press Ctrl-C to Quit.");
}

function startListeningToKeypress() {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.on('keypress', keypressEventHandler);
}

function stopListeningToKeypress() {
    process.stdin.setRawMode(false);
    process.stdin.removeListener('keypress', keypressEventHandler);
}

function quit() {
    process.exit();
}

function keypressEventHandler(str: string, key: readline.Key) {
    // "Raw" mode so we must do our own kill switch
    if (key.ctrl && key.name === "c") {
        process.exit();
    }

    if (key.name === "space") {
        onJumpPressed();
    }
}

function onJumpPressed() {
    movingPointComponent.jump();
}

main();