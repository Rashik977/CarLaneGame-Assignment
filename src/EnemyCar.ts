import { Car } from "./Car";

export class EnemyCar extends Car {
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

  move() {
    this.Y += 1 * this.speed;
  }
}
