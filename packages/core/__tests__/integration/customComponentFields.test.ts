import { GameObjectConfig, GameEngine, GameObject, Component, ComponentFields, ComponentConfig } from "../../src";

interface DummyFields extends ComponentFields {
    dummyField: string
}

class DummyComponent extends Component {
    private _dummyField: string;

    constructor(gameObject: GameObject, fields: DummyFields) {
        super(gameObject, fields);
        this._dummyField = fields.dummyField;
    }

    public get dummyField() {
        return this._dummyField;
    }
}

describe("Custom Component Fields", () => {
    it("should be able to get the fields from the game object instance", () => {
        const dummyComponentConfig: ComponentConfig<DummyComponent, DummyFields> = {
            component: DummyComponent,
            componentFields: {
                dummyField: "Hello World!"
            }
        }

        const dummyPrefab: GameObjectConfig = {
            name: "Dummy",
            transform: { position: { x: 0, y: 0, z: 0 } },
            components: [dummyComponentConfig]
        }

        const gameEngine = new GameEngine({
            initialSceneConfig: {
                gameObjects: [dummyPrefab]
            }
        })

        const dummyInstance = gameEngine.findGameObjectByName(dummyPrefab.name);
        expect(dummyInstance).toBeDefined();
        expect(dummyInstance).toBeInstanceOf(GameObject);

        const dummyComponent = dummyInstance?.getComponent(DummyComponent);
        expect(dummyComponent).toBeDefined();
        expect(dummyComponent).toBeInstanceOf(DummyComponent);
        expect(dummyComponent?.dummyField).toStrictEqual(dummyComponentConfig.componentFields?.dummyField);

        if (dummyComponentConfig.componentFields)
            dummyComponentConfig.componentFields.dummyField = "Another Value";

        // Copy by value and not reference
        expect(dummyComponent?.dummyField).not.toStrictEqual(dummyComponentConfig.componentFields?.dummyField);
    })

    it("should be undefined when no fields are given", () => {
        const dummyPrefab: GameObjectConfig = {
            name: "Dummy",
            transform: { position: { x: 0, y: 0, z: 0 } },
            components: [{ component: DummyComponent }]
        }

        const gameEngine = new GameEngine({
            initialSceneConfig: {
                gameObjects: [dummyPrefab]
            }
        })

        const dummyInstance = gameEngine.findGameObjectByName(dummyPrefab.name);
        const dummyComponent = dummyInstance?.getComponent(DummyComponent);

        expect(dummyComponent?.dummyField).toBeUndefined();
    })
})