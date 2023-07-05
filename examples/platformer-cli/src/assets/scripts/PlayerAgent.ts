import { Component, Vector2, sign } from "@headless-game-engine/core";
import { Rigidbody2D } from "@headless-game-engine/physics-2d";

const GRAVITY = -80;
const FALLING_GRAVITY_MULTIPLIER = 2.5;

const JUMP_VELOCITY = 32;
const TERMINAL_VELOCITY = -30;

const MOVE_ACCELERATION = 100;
const MAX_MOVE_VELOCITY = 40;

enum Movement {
    Left,
    Right,
    Stop
}

export class PlayerAgent extends Component {
    private _rigidbodyCache?: Rigidbody2D;
    private _movement: Movement = Movement.Stop;
    private _isJumping: boolean = false;

    public override awake(): void {
        this._rigidbodyCache = this.getComponent(Rigidbody2D);
    }

    public override fixedUpdate(): void {
        this.updateForces();
        this.updateVelocity();
    }

    // PUBLIC METHODS
    public jump() {
        if (!this.isOnGround()) return;

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

    // PRIVATE METHODS
    private updateForces() {
        this.addGravity();
        this.tryAddMovementForces();
    }

    private updateVelocity() {
        const currentVelocity = this.rigidbody.getVelocity();

        this.handleStopVelocity(currentVelocity);
        this.handleJumpVelocity(currentVelocity);

        this.clampWithinMaxMoveVelocity(currentVelocity);
        this.clampTerminalVelocity(currentVelocity);

        this.rigidbody.setVelocity(currentVelocity);
    }

    private addGravity() {
        if (this.isFalling())
            this.rigidbody.addForce({ x: 0, y: FALLING_GRAVITY_MULTIPLIER * GRAVITY });
        else
            this.rigidbody.addForce({ x: 0, y: GRAVITY });
    }

    private tryAddMovementForces() {
        if (this._movement === Movement.Right)
            this.rigidbody.addForce({ x: MOVE_ACCELERATION, y: 0 });

        else if (this._movement === Movement.Left)
            this.rigidbody.addForce({ x: -1 * MOVE_ACCELERATION, y: 0 });
    }

    private handleStopVelocity(currentVelocity: Vector2) {
        if (this._movement === Movement.Stop)
            currentVelocity.x = 0;
    }

    private handleJumpVelocity(currentVelocity: Vector2) {
        if (this._isJumping) {
            currentVelocity.y = JUMP_VELOCITY;
            this._isJumping = false;
        }
    }

    private clampWithinMaxMoveVelocity(currentVelocity: Vector2) {
        if (Math.abs(currentVelocity.x) > MAX_MOVE_VELOCITY)
            currentVelocity.x = sign(currentVelocity.x) * MAX_MOVE_VELOCITY;
    }

    private clampTerminalVelocity(currentVelocity: Vector2) {
        if (currentVelocity.y < TERMINAL_VELOCITY)
            currentVelocity.y = TERMINAL_VELOCITY;
    }

    private isOnGround(): boolean {
        // Yes, its a little hacky and misleading lol. Time it right, you can double/triple/infinite jump on the vertex of the jump.
        return this.rigidbody.getVelocity().y === 0;
    }

    private isFalling(): boolean {
        return this.rigidbody.getVelocity().y <= 0;
    }

    private get rigidbody(): Rigidbody2D {
        if (this._rigidbodyCache)
            return this._rigidbodyCache;

        throw new Error("PlayerAgent does not have a rigidbody component!");
    }
}