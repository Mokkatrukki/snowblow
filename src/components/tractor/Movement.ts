import { Position } from './TractorTypes';

export class Movement {
    private x: number;
    private y: number;
    private angle: number;
    private speed: number;
    private moveSpeed: number;
    private wheelBase: number;
    private isMovingForward: boolean;
    private isMovingBackward: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.angle = 0; // in radians
        this.speed = 3; // Movement speed
        this.moveSpeed = 3.0; // Base movement speed
        this.wheelBase = 40.0; // Distance between front and rear wheels
        this.isMovingForward = false;
        this.isMovingBackward = false;
    }

    public setMovement(direction: 'forward' | 'backward' | 'none', state: boolean): void {
        if (direction === 'forward') {
            this.isMovingForward = state;
        } else if (direction === 'backward') {
            this.isMovingBackward = state;
        }
    }

    public update(wheelAngle: number): void {
        // Calculate speed based on input
        let currentSpeed = 0;
        if (this.isMovingForward) {
            currentSpeed = this.moveSpeed;
        } else if (this.isMovingBackward) {
            currentSpeed = -this.moveSpeed; // Negative speed for reverse
        }
        
        // Only update position if moving
        if (currentSpeed !== 0) {
            // BICYCLE MODEL PHYSICS
            // 1. Find the world position of front and back wheels
            const frontWheel = {
                x: this.x + (this.wheelBase / 2) * Math.sin(this.angle),
                y: this.y - (this.wheelBase / 2) * Math.cos(this.angle)
            };
            const backWheel = {
                x: this.x - (this.wheelBase / 2) * Math.sin(this.angle),
                y: this.y + (this.wheelBase / 2) * Math.cos(this.angle)
            };
            
            // 2. Move each wheel forward in the direction it is pointing
            // Back wheel moves in car heading direction
            backWheel.x += currentSpeed * Math.sin(this.angle);
            backWheel.y -= currentSpeed * Math.cos(this.angle);
            
            // Front wheel moves in steering direction
            frontWheel.x += currentSpeed * Math.sin(this.angle + wheelAngle);
            frontWheel.y -= currentSpeed * Math.cos(this.angle + wheelAngle);
            
            // 3. Calculate new car position and heading from new wheel positions
            this.x = (frontWheel.x + backWheel.x) / 2;
            this.y = (frontWheel.y + backWheel.y) / 2;
            this.angle = Math.atan2(frontWheel.y - backWheel.y, frontWheel.x - backWheel.x) + Math.PI/2;
        }
    }

    public getPosition(): Position {
        return { x: this.x, y: this.y };
    }

    public getAngle(): number {
        return this.angle;
    }

    public isMoving(): boolean {
        return this.isMovingForward || this.isMovingBackward;
    }
} 