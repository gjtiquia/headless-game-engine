import { SceneConfig } from "@headless-game-engine/core";
import { PlatformPrefab } from "../prefabs/PlatformPrefab.js";
import { PlayerPrefab } from "../prefabs/PlayerPrefab.js";

export const gameScene: SceneConfig = {
    gameObjects: [
        {
            ...PlayerPrefab,
            transform: { position: { x: 5, y: 15, z: 0 } }
        },
        {
            ...PlatformPrefab,
            name: "Base Platform",
            transform: { position: { x: 0, y: 0, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 10, y: 5, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 50, y: 5, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 30, y: 10, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 10, y: 15, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 50, y: 15, z: 0 } }
        }
    ]
}