#!/usr/bin/env node

const { Component, GameEngine } = require("@headless-game-engine/core");

class MovingPoint extends Component {
    _acceleration = -0.03;
    _velocity = 0;

    fixedUpdate() {
        const currentPosition = this.transform.position;

        this._velocity += this._acceleration;
        currentPosition.x += this._velocity;

        if (currentPosition.x < 0) {
            this._velocity *= -1 * 0.65;
            currentPosition.x = 0;
        }

        this.transform.position = currentPosition;
    }
};

const screenWidth = 80;
const totalUpdateCount = 350;
const fps = 40;

const main = async () => {
    const movingPointPrefab = {
        name: "MovingPoint",
        transform: { position: { x: screenWidth, y: 0, z: 0 } },
        components: [{ component: MovingPoint }]
    };

    const sceneConfig = {
        gameObjects: [movingPointPrefab]
    };

    const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });
    const movingPointInstance = gameEngine.findGameObjectByName("MovingPoint");
    if (!movingPointInstance) {
        console.error("Cannot find game object with name 'MovingPoint'!");
        return;
    }

    gameEngine.awake();

    let updateCount = 0;
    while (updateCount <= totalUpdateCount) {
        gameEngine.fixedUpdate();

        const position = Math.round(movingPointInstance.transform.position.x);
        render(position, updateCount);

        updateCount++;
        await sleep(1000 / fps);
    }

    console.clear();
};

const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

const render = (position, updateCount) => {
    const pointGraphic = "0";
    const leftSpace = " ".repeat(position);
    const rightSpace = " ".repeat(screenWidth - position);

    console.clear();
    console.log(`FPS: ${fps}, Update Count: ${updateCount}/${totalUpdateCount}`);
    console.log(`|${leftSpace}${pointGraphic}${rightSpace}|`);
};

main();
