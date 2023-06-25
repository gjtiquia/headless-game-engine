#!/usr/bin/env node

const { Component, GameEngine } = require("@headless-game-engine/core");
const { EngineClock, Clock, Time, sleep } = require("@headless-game-engine/clock");

const SCREEN_WIDTH = 80;
const REFRESH_RATE = 60;
const TOTAL_RUNTIME = 10;
const TICK_RATE = 40;

const main = async () => {
    EngineClock.start(gameEngine);
    renderClock.start();

    await sleep(TOTAL_RUNTIME * 1e3);

    console.clear();
    EngineClock.stop();
    renderClock.stop();
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
};

const movingPointPrefab = {
    name: "MovingPoint",
    transform: { position: { x: SCREEN_WIDTH, y: 0, z: 0 } },
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

const renderClock = new Clock(() => render(), 1000 / REFRESH_RATE);

const render = () => {
    const position = Math.round(movingPointInstance.transform.position.x);
    const pointGraphic = "0";
    const leftSpace = " ".repeat(position);
    const rightSpace = " ".repeat(SCREEN_WIDTH - position);
    console.clear();
    console.log(`Refresh Rate: ${REFRESH_RATE}, Tick Rate: ${TICK_RATE}, Ticks: ${gameEngine.tick}`);
    console.log(`|${leftSpace}${pointGraphic}${rightSpace}|`);
};

main();