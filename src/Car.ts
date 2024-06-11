// Purpose: Car class to represent the player's car and the Enemy cars in the game.
export class Car {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private image: HTMLImageElement;
  private ctx: CanvasRenderingContext2D;
  public speed: number;

  // Collision box properties
  private collisionX: number = 0;
  private collisionY: number = 0;
  private collisionWidth: number = 0;
  private collisionHeight: number = 0;

  private offsetX: number = 75;
  private offsetY: number = 10;
  private offsetWidth: number = 150;
  private offsetHeight: number = 40;

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
    this.collisionX = x + this.offsetX;
    this.y = y;
    this.collisionY = y + this.offsetY;
    this.width = width;
    this.collisionWidth = width - this.offsetWidth;
    this.height = height;
    this.collisionHeight = height - this.offsetHeight;
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
    this.collisionX = x + this.offsetX;
  }

  set Y(y: number) {
    this.y = y;
    this.collisionY = y + this.offsetY;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // Draw the collision box for debugging
  drawCollisionBox() {
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(
      this.collisionX,
      this.collisionY,
      this.collisionWidth,
      this.collisionHeight
    );
  }

  // check for collision with the wall
  wallCollision(canvasWidth: number) {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }

  // Check for collision with another car
  isCollidingWith(other: Car) {
    return (
      this.collisionX < other.collisionX + other.collisionWidth &&
      this.collisionX + this.collisionWidth > other.collisionX &&
      this.collisionY < other.collisionY + other.collisionHeight &&
      this.collisionY + this.collisionHeight > other.collisionY
    );
  }
}
