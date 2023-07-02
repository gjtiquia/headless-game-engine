import { Scene, SceneConfig } from "../Scene"
import { Component } from "../../Component";
import { GameObjectConfig } from "../../GameObject";
import { System } from "../../System";

class Dummy extends Component { }

abstract class AbstractParent extends Component {
    public abstract getNumber(): number;
}

class ExtendedDummy extends AbstractParent {
    public override getNumber(): number {
        return 5;
    }
}

const extendedDummyPrefab: GameObjectConfig = {
    name: "Extended Dummy",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [{ component: ExtendedDummy }]
}

const dummyPrefab: GameObjectConfig = {
    name: "Dummy",
    transform: { position: { x: 0, y: 0, z: 0 } },
    components: [{ component: Dummy }]
}

class DummySystem extends System {
    private _dummies: ExtendedDummy[] = [];

    public override awake(): void {
        this._dummies = this._scene.getAbstractComponents(ExtendedDummy);
    }

    public getSum(): number {
        return this._dummies.reduce((sum, dummy) => sum += dummy.getNumber(), 0);
    }
}

const sceneConfig: SceneConfig = {
    gameObjects: [
        dummyPrefab,
        extendedDummyPrefab,
        extendedDummyPrefab,
        extendedDummyPrefab,
    ],
    systems: [{ system: DummySystem }]
}

describe("Scene.getAbstractComponents", () => {
    let scene: Scene;
    let dummySystem: DummySystem;

    beforeEach(() => {
        scene = new Scene(sceneConfig)

        const system = scene.getSystem(DummySystem);
        if (!system)
            throw new Error("Cannot find DummySystem!");

        dummySystem = system;
        scene.awake();
    })

    it("should be able to get all the components", () => {
        const components = scene.getAbstractComponents(AbstractParent);
        expect(components.length).toBe(3);
    })

    it("should be able to get all the components via systems", () => {
        expect(dummySystem.getSum()).toBe(15);
    })
})