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
  update() {
    this.X += this.dx;
  }
  moveLeft() {
    this.dx = -1 * this.speed;
  }
  moveRight() {
    this.dx = 1 * this.speed;
  }

  // Listen for the keydown event to move the car
  move() {
    this.update();
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.moveLeft();
          break;
        case "ArrowRight":
          this.moveRight();
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        this.dx = 0;
      }
    });
  }
}
