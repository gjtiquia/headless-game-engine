import { GameEngine } from "@headless-game-engine/core"
import { gameScene } from "./assets/index.js";
import { Time } from "@headless-game-engine/clock";
import { Physics2D } from "./Physics2D.js";

Time.tickRate = 20;

export const gameEngine = new GameEngine({ initialSceneConfig: gameScene });

Physics2D.initialize(gameEngine);