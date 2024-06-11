export class Car {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private image: HTMLImageElement;
  private ctx: CanvasRenderingContext2D;
  public speed: number;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speed: number,
    imageSrc: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
    this.ctx = ctx;
    this.speed = speed;
  }

  get X() {
    return this.x;
  }

  get Y() {
    return this.y;
  }

  set X(x: number) {
    this.x = x;
  }

  set Y(y: number) {
    this.y = y;
  }

  // Draw the Car
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // Check for collision with another car
  isCollidingWith(other: Car) {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }
}
