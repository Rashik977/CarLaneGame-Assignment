import "./style.css";
import { Road } from "./Road";
import { PlayerCar } from "./PlayerCar";
import { EnemyCar } from "./EnemyCar";
import { RandomNumber } from "./utils";

// Get the canvas element and its context
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// Set the canvas width, height and background color
canvas.width = 600;
canvas.height = 900;
canvas.style.backgroundColor = "black";

// Game variables
let gameSpeed = 1;
let score = 0;
let highScore = Number(localStorage.getItem("highScore"));
let gameRunning = true;
let gameStarted = false;

// Enemy car images
const enemyImg: string[] = [
  "enemy-1.png",
  "enemy-2.png",
  "enemy-3.png",
  "enemy-4.png",
  "enemy-5.png",
];

const enemyCars: EnemyCar[] = [];
const lanes = [0, 1, 2];

// Enemy car spawn variables
let lastEnemySpawnTime = 0;
const baseEnemySpawnInterval = 6000;

// Creating the road
const road1 = new Road(200, ctx, canvas, gameSpeed);
const road2 = new Road(400, ctx, canvas, gameSpeed);

// Populating the road with white rectangles
road1.populateRoad();
road2.populateRoad();

// Creating the player car
const player1 = new PlayerCar(200, 700, 250, 250, 1, "Car.png", ctx);

// add enemy car to the game
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

// Update the enemy car's position and remove them if they go out of the canvas
function updateEnemy() {
  for (let i = enemyCars.length - 1; i >= 0; i--) {
    const car = enemyCars[i];
    car.Y += 1 * gameSpeed;

    if (car.Y > canvas.height) {
      enemyCars.splice(i, 1);
      score++;
    }
  }
}

// Draw the score on the canvas
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 70, 50);
}

function drawHighScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("High Score: " + highScore, 95, 100);
}

// Game over function
function gameOver() {
  gameRunning = false;
  ctx.fillStyle = "red";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 50);
  ctx.font = "20px Arial";
  ctx.fillText(
    "Press Enter to Restart",
    canvas.width / 2,
    canvas.height / 2 + 100
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      gameRunning = true;
      location.reload();
    }
  });
}

function startGame() {
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      gameStarted = true;
      update(0);
    }
  });
}

// Update function to update the game objects
function update(timestamp: number) {
  if (!gameStarted) {
    startGame();
    console.log("Game Started");
    return;
  }
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  road2.createRoad();
  road1.createRoad();
  road1.speed = gameSpeed;
  road2.speed = gameSpeed;
  player1.wallCollision(canvas.width);
  player1.draw();

  player1.move();
  player1.speed = gameSpeed;
  updateEnemy();
  player1.drawCollisionBox();
  for (let i = 0; i < enemyCars.length; i++) {
    enemyCars[i].draw();
    enemyCars[i].drawCollisionBox();

    if (player1.isCollidingWith(enemyCars[i])) {
      console.log("Game Over");
      if (score > highScore) {
        highScore = score;
      }
      localStorage.setItem("highScore", score.toString());

      gameOver();
    }
  }

  const elapsedTime = timestamp - lastEnemySpawnTime;
  const enemySpawnInterval = baseEnemySpawnInterval / gameSpeed;

  if (elapsedTime >= enemySpawnInterval) {
    addEnemyCar();
    lastEnemySpawnTime = timestamp;
  }
  if (gameSpeed < 5) gameSpeed += 0.0003;
  drawScore();
  drawHighScore();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
