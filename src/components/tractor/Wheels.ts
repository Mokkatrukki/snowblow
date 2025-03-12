import { Size } from './TractorTypes';

export class Wheels {
    private wheelAngle: number; // Angle of front wheels
    private maxWheelAngle: number; // Maximum steering angle
    private wheelTurnSpeed: number; // How fast wheels turn
    private stationaryTurnSpeed: number; // Turn speed when not moving
    private movingTurnSpeed: number; // Turn speed when moving
    private isTurningLeft: boolean;
    private isTurningRight: boolean;
    private rearWheelWidth: number; // Width of rear wheels
    private rearWheelHeight: number; // Height of rear wheels
    private frontWheelWidth: number; // Width of front wheels
    private frontWheelHeight: number; // Height of front wheels

    constructor() {
        this.wheelAngle = 0; // in radians
        this.maxWheelAngle = Math.PI / 4; // 45 degrees
        this.wheelTurnSpeed = 0.1; // Base turn speed
        this.stationaryTurnSpeed = 0.12; // Faster turning when stationary
        this.movingTurnSpeed = 0.07; // Slower, smoother turning when moving
        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.rearWheelWidth = 14; // Wider rear wheels
        this.rearWheelHeight = 20; // Taller rear wheels
        this.frontWheelWidth = 10; // Front wheels width
        this.frontWheelHeight = 14; // Front wheels height
    }

    public setTurning(direction: 'left' | 'right' | 'none', state: boolean): void {
        if (direction === 'left') {
            this.isTurningLeft = state;
        } else if (direction === 'right') {
            this.isTurningRight = state;
        }
    }

    public updateSteering(): void {
        // Update wheel angle based on turning input
        if (this.isTurningLeft) {
            this.wheelAngle = Math.max(this.wheelAngle - this.wheelTurnSpeed, -this.maxWheelAngle);
        } else if (this.isTurningRight) {
            this.wheelAngle = Math.min(this.wheelAngle + this.wheelTurnSpeed, this.maxWheelAngle);
        } else {
            // Return wheels to center when not turning
            if (this.wheelAngle > 0) {
                this.wheelAngle = Math.max(0, this.wheelAngle - this.wheelTurnSpeed / 2);
            } else if (this.wheelAngle < 0) {
                this.wheelAngle = Math.min(0, this.wheelAngle + this.wheelTurnSpeed / 2);
            }
        }
    }

    public getWheelAngle(): number {
        return this.wheelAngle;
    }

    public getRearWheelSize(): Size {
        return {
            width: this.rearWheelWidth,
            height: this.rearWheelHeight
        };
    }

    public getFrontWheelSize(): Size {
        return {
            width: this.frontWheelWidth,
            height: this.frontWheelHeight
        };
    }

    public draw(ctx: CanvasRenderingContext2D, tractorWidth: number, tractorHeight: number): void {
        // Draw rear wheels (fixed orientation)
        ctx.fillStyle = '#333';
        
        // Left rear wheel
        ctx.fillRect(-tractorWidth / 2 - this.rearWheelWidth/2, tractorHeight / 4 - this.rearWheelHeight/2, 
                    this.rearWheelWidth, this.rearWheelHeight);
        
        // Add wheel rim details for left wheel - rectangular pattern for top-down view
        ctx.strokeStyle = '#777';
        ctx.lineWidth = 1;
        // Horizontal lines for tread pattern
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(-tractorWidth / 2 - this.rearWheelWidth/2, tractorHeight / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.lineTo(-tractorWidth / 2 + this.rearWheelWidth/2, tractorHeight / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.stroke();
        }
        
        // Right rear wheel
        ctx.fillRect(tractorWidth / 2 - this.rearWheelWidth/2, tractorHeight / 4 - this.rearWheelHeight/2, 
                    this.rearWheelWidth, this.rearWheelHeight);
        
        // Add wheel rim details for right wheel - rectangular pattern for top-down view
        // Horizontal lines for tread pattern
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(tractorWidth / 2 - this.rearWheelWidth/2, tractorHeight / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.lineTo(tractorWidth / 2 + this.rearWheelWidth/2, tractorHeight / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.stroke();
        }
        
        // Draw front wheels (with steering)
        ctx.save();
        // Front left wheel
        ctx.translate(-tractorWidth / 2, -tractorHeight / 4);
        ctx.rotate(this.wheelAngle);
        ctx.fillRect(-this.frontWheelWidth/2, -this.frontWheelHeight/2, 
                    this.frontWheelWidth, this.frontWheelHeight);
        
        // Add rectangular tread pattern for front left wheel
        ctx.strokeStyle = '#777';
        for (let i = 1; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.frontWheelWidth/2, -this.frontWheelHeight/2 + i * (this.frontWheelHeight/3));
            ctx.lineTo(this.frontWheelWidth/2, -this.frontWheelHeight/2 + i * (this.frontWheelHeight/3));
            ctx.stroke();
        }
        ctx.restore();
        
        ctx.save();
        // Front right wheel
        ctx.translate(tractorWidth / 2, -tractorHeight / 4);
        ctx.rotate(this.wheelAngle);
        ctx.fillRect(-this.frontWheelWidth/2, -this.frontWheelHeight/2, 
                    this.frontWheelWidth, this.frontWheelHeight);
        
        // Add rectangular tread pattern for front right wheel
        for (let i = 1; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.frontWheelWidth/2, -this.frontWheelHeight/2 + i * (this.frontWheelHeight/3));
            ctx.lineTo(this.frontWheelWidth/2, -this.frontWheelHeight/2 + i * (this.frontWheelHeight/3));
            ctx.stroke();
        }
        ctx.restore();
    }
} 