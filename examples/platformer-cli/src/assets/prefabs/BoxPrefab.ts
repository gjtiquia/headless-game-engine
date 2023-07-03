import { GameObjectConfig } from "@headless-game-engine/core";
import { BoxCollider2DConfig } from "@headless-game-engine/physics-2d";
import { RectRendererConfig } from "../index.js";

const rectRenderer = new RectRendererConfig({
    size: { x: 6, y: 3 }
})

const boxCollider = new BoxCollider2DConfig({
    size: { x: 6, y: 3 }
})

export const BoxPrefab: GameObjectConfig = {
    name: "Box",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [
        rectRenderer,
        boxCollider
    ]
}