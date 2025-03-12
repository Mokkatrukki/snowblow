import { Tractor } from "./tractor";

// Main game class
export class SnowClearingGame {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private tractor: Tractor;
  private lastTimestamp: number = 0;
  
  constructor() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    document.body.appendChild(this.canvas);
    
    // Get context
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    this.ctx = context;
    
    // Create tractor
    this.tractor = new Tractor(400, 300);
    
    // Set up input handlers
    this.setupInputHandlers();
    
    // Start game loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  private setupInputHandlers(): void {
    // Track key states
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };

    // Key down event
    window.addEventListener('keydown', (e) => {
      if (e.key in keys) {
        keys[e.key as keyof typeof keys] = true;
        e.preventDefault();
      }
      
      // Update tractor input
      this.tractor.setInput({
        accelerate: keys.ArrowUp,
        brake: keys.ArrowDown,
        turnLeft: keys.ArrowLeft,
        turnRight: keys.ArrowRight
      });
    });

    // Key up event
    window.addEventListener('keyup', (e) => {
      if (e.key in keys) {
        keys[e.key as keyof typeof keys] = false;
        e.preventDefault();
      }
      
      // Update tractor input
      this.tractor.setInput({
        accelerate: keys.ArrowUp,
        brake: keys.ArrowDown,
        turnLeft: keys.ArrowLeft,
        turnRight: keys.ArrowRight
      });
    });
  }
  
  private gameLoop(timestamp: number): void {
    // Calculate delta time (time since last frame)
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    
    // Update game state
    this.update(deltaTime);
    
    // Render the game
    this.render();
    
    // Continue the loop
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  private update(deltaTime: number): void {
    // Update game objects
    this.tractor.update(deltaTime);
  }
  
  private render(): void {
    // Clear the canvas
    this.ctx.fillStyle = '#87CEEB'; // Sky blue background
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw the tractor
    this.tractor.render(this.ctx);
  }
} 