import { Tractor } from './Tractor';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private tractor: Tractor;
    private lastTimestamp: number = 0;
    private isRunning: boolean = false;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!this.canvas) {
            throw new Error(`Canvas element with id ${canvasId} not found`);
        }
        
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = context;
        
        // Set canvas size to match window
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create tractor at the center of the canvas
        this.tractor = new Tractor(this.canvas.width / 2, this.canvas.height / 2);
        
        // Set up keyboard controls
        this.setupControls();
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private setupControls(): void {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    this.tractor.setMovement('forward', true);
                    break;
                case 'ArrowDown':
                case 's':
                    this.tractor.setMovement('backward', true);
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.tractor.setTurning('left', true);
                    break;
                case 'ArrowRight':
                case 'd':
                    this.tractor.setTurning('right', true);
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    this.tractor.setMovement('forward', false);
                    break;
                case 'ArrowDown':
                case 's':
                    this.tractor.setMovement('backward', false);
                    break;
                case 'ArrowLeft':
                case 'a':
                    this.tractor.setTurning('left', false);
                    break;
                case 'ArrowRight':
                case 'd':
                    this.tractor.setTurning('right', false);
                    break;
            }
        });
    }

    public start(): void {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTimestamp = performance.now();
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
    }

    private gameLoop(timestamp: number): void {
        if (!this.isRunning) return;
        
        // Calculate delta time
        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;
        
        // Update game state
        this.update(deltaTime);
        
        // Render the game
        this.render();
        
        // Schedule the next frame
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    private update(deltaTime: number): void {
        this.tractor.update();
    }

    private render(): void {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background (could be snow field)
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw tractor
        this.tractor.draw(this.ctx);
    }
} 