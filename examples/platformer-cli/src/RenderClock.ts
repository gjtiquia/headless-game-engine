import { GameEngine, Vector2 } from "@headless-game-engine/core";
import { Clock } from "@headless-game-engine/clock";
import { Canvas } from "./Canvas.js";
import { RectRenderer } from "./assets/index.js";


export abstract class RenderClock {
    private static _rectRenderers: RectRenderer[];
    private static _renderClock: Clock;
    private static _canvas: Canvas;

    public static start(gameEngine: GameEngine, screenSize: Vector2, refreshRate: number) {
        if (refreshRate <= 0)
            throw new Error(`Refresh Rate (${refreshRate}) <= 0!`);

        if (this._renderClock && this._renderClock.isRunning)
            throw new Error("Render clock already running!");

        this._canvas = new Canvas({ size: screenSize })
        this._rectRenderers = gameEngine.getComponents(RectRenderer);

        this._renderClock = new Clock(() => this.render(), 1000 / refreshRate);
        this._renderClock.start();
    }

    public static stop() {
        if (this._renderClock)
            this._renderClock.stop();
    }

    private static render() {
        this._canvas.clear();

        this._rectRenderers.forEach(renderer =>
            this._canvas.drawRect(renderer.bottomLeftPosition, renderer.size, renderer.character)
        );

        this._canvas.paint();
    }
}