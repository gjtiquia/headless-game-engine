import { SceneConfig } from "@headless-game-engine/core";
import { PlatformPrefab } from "../prefabs/PlatformPrefab.js";
import { PlayerPrefab } from "../prefabs/PlayerPrefab.js";
import { PhysicsSystem2DConfig } from "@headless-game-engine/physics-2d";
import { InvisibleWallPrefab } from "../prefabs/InvisibleWallPrefab.js";

const physicsSystem = new PhysicsSystem2DConfig({})

export const gameScene: SceneConfig = {
    gameObjects: [
        {
            ...PlayerPrefab,
            transform: { position: { x: 5, y: 12, z: 0 } }
        },

        {
            ...PlatformPrefab,
            name: "Base Platform",
            transform: { position: { x: 40, y: 0, z: 0 } }
        },

        {
            ...PlatformPrefab,
            transform: { position: { x: 20, y: 5, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 60, y: 5, z: 0 } }
        },

        {
            ...PlatformPrefab,
            transform: { position: { x: 40, y: 10, z: 0 } }
        },

        {
            ...PlatformPrefab,
            transform: { position: { x: 20, y: 15, z: 0 } }
        },
        {
            ...PlatformPrefab,
            transform: { position: { x: 60, y: 15, z: 0 } }
        },
        {
            ...InvisibleWallPrefab,
            transform: { position: { x: -1, y: 0, z: 0 } }
        },
        {
            ...InvisibleWallPrefab,
            transform: { position: { x: 80, y: 0, z: 0 } }
        }
    ],
    systems: [physicsSystem]
}