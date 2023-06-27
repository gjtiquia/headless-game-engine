import { GameEngine } from "@headless-game-engine/core"
import { gameScene } from "./assets/index.js";
import { Time } from "@headless-game-engine/clock";

Time.tickRate = 10;

export const gameEngine = new GameEngine({ initialSceneConfig: gameScene });