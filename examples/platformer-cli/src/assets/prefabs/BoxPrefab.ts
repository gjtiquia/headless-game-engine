import { ComponentConfig, GameObjectConfig } from "@headless-game-engine/core";
import { RectRenderer, RectRendererFields } from "../index.js";

const RectRendererComponent: ComponentConfig<RectRenderer, RectRendererFields> = {
    component: RectRenderer,
    componentFields: {
        size: { x: 6, y: 3 },
        offset: { x: 3, y: 0 }
    }
}

export const BoxPrefab: GameObjectConfig = {
    name: "Box",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [RectRendererComponent]
}