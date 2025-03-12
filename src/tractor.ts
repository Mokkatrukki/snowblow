export class Tractor {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private speed: number;
    private angle: number;
    private wheelAngle: number; // Angle of front wheels
    private maxWheelAngle: number; // Maximum steering angle
    private wheelTurnSpeed: number; // How fast wheels turn
    private color: string;
    private auraWidth: number; // Width of the snow plow (aura)
    private auraHeight: number; // Height of the snow plow (aura)
    private auraColor: string; // Color of the snow plow (aura)
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
        this.wheelAngle = 0; // in radians
        this.maxWheelAngle = Math.PI / 4; // 45 degrees
        this.wheelTurnSpeed = 0.08;
        this.color = '#FF6B00'; // Orange color for the tractor
        this.auraWidth = 60; // Wider than the tractor
        this.auraHeight = 15; // Height of the snow plow
        this.auraColor = '#3A86FF'; // Blue color for the snow plow
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

        // Only turn the tractor if it's moving
        const isMoving = this.isMovingForward || this.isMovingBackward;
        if (isMoving && this.wheelAngle !== 0) {
            // Calculate turn rate based on wheel angle and movement direction
            const turnRate = this.wheelAngle * 0.03;
            if (this.isMovingForward) {
                this.angle += turnRate;
            } else if (this.isMovingBackward) {
                this.angle -= turnRate; // Reverse steering when going backward
            }
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
        
        // Draw snow plow (aura) at the front
        ctx.fillStyle = this.auraColor;
        // Main plow body
        ctx.fillRect(-this.auraWidth / 2, -this.height / 2 - this.auraHeight, this.auraWidth, this.auraHeight);
        
        // Draw angled edges for the plow
        ctx.beginPath();
        ctx.moveTo(-this.auraWidth / 2, -this.height / 2 - this.auraHeight);
        ctx.lineTo(-this.auraWidth / 2 - 10, -this.height / 2);
        ctx.lineTo(-this.auraWidth / 2, -this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.auraWidth / 2, -this.height / 2 - this.auraHeight);
        ctx.lineTo(this.auraWidth / 2 + 10, -this.height / 2);
        ctx.lineTo(this.auraWidth / 2, -this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        // Add some details to the plow
        ctx.strokeStyle = '#2667FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.auraWidth / 2 + 5, -this.height / 2 - this.auraHeight / 2);
        ctx.lineTo(this.auraWidth / 2 - 5, -this.height / 2 - this.auraHeight / 2);
        ctx.stroke();
        
        // Draw tractor body
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw rear wheels (fixed orientation)
        ctx.fillStyle = '#333';
        ctx.fillRect(-this.width / 2 - 5, this.height / 4 - 6, 10, 12);
        ctx.fillRect(this.width / 2 - 5, this.height / 4 - 6, 10, 12);
        
        // Draw front wheels (with steering)
        ctx.save();
        // Front left wheel
        ctx.translate(-this.width / 2, -this.height / 4);
        ctx.rotate(this.wheelAngle);
        ctx.fillRect(-5, -6, 10, 12);
        ctx.restore();
        
        ctx.save();
        // Front right wheel
        ctx.translate(this.width / 2, -this.height / 4);
        ctx.rotate(this.wheelAngle);
        ctx.fillRect(-5, -6, 10, 12);
        ctx.restore();
        
        // Draw a small indicator for the front of the tractor
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(0, -this.height / 2 - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    public getAuraPosition(): { x: number, y: number, width: number, height: number, angle: number } {
        // Calculate the position of the aura based on the tractor's position and angle
        const auraX = this.x + Math.sin(this.angle) * (this.height / 2 + this.auraHeight / 2);
        const auraY = this.y - Math.cos(this.angle) * (this.height / 2 + this.auraHeight / 2);
        
        return {
            x: auraX,
            y: auraY,
            width: this.auraWidth,
            height: this.auraHeight,
            angle: this.angle
        };
    }

    public getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
} 