import { ComponentConfig, GameObjectConfig } from "@headless-game-engine/core";
import { PlayerAgent, RectRenderer, RectRendererFields } from "../index.js";
import { Rigidbody2DConfig } from "@headless-game-engine/physics-2d";

const rectRendererComponent: ComponentConfig<RectRenderer, RectRendererFields> = {
    component: RectRenderer,
    componentFields: {
        size: { x: 1, y: 1 },
        character: "0"
    }
}

const playerAgentComponent: ComponentConfig<PlayerAgent> = {
    component: PlayerAgent
}

const rigidbodyComponent = new Rigidbody2DConfig({});

export const PlayerPrefab: GameObjectConfig = {
    name: "Player",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [
        playerAgentComponent,
        rectRendererComponent,
        rigidbodyComponent
    ]
}