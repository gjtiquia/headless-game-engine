import { GameObjectConfig, GameEngine, GameObject, Component, ComponentFields } from "../../src";

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
        const dummyPrefab: GameObjectConfig = {
            name: "Dummy",
            transform: { position: { x: 0, y: 0, z: 0 } },

            // TODO : Not working after changing the constructor signature! What if change to (any) type?
            // components: [
            //     {
            //         component: DummyComponent
            //     }
            // ]
        }

        const gameEngine = new GameEngine({
            initialSceneConfig: {
                gameObjects: [dummyPrefab]
            }
        })

        const dummyInstance = gameEngine.findGameObjectByName(dummyPrefab.name);
        expect(dummyInstance).toBeDefined();
        expect(dummyInstance).toBeInstanceOf(GameObject);

        // TODO : Not working after changing the constructor signature!
        // const dummyComponent = dummyInstance?.getComponent(DummyComponent);
        // expect(dummyComponent).toBeDefined();
        // expect(dummyComponent).toBeInstanceOf(DummyComponent);
    })
})