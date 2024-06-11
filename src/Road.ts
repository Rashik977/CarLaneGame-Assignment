import { Rectangle } from "./Rectangle";

export class Road {
  private x: number;
  private road: Rectangle[] = [];
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  public speed: number;
  constructor(
    x: number,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    speed: number
  ) {
    this.x = x;
    this.ctx = ctx;
    this.canvas = canvas;
    this.speed = speed;
  }

  populateRoad() {
    for (let i = 0; i < 10; i++) {
      const rect = new Rectangle(10, 50, "white", this.x, i * 150);
      this.road.push(rect);
    }
  }

  createRoad() {
    for (let i = 0; i < this.road.length; i++) {
      this.road[i].draw(this.ctx);
      this.road[i].setY(this.road[i].getY() + 1 * this.speed);
      if (this.road[i].getY() > this.canvas.height) {
        this.road[i].setY(-140);
      }
    }
  }
}
