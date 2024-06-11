import "./style.css";
import { Road } from "./Road";
import { PlayerCar } from "./PlayerCar";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 600;
canvas.height = 900;
canvas.style.backgroundColor = "black";

const road1 = new Road(200, ctx, canvas);
const road2 = new Road(400, ctx, canvas);

const player1 = new PlayerCar(200, 700, 150, 150, 1, "Car.png", ctx);

road1.populateRoad();
road2.populateRoad();

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  road2.createRoad();
  road1.createRoad();
  player1.draw();
  player1.move();
  requestAnimationFrame(update);
}

update();
