import { Rectangle } from "./Rectangle";

// Road class to draw the road on the canvas
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

  // Populate the road with white rectangles
  populateRoad() {
    for (let i = 0; i < 8; i++) {
      const rect = new Rectangle(8, 40, "white", this.x, i * 160);
      this.road.push(rect);
    }
  }

  // Create the road by drawing the rectangles and moving them down
  createRoad(deltaTime: number) {
    for (let i = 0; i < this.road.length; i++) {
      this.road[i].draw(this.ctx);
      this.road[i].setY(
        this.road[i].getY() + 1 * this.speed * deltaTime * 0.01
      );
      if (this.road[i].getY() > this.canvas.height) {
        this.road[i].setY(-160);
      }
    }
  }
}
