import { Time } from "@headless-game-engine/clock";
import { Component, Vector2 } from "@headless-game-engine/core";

export class PlayerAgent extends Component {
    private _acceleration: Vector2 = { x: 0, y: -20 };
    private _velocity: Vector2 = { x: 0, y: 0 };

    public override fixedUpdate(): void {
        // return;

        const currentPosition = this.transform.position;

        this._velocity.x += this._acceleration.x * Time.fixedDeltaTime;
        this._velocity.y += this._acceleration.y * Time.fixedDeltaTime;

        currentPosition.x += this._velocity.x * Time.fixedDeltaTime;
        currentPosition.y += this._velocity.y * Time.fixedDeltaTime;

        if (currentPosition.y < 1) {
            currentPosition.y = 1;
            this._velocity.y = 0;
        }

        this.transform.position = currentPosition;
    }
}