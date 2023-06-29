import { Component } from "@headless-game-engine/core";

export abstract class Collider2D extends Component {
    public abstract isIntersectingWith(collider: Collider2D): boolean;
}