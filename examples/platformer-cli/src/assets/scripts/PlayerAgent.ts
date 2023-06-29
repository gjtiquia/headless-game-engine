import { Time } from "@headless-game-engine/clock";
import { Component, Vector2 } from "@headless-game-engine/core";
import { Physics2D } from "../../Physics2D.js";

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

        const previousPosition = this.transform.position;
        const currentPosition = { ...previousPosition };

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

        // TODO : Replace with raycast
        if (currentPosition.y < 1) {
            currentPosition.y = 1;
            this._velocity.y = 0;
        }

        this.transform.position = currentPosition;
    }

    public jump() {
        if (!this.isOnGround()) return;

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

    private isOnGround(): boolean {

        if (this.transform.position.y === 1)
            return true;

        return false;


        // TODO : Raycast below

        // const currentHeight = this.transform.position.y;

        // const colliders = Physics2D.raycastPoint({ x: this.transform.position.x, y: currentHeight - 1 });
        // if (colliders.length <= 0)
        //     return false;

        // return true;
    }
}