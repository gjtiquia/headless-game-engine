import { Component, ComponentConfig, ComponentFields, GameEngine, GameObjectConfig, Scene, SceneConfig, System, SystemConfig } from "../../src";

class DummyComponent extends Component {
    private _sum: number = 0;

    public addOne() {
        this._sum += 1;
    }

    public getSum(): number {
        return this._sum;
    }
}

interface DummySystemFields extends ComponentFields {
    baseNumber: number
}

class DummySystem extends System {
    private _baseNumber: number;
    private _components: DummyComponent[] = [];

    constructor(scene: Scene, fields: DummySystemFields) {
        super(scene, fields);
        this._baseNumber = fields.baseNumber;
    }

    public override awake(): void {
        this._components = this._scene.getComponents(DummyComponent);
    }

    public override fixedUpdate(): void {
        this._components.forEach(component => component.addOne());
    }

    public getSum(): number {
        let sum = 0;
        this._components.forEach(component => sum += component.getSum());
        return this._baseNumber + sum;
    }
}

const dummyComponent: ComponentConfig<DummyComponent> = {
    component: DummyComponent
}

const dummyPrefab: GameObjectConfig = {
    name: "Dummy",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [dummyComponent]
}

const dummySystem: SystemConfig<DummySystem, DummySystemFields> = {
    system: DummySystem,
    systemFields: {
        baseNumber: 5
    }
}

const scene: SceneConfig = {
    gameObjects: [
        dummyPrefab, dummyPrefab
    ],
    systems: [
        dummySystem
    ]
}

describe("System with fields", () => {
    let gameEngine: GameEngine;

    beforeEach(() => {
        gameEngine = new GameEngine({ initialSceneConfig: scene })
    })

    it("should be able to operate on the two components", () => {
        const system = gameEngine.activeScene.getSystem(DummySystem);

        gameEngine.awake();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();

        const sum = system?.getSum();
        expect(sum).toBe(9);
    });
})