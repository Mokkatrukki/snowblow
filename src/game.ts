import { Tractor } from './Tractor';
import { SnowSystem } from './Snow';
import { ParkingArea } from './ParkingArea';

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private tractor: Tractor;
    private snowSystem: SnowSystem;
    private parkingArea: ParkingArea;
    private lastTimestamp: number = 0;
    private isRunning: boolean = false;
    private gameWon: boolean = false;

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
        
        // Create parking area (6 times the size of a standard tractor)
        const tractorWidth = 40;
        const tractorHeight = 60;
        const parkingWidth = tractorWidth * 6;
        const parkingHeight = tractorHeight * 6;
        const parkingX = this.canvas.width / 2 - parkingWidth / 2;
        const parkingY = this.canvas.height / 2 - parkingHeight / 2;
        
        this.parkingArea = new ParkingArea(parkingX, parkingY, parkingWidth, parkingHeight);
        
        // Create tractor outside the parking area (above the parking area)
        const tractorX = parkingX + parkingWidth / 2; // Center horizontally
        const tractorY = parkingY - tractorHeight * 2; // Position above the parking area
        this.tractor = new Tractor(tractorX, tractorY);
        
        // Create snow system
        this.snowSystem = new SnowSystem(this.canvas.width, this.canvas.height, 0.8);
        
        // Set up the parking area in the snow system
        const initialSnowCount = this.snowSystem.setParkingArea(
            this.parkingArea.getPosition(),
            () => this.parkingArea.removeSnowParticle()
        );
        
        // Set the total snow particles in the parking area
        this.parkingArea.setTotalSnowParticles(initialSnowCount);
        
        // Set up keyboard controls
        this.setupControls();
        
        this.gameWon = false;
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Update snow system if it exists
        if (this.snowSystem) {
            this.snowSystem.resizeCanvas(this.canvas.width, this.canvas.height);
        }
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
        if (this.gameWon) return;
        
        // Update tractor
        this.tractor.update();
        
        // Update snow
        this.snowSystem.update();
        
        // Handle collisions between tractor's plow and snow
        const auraPosition = this.tractor.getAuraPosition();
        this.snowSystem.handleCollisionWithPlow(
            auraPosition.x,
            auraPosition.y,
            auraPosition.width,
            auraPosition.height,
            auraPosition.angle
        );
        
        // Check if the parking area is cleared
        if (this.parkingArea.isCleared()) {
            this.gameWon = true;
            console.log("Congratulations! You've cleared the parking area!");
        }
    }

    private render(): void {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background (dark asphalt)
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snow
        this.snowSystem.draw(this.ctx);
        
        // Draw parking area
        this.parkingArea.draw(this.ctx);
        
        // Draw tractor
        this.tractor.draw(this.ctx);
        
        // Draw win message if game is won
        if (this.gameWon) {
            this.drawWinMessage();
        }
    }
    
    private drawWinMessage(): void {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 3;
        
        // Draw semi-transparent background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(centerX - 200, centerY - 50, 400, 100);
        
        // Draw border
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(centerX - 200, centerY - 50, 400, 100);
        
        // Draw text
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Parking Area Cleared!', centerX, centerY);
        
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Great job, snow plow driver!', centerX, centerY + 30);
    }
} 