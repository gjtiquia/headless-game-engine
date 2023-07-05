console.log("Script Loaded!");

// const WIDTH = window.innerWidth;
// const HEIGHT = window.innerHeight;
const WIDTH = 500;
const HEIGHT = 500;

const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
context.fillStyle = "black"
context.fillRect(0, 0, WIDTH, HEIGHT);

context.fillStyle = "white"

context.fillRect(0, 0, WIDTH / 2, HEIGHT / 2);
context.fillRect(WIDTH / 2, HEIGHT / 2, WIDTH / 2, HEIGHT / 2);