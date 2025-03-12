export class Tractor {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number;
    private angle: number;
    private wheelRadius: number;
    private color: string;
    private isMovingForward: boolean;
    private isMovingBackward: boolean;
    private isTurningLeft: boolean;
    private isTurningRight: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.speed = 3;
        this.angle = 0; // in radians
        this.wheelRadius = 8;
        this.color = '#FF6B00'; // Orange color for the tractor
        this.isMovingForward = false;
        this.isMovingBackward = false;
        this.isTurningLeft = false;
        this.isTurningRight = false;
    }

    public setMovement(direction: 'forward' | 'backward' | 'none', state: boolean): void {
        if (direction === 'forward') {
            this.isMovingForward = state;
        } else if (direction === 'backward') {
            this.isMovingBackward = state;
        }
    }

    public setTurning(direction: 'left' | 'right' | 'none', state: boolean): void {
        if (direction === 'left') {
            this.isTurningLeft = state;
        } else if (direction === 'right') {
            this.isTurningRight = state;
        }
    }

    public update(): void {
        // Handle turning
        const turnSpeed = 0.05;
        if (this.isTurningLeft) {
            this.angle -= turnSpeed;
        }
        if (this.isTurningRight) {
            this.angle += turnSpeed;
        }

        // Handle movement
        if (this.isMovingForward) {
            this.x += Math.sin(this.angle) * this.speed;
            this.y -= Math.cos(this.angle) * this.speed;
        }
        if (this.isMovingBackward) {
            this.x -= Math.sin(this.angle) * this.speed;
            this.y += Math.cos(this.angle) * this.speed;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        
        // Translate to the tractor's position
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw tractor body
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw wheels (4 wheels as rectangles)
        ctx.fillStyle = '#333';
        
        // Front left wheel
        ctx.fillRect(-this.width / 2 - 5, -this.height / 4 - 6, 10, 12);
        
        // Front right wheel
        ctx.fillRect(this.width / 2 - 5, -this.height / 4 - 6, 10, 12);
        
        // Rear left wheel
        ctx.fillRect(-this.width / 2 - 5, this.height / 4 - 6, 10, 12);
        
        // Rear right wheel
        ctx.fillRect(this.width / 2 - 5, this.height / 4 - 6, 10, 12);
        
        // Draw a small indicator for the front of the tractor
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(0, -this.height / 2 - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    public getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
} 