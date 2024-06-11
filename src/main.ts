import "./style.css";
import { Road } from "./Road";
import { PlayerCar } from "./PlayerCar";
import { EnemyCar } from "./EnemyCar";
import { RandomNumber } from "./utils";
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 600;
canvas.height = 900;
canvas.style.backgroundColor = "black";

let gameSpeed = 1;

const road1 = new Road(200, ctx, canvas, gameSpeed);
const road2 = new Road(400, ctx, canvas, gameSpeed);

const player1 = new PlayerCar(200, 700, 250, 250, 1, "Car.png", ctx);

const enemyImg: string[] = [
  "enemy-1.png",
  "enemy-2.png",
  "enemy-3.png",
  "enemy-4.png",
  "enemy-5.png",
];

const enemyCars: EnemyCar[] = [];

const lanes = [0, 1, 2];

function addEnemyCar() {
  for (let i = lanes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lanes[i], lanes[j]] = [lanes[j], lanes[i]];
  }

  const selectedLanes = lanes.slice(0, 2);

  for (let i = 0; i < 2; i++) {
    const count = selectedLanes[i];
    const enemyCar = new EnemyCar(
      count === 0 ? 0 : count === 1 ? 180 : 400,
      RandomNumber(-200, -500),
      250,
      250,
      gameSpeed,
      enemyImg[RandomNumber(0, 4)],
      ctx
    );
    enemyCars.push(enemyCar);
  }
}

function updateEnemy() {
  for (let i = enemyCars.length - 1; i >= 0; i--) {
    const car = enemyCars[i];
    car.Y += 1 * gameSpeed;

    if (car.Y > canvas.height) {
      enemyCars.splice(i, 1);
    }
  }
}

// setInterval(() => {
//   console.log("Adding Enemy Car", gameSpeed);
//   addEnemyCar();
// }, 5000 / gameSpeed);

road1.populateRoad();
road2.populateRoad();
let lastEnemySpawnTime = 0;
const baseEnemySpawnInterval = 6000; // Base interval in milliseconds

function update(timestamp: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  road2.createRoad();
  road1.createRoad();
  road1.speed = gameSpeed;
  road2.speed = gameSpeed;
  player1.draw();
  // player1.drawCollisionBox();
  player1.move();
  player1.speed = gameSpeed;
  updateEnemy();
  for (let i = 0; i < enemyCars.length; i++) {
    enemyCars[i].draw();
    // enemyCars[i].drawCollisionBox();
    if (player1.isCollidingWith(enemyCars[i])) {
      console.log("Game Over");
    }
  }
  // Calculate the elapsed time since the last enemy car was spawned
  const elapsedTime = timestamp - lastEnemySpawnTime;
  const enemySpawnInterval = baseEnemySpawnInterval / gameSpeed;

  if (elapsedTime >= enemySpawnInterval) {
    console.log("Adding Enemy Car", gameSpeed);
    addEnemyCar();
    lastEnemySpawnTime = timestamp;
  }
  if (gameSpeed < 5) gameSpeed += 0.001;
  requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);
