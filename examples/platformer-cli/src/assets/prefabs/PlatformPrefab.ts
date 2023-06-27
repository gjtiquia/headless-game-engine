import { GameObjectConfig } from "@headless-game-engine/core";
import { RectRenderer } from "../index.js";

export const PlatformPrefab: GameObjectConfig = {
    name: "Platform",
    transform: { position: { x: 0, y: 0, z: 0 } },

    // TODO : Not working!
    // components: [
    //     {
    //         component: RectRenderer,
    //         componentFields: {

    //         }
    //     }
    // ]
}