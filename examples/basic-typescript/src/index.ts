#!/usr/bin/env node

import { Component, GameEngine, GameObjectConfig, SceneConfig } from "@headless-game-engine/core";
import { EngineClock, Clock, Time, sleep } from "@headless-game-engine/clock";

import * as readline from "readline"

const SCREEN_WIDTH = 80;
const REFRESH_RATE = 60;
const TOTAL_RUNTIME = 10; // seconds

const TICK_RATE = 40;

const main = async () => {
    readline.emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {

        // "Raw" mode so we must do our own kill switch
        if (key && key.ctrl && key.name === "c") {
            process.exit();
        }

        // User has triggered a keypress, now do whatever we want!
        // ...

        console.log(str, key);
    });


    // EngineClock.start(gameEngine);
    // renderClock.start();

    // await sleep(TOTAL_RUNTIME * 1000);
    // console.clear();

    // EngineClock.stop();
    // renderClock.stop();
}

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
}

const movingPointPrefab: GameObjectConfig = {
    name: "MovingPoint",
    transform: { position: { x: SCREEN_WIDTH, y: 0, z: 0 } },
    components: [{ component: MovingPoint }]
}

const sceneConfig: SceneConfig = {
    gameObjects: [movingPointPrefab]
}

const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });
Time.tickRate = TICK_RATE;

const movingPointInstance = gameEngine.findGameObjectByName(movingPointPrefab.name);
if (!movingPointInstance)
    throw new Error(`Cannot find game object with name ${movingPointPrefab.name}!`)

const renderClock = new Clock(() => render(), 1000 / REFRESH_RATE);

const render = () => {
    // TODO : Interpolation
    const position = Math.round(movingPointInstance.transform.position.x);

    const pointGraphic = "0";
    const leftSpace = " ".repeat(position);
    const rightSpace = " ".repeat(SCREEN_WIDTH - position);

    console.clear();
    console.log(`Refresh Rate: ${REFRESH_RATE}, Tick Rate: ${TICK_RATE}, Ticks: ${gameEngine.tick}`);
    console.log(`|${leftSpace}${pointGraphic}${rightSpace}|`)
}

main();