export class Rectangle {
  private width: number;
  private height: number;
  private color: string;
  private x: number;
  private y: number;
  constructor(
    width: number,
    height: number,
    color: string,
    x: number,
    y: number
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  getY() {
    return this.y;
  }

  getX() {
    return this.x;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
