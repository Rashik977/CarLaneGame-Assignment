import { Car } from "./Car";

// PlayerCar class to represent the Player car in the game
export class PlayerCar extends Car {
  public dx: number = 0;
  public dy: number = 0;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    imageSrc: string,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, width, height, speed, imageSrc, ctx);
  }
  // Update the Car's x position
  update(deltaTime: number) {
    this.X += this.dx * deltaTime * 0.01;
  }
  moveLeft() {
    this.dx = -1 * this.speed * 3;
  }
  moveRight() {
    this.dx = 1 * this.speed * 3;
  }

  // Listen for the keydown event to move the car
  move(deltaTime: number) {
    this.update(deltaTime);
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          break;
        case "a":
          this.moveLeft();
          break;
        case "d":
          this.moveRight();
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "a" ||
        e.key === "d"
      ) {
        this.dx = 0;
      }
    });
  }
}
