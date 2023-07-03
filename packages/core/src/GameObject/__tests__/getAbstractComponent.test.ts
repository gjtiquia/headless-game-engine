import { GameObject, GameObjectConfig } from "../GameObject"
import { Component, ComponentConfig } from "../../Component"


abstract class AbstractComponent extends Component {
    public abstract getDummyNumber(): number;

}

class DummyComponent extends AbstractComponent {
    public override getDummyNumber(): number {
        return 15;
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

describe("GameObject.getAbstractComponent", () => {
    let gameObject: GameObject;

    beforeEach(() => {
        gameObject = new GameObject(dummyPrefab);
    })

    it("can get the component that extends an abstract component", () => {
        const component = gameObject.getAbstractComponent(AbstractComponent);
        expect(component?.getDummyNumber()).toBe(15);
    })
})