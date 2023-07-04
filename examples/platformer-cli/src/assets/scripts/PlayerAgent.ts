import { Component, sign } from "@headless-game-engine/core";
import { Rigidbody2D } from "@headless-game-engine/physics-2d";

const GRAVITY = -80;
const GRAVITY_MULTIPLIER = 2.5;

const JUMP_VELOCITY = 32;
const MAX_FALL_VELOCITY = -30;

const MOVE_ACCELERATION = 100;
const MAX_MOVE_VELOCITY = 40;

enum Movement {
    Left,
    Right,
    Stop
}

export class PlayerAgent extends Component {
    private _rigidbody?: Rigidbody2D;
    private _movement: Movement = Movement.Stop;
    private _isJumping: boolean = false;

    public override awake(): void {
        this._rigidbody = this.getComponent(Rigidbody2D);
    }

    public override fixedUpdate(): void {

        if (this.rigidbody.getVelocity().y <= 0)
            this.rigidbody.addForce({ x: 0, y: GRAVITY_MULTIPLIER * GRAVITY });
        else
            this.rigidbody.addForce({ x: 0, y: GRAVITY });

        if (this._movement === Movement.Right)
            this.rigidbody.addForce({ x: MOVE_ACCELERATION, y: 0 })
        else if (this._movement === Movement.Left)
            this.rigidbody.addForce({ x: -1 * MOVE_ACCELERATION, y: 0 })

        const currentVelocity = this.rigidbody.getVelocity();

        if (this._movement === Movement.Stop)
            currentVelocity.x = 0;

        if (this._isJumping) {
            currentVelocity.y = JUMP_VELOCITY;
            this._isJumping = false;
        }

        if (Math.abs(currentVelocity.x) > MAX_MOVE_VELOCITY)
            currentVelocity.x = sign(currentVelocity.x) * MAX_MOVE_VELOCITY;

        if (currentVelocity.y < MAX_FALL_VELOCITY)
            currentVelocity.y = MAX_FALL_VELOCITY;

        this.rigidbody.setVelocity(currentVelocity);
    }

    // public override 

    public jump() {
        // if (!this.isOnGround()) return;

        this._isJumping = true; // Refactor with InputActions
    }

    public moveRight() {
        this._movement = Movement.Right;
    }

    public moveLeft() {
        this._movement = Movement.Left;
    }

    public stop() {
        this._movement = Movement.Stop;
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

    private get rigidbody(): Rigidbody2D {
        if (this._rigidbody)
            return this._rigidbody;

        throw new Error("PlayerAgent does not have a rigidbody component!");
    }
}