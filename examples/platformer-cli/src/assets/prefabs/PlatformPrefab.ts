import { ComponentConfig, GameObjectConfig } from "@headless-game-engine/core";
import { RectRenderer, RectRendererFields } from "../index.js";

const RectRendererComponent: ComponentConfig<RectRenderer, RectRendererFields> = {
    component: RectRenderer,
    componentFields: {
        size: { x: 20, y: 1 },
        character: "="
    }
}
export const PlatformPrefab: GameObjectConfig = {
    name: "Platform",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [RectRendererComponent]
}