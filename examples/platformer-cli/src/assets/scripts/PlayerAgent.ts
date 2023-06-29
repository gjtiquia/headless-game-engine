import { Time } from "@headless-game-engine/clock";
import { Component, Vector2 } from "@headless-game-engine/core";

const GRAVITY = -80;
const GRAVITY_MULTIPLIER = 2.5;

const JUMP_VELOCITY = 35;
const MAX_FALL_VELOCITY = -30;

const MOVE_ACCELERATION = 100;
const MAX_MOVE_VELOCITY = 40;

export class PlayerAgent extends Component {
    private _acceleration: Vector2 = { x: 0, y: GRAVITY };
    private _velocity: Vector2 = { x: 0, y: 0 };

    public override fixedUpdate(): void {
        // return;

        const currentPosition = this.transform.position;

        if (this._velocity.y <= 0)
            this._acceleration.y = GRAVITY_MULTIPLIER * GRAVITY;
        else
            this._acceleration.y = GRAVITY;

        this._velocity.x += this._acceleration.x * Time.fixedDeltaTime;
        this._velocity.y += this._acceleration.y * Time.fixedDeltaTime;

        if (Math.abs(this._velocity.x) > MAX_MOVE_VELOCITY)
            this._velocity.x = (this._velocity.x / Math.abs(this._velocity.x)) * MAX_MOVE_VELOCITY;

        if (this._velocity.y < MAX_FALL_VELOCITY)
            this._velocity.y = MAX_FALL_VELOCITY;

        currentPosition.x += this._velocity.x * Time.fixedDeltaTime;
        currentPosition.y += this._velocity.y * Time.fixedDeltaTime;

        if (currentPosition.y < 1) {
            currentPosition.y = 1;
            this._velocity.y = 0;
        }

        this.transform.position = currentPosition;
    }

    public jump() {
        this._velocity.y = JUMP_VELOCITY;
    }

    public moveRight() {
        this._acceleration.x = MOVE_ACCELERATION;
    }

    public moveLeft() {
        this._acceleration.x = -1 * MOVE_ACCELERATION;
    }

    public stop() {
        this._acceleration.x = 0;
        this._velocity.x = 0;
    }
}