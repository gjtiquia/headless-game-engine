import { SceneConfig } from "@headless-game-engine/core";
import { PlatformPrefab } from "../prefabs/PlatformPrefab.js";


export const gameScene: SceneConfig = {
    gameObjects: [
        {
            ...PlatformPrefab,
            name: "Platform 1",
            transform: { position: { x: 2, y: 2, z: 0 } }
        },
        {
            ...PlatformPrefab,
            name: "Platform 2",
            transform: { position: { x: 5, y: 5, z: 0 } }
        }
    ]
}