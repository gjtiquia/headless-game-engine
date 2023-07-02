import { Component } from "@headless-game-engine/core";
import { Rigidbody2D } from "..";

export abstract class Collider2D extends Component {
    private _rigidbody?: Rigidbody2D;

    public override awake(): void {
        this._rigidbody = this.getComponent(Rigidbody2D);
    }

    public abstract isIntersectingWith(collider: Collider2D): boolean;

    public hasRigidbody(): boolean {
        return (this._rigidbody !== undefined);
    }

    public getRigidbody(): Rigidbody2D | undefined {
        return this._rigidbody;
    }
}