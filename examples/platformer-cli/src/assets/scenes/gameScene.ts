import { SceneConfig } from "@headless-game-engine/core";
import { PlatformPrefab } from "../prefabs/PlatformPrefab.js";

export const gameScene: SceneConfig = {
    gameObjects: [
        {
            ...PlatformPrefab,
            name: "Base Platform",
            transform: { position: { x: 0, y: 0, z: 0 } }
        },
        {
            ...PlatformPrefab,
            name: "Platform 1",
            transform: { position: { x: 10, y: 5, z: 0 } }
        },
        {
            ...PlatformPrefab,
            name: "Platform 2",
            transform: { position: { x: 50, y: 5, z: 0 } }
        }
    ]
}