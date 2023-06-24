#!/usr/bin/env node

import { Component, GameEngine, GameObjectConfig, SceneConfig } from "@headless-game-engine/core";

class MovingPoint extends Component {
    private _acceleration = -0.03;
    private _velocity = 0;

    public override fixedUpdate(): void {
        const currentPosition = this.transform.position;

        // TODO : DeltaTime!

        this._velocity += this._acceleration;
        currentPosition.x += this._velocity;

        if (currentPosition.x < 0) {
            this._velocity *= -1 * 0.65
            currentPosition.x = 0;
        }

        this.transform.position = currentPosition;
    }
}


const SCREEN_WIDTH = 80;
const REFRESH_RATE = 60;

const TICK_RATE = 40;
const TOTAL_TICKS = 350;

const main = async () => {
    const movingPointPrefab: GameObjectConfig = {
        name: "MovingPoint",
        transform: { position: { x: SCREEN_WIDTH, y: 0, z: 0 } },
        components: [{ component: MovingPoint }]
    }

    const sceneConfig: SceneConfig = {
        gameObjects: [movingPointPrefab]
    }

    const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });

    const movingPointInstance = gameEngine.findGameObjectByName("MovingPoint");
    if (!movingPointInstance) {
        console.error("Cannot find game object with name 'MovingPoint'!")
        return;
    }

    const renderInterval = setInterval(() => {
        // TODO : Interpolation

        const position = Math.round(movingPointInstance.transform.position.x);
        const tick = gameEngine.tick;

        render(position, tick);
    }, 1000 / REFRESH_RATE);

    gameEngine.awake();
    gameEngine.fixedUpdate();
    const gameEngineInterval = setInterval(() => {
        gameEngine.fixedUpdate();
    }, 1000 / TICK_RATE);

    while (gameEngine.tick <= TOTAL_TICKS) {
        await sleep(1000 / REFRESH_RATE);
    }

    clearInterval(gameEngineInterval);
    clearInterval(renderInterval);

    console.clear();
}

const sleep = (ms: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

const render = (position: number, tick: number) => {
    const pointGraphic = "0";
    const leftSpace = " ".repeat(position);
    const rightSpace = " ".repeat(SCREEN_WIDTH - position);

    console.clear();
    console.log(`Refresh Rate: ${REFRESH_RATE},Tick Rate: ${TICK_RATE}, Ticks: ${tick}/${TOTAL_TICKS}`);
    console.log(`|${leftSpace}${pointGraphic}${rightSpace}|`)
}

main();