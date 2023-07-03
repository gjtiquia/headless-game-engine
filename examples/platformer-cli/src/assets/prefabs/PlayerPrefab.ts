import { ComponentConfig, GameObjectConfig } from "@headless-game-engine/core";
import { PlayerAgent, RectRendererConfig } from "../index.js";
import { BoxCollider2DConfig, Rigidbody2DConfig } from "@headless-game-engine/physics-2d";

const playerAgent: ComponentConfig<PlayerAgent> = {
    component: PlayerAgent
}

const rectRenderer = new RectRendererConfig({
    size: { x: 1, y: 1 },
    character: "0"
})

const rigidbodyComponent = new Rigidbody2DConfig({});

const boxCollider = new BoxCollider2DConfig({
    size: { x: 1, y: 1 }
})

export const PlayerPrefab: GameObjectConfig = {
    name: "Player",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [
        playerAgent,
        rectRenderer,
        rigidbodyComponent,
        boxCollider,
    ]
}