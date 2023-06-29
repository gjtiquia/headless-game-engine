import { Component, ComponentConfig, ComponentFields, GameEngine, GameObject, GameObjectConfig, SceneConfig } from "../../src"

class DummyComponent extends Component {

}

interface DummyFields extends ComponentFields {
    dummyField: number
}

class DummyComponentWithFields extends Component {
    private _dummyField: number;

    constructor(gameObject: GameObject, fields: DummyFields) {
        super(gameObject, fields);
        this._dummyField = fields.dummyField;
    }

    public get dummyField() {
        return this._dummyField;
    }
}

describe("Get all components from scene", () => {
    it("should be able to get the same component from different game objects", () => {
        const dummyComponent: ComponentConfig<DummyComponent> = {
            component: DummyComponent
        }

        const dummyPrefab: GameObjectConfig = {
            name: "Dummy",
            transform: { position: { x: 0, y: 0, z: 0 } },
            components: [dummyComponent]
        }

        const sceneConfig: SceneConfig = {
            gameObjects: [dummyPrefab, dummyPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });

        const dummyComponents: DummyComponent[] = gameEngine.getComponents(DummyComponent);
        expect(dummyComponents).toBeDefined();
        expect(dummyComponents.length).toBe(2);
    })

    it("should return an empty array if no game objects has the component", () => {
        const dummyComponent: ComponentConfig<DummyComponent> = {
            component: DummyComponent
        }

        const dummyPrefab: GameObjectConfig = {
            name: "Dummy",
            transform: { position: { x: 0, y: 0, z: 0 } },
            components: [dummyComponent]
        }

        const sceneConfig: SceneConfig = {
            gameObjects: [dummyPrefab, dummyPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });

        const dummyComponents = gameEngine.getComponents(DummyComponentWithFields);
        expect(dummyComponents).toBeDefined();
        expect(dummyComponents.length).toBe(0);
    })

    it("should be able to read the fields from the same component from different game objects", () => {
        const dummyComponentWithFields: ComponentConfig<DummyComponentWithFields, DummyFields> = {
            component: DummyComponentWithFields,
            componentFields: {
                dummyField: 1
            }
        }

        const dummyPrefab: GameObjectConfig = {
            name: "Dummy",
            transform: { position: { x: 0, y: 0, z: 0 } },
            components: [dummyComponentWithFields]
        }

        const sceneConfig: SceneConfig = {
            gameObjects: [dummyPrefab, dummyPrefab]
        }

        const gameEngine = new GameEngine({ initialSceneConfig: sceneConfig });

        const dummyComponents = gameEngine.getComponents(DummyComponentWithFields);
        let sum = 0;
        dummyComponents.forEach(component => sum += component.dummyField);

        expect(sum).toBe(2);
    })
})