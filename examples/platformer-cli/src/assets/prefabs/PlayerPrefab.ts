import { ComponentConfig, GameObjectConfig } from "@headless-game-engine/core";
import { PlayerAgent, RectRenderer, RectRendererFields } from "../index.js";

const RectRendererComponent: ComponentConfig<RectRenderer, RectRendererFields> = {
    component: RectRenderer,
    componentFields: {
        size: { x: 1, y: 1 },
        character: "0"
    }
}

const PlayerAgentComponent: ComponentConfig<PlayerAgent> = {
    component: PlayerAgent
}

export const PlayerPrefab: GameObjectConfig = {
    name: "Player",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [
        PlayerAgentComponent,
        RectRendererComponent
    ]
}