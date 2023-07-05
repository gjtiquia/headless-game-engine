import { GameObjectConfig } from "@headless-game-engine/core";
import { RectRendererConfig } from "../index.js";
import { BoxCollider2DConfig } from "@headless-game-engine/physics-2d";

const rectRenderer = new RectRendererConfig({
    size: { x: 1, y: 100 },
    character: "|"
})

const boxCollider = new BoxCollider2DConfig({
    size: { x: 1, y: 100 }
})

export const InvisibleWallPrefab: GameObjectConfig = {
    name: "InvisibleWall",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [
        rectRenderer,
        boxCollider
    ]
}