// Tractor class
export class Tractor {
  private x: number;
  private y: number;
  private width: number = 40;
  private height: number = 60;
  private rotation: number = 0; // in radians
  private speed: number = 0;
  private maxSpeed: number = 5;
  private acceleration: number = 0.1;
  private deceleration: number = 0.05;
  private rotationSpeed: number = 0.05;
  
  // Input state
  private isAccelerating: boolean = false;
  private isBraking: boolean = false;
  private isTurningLeft: boolean = false;
  private isTurningRight: boolean = false;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  
  public setInput(input: {
    accelerate: boolean,
    brake: boolean,
    turnLeft: boolean,
    turnRight: boolean
  }): void {
    this.isAccelerating = input.accelerate;
    this.isBraking = input.brake;
    this.isTurningLeft = input.turnLeft;
    this.isTurningRight = input.turnRight;
  }
  
  public update(deltaTime: number): void {
    // Handle rotation
    if (this.isTurningLeft) {
      this.rotation -= this.rotationSpeed;
    }
    if (this.isTurningRight) {
      this.rotation += this.rotationSpeed;
    }
    
    // Handle acceleration/deceleration
    if (this.isAccelerating) {
      this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
    } else if (this.isBraking) {
      this.speed = Math.max(this.speed - this.deceleration * 2, 0);
    } else {
      this.speed = Math.max(this.speed - this.deceleration, 0);
    }
    
    // Move tractor based on rotation and speed
    this.x += Math.sin(this.rotation) * this.speed;
    this.y -= Math.cos(this.rotation) * this.speed;
    
    // Keep tractor within bounds
    this.x = Math.max(0, Math.min(this.x, 800));
    this.y = Math.max(0, Math.min(this.y, 600));
  }
  
  public render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    
    // Translate to tractor position
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw tractor body
    ctx.fillStyle = 'orange';
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    
    // Draw snowblower attachment
    ctx.fillStyle = 'gray';
    ctx.fillRect(-this.width / 4, -this.height / 2 - 10, this.width / 2, 10);
    
    ctx.restore();
  }
} 