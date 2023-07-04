import { Component, ComponentConfig, GameEngine, GameObjectConfig, SceneConfig, System, SystemConfig } from "../../src";

class DummyComponent extends Component {
    private _sum: number = 0;

    public addOne() {
        this._sum += 1;
    }

    public getSum(): number {
        return this._sum;
    }
}

class NonExistentSystem extends System { }

class DummySystem extends System {
    private _components: DummyComponent[] = [];

    public override awake(): void {
        this._components = this._scene.getComponents(DummyComponent);
    }

    public override fixedUpdate(): void {
        this._components.forEach(component => component.addOne());
    }

    public getNumberOfComponents(): number {
        return this._components.length;
    }

    public getSum(): number {
        let sum = 0;
        this._components.forEach(component => sum += component.getSum());
        return sum;
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

const dummySystem: SystemConfig<DummySystem> = {
    system: DummySystem
}

const scene: SceneConfig = {
    gameObjects: [
        dummyPrefab, dummyPrefab
    ],
    systems: [
        dummySystem
    ]
}

describe("System with no fields", () => {
    let gameEngine: GameEngine;

    beforeEach(() => {
        gameEngine = new GameEngine({ initialSceneConfig: scene })
    })

    it("should be able to get the system", () => {
        const system = gameEngine.activeScene.getSystem(DummySystem);
        expect(system).toBeDefined();
    });

    it("should return undefined for a system that does not exist", () => {
        const system = gameEngine.activeScene.getSystem(NonExistentSystem);
        expect(system).toBeUndefined();
    });

    it("should be able to get two components", () => {
        const system = gameEngine.activeScene.getSystem(DummySystem);

        gameEngine.awake();

        const numberOfComponents = system?.getNumberOfComponents();
        expect(numberOfComponents).toBe(2);
    });

    it("should be able to operate on the two components", () => {
        const system = gameEngine.activeScene.getSystem(DummySystem);

        gameEngine.awake();
        gameEngine.fixedUpdate();
        gameEngine.fixedUpdate();

        const sum = system?.getSum();
        expect(sum).toBe(4);
    });
})