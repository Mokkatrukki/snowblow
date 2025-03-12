import { AuraPosition } from './TractorTypes';

export class SnowPlow {
    private width: number; // Width of the snow plow (aura)
    private height: number; // Height of the snow plow (aura)
    private color: string; // Color of the snow plow (aura)
    private angle: number; // Angle of the snow plow relative to tractor
    private maxAngle: number; // Maximum angle the snow plow can rotate
    private turnSpeed: number; // How fast the snow plow turns
    private isLifted: boolean; // Is the snow plow lifted up
    private liftHeight: number; // How high the snow plow can be lifted
    private currentHeight: number; // Current lift height of the snow plow
    private liftSpeed: number; // Speed at which the plow lifts/lowers
    private isTurningLeft: boolean; // Is the snow plow turning left
    private isTurningRight: boolean; // Is the snow plow turning right

    constructor() {
        this.width = 60; // Wider than the tractor
        this.height = 15; // Height of the snow plow
        this.color = '#3A86FF'; // Blue color for the snow plow
        this.angle = 0; // Initial angle of snow plow (straight ahead)
        this.maxAngle = Math.PI / 6; // 30 degrees maximum rotation
        this.turnSpeed = 0.05; // How fast the snow plow turns
        this.isLifted = false; // Plow starts in down position
        this.liftHeight = 20; // Maximum height the plow can be lifted
        this.currentHeight = 0; // Current lift height (0 = fully down)
        this.liftSpeed = 1; // Speed at which the plow lifts/lowers
        this.isTurningLeft = false;
        this.isTurningRight = false;
    }

    public setTurning(direction: 'left' | 'right' | 'none', state: boolean): void {
        if (direction === 'left') {
            this.isTurningLeft = state;
        } else if (direction === 'right') {
            this.isTurningRight = state;
        }
    }

    public toggleLift(): void {
        // Toggle between lifted and lowered states
        this.isLifted = !this.isLifted;
    }
    
    public setLift(lifted: boolean): void {
        // Directly set the lift state
        this.isLifted = lifted;
    }

    public updateAngle(): void {
        // Update snow plow angle based on turning input
        if (this.isTurningLeft) {
            this.angle = Math.max(this.angle - this.turnSpeed, -this.maxAngle);
        } else if (this.isTurningRight) {
            this.angle = Math.min(this.angle + this.turnSpeed, this.maxAngle);
        }
        // Note: Auto-centering is commented out in the original code
        // Uncomment if you want the plow to auto-center
        /*
        else {
            if (this.angle > 0) {
                this.angle = Math.max(0, this.angle - this.turnSpeed / 2);
            } else if (this.angle < 0) {
                this.angle = Math.min(0, this.angle + this.turnSpeed / 2);
            }
        }
        */
    }
    
    public updateHeight(): void {
        // Update snow plow height based on lift state
        if (this.isLifted && this.currentHeight < this.liftHeight) {
            // Lift the plow - slower speed for more subtle movement
            this.currentHeight = Math.min(this.currentHeight + this.liftSpeed * 0.5, this.liftHeight);
        } else if (!this.isLifted && this.currentHeight > 0) {
            // Lower the plow - slower speed for more subtle movement
            this.currentHeight = Math.max(this.currentHeight - this.liftSpeed * 0.5, 0);
        }
    }

    public getPosition(tractorX: number, tractorY: number, tractorAngle: number, tractorHeight: number): AuraPosition {
        // Calculate the position of the aura based on the tractor's position and angle
        let offsetDistance = tractorHeight / 2 + this.height / 2;
        
        // When lifted, the plow is positioned differently
        if (this.isLifted) {
            offsetDistance = tractorHeight / 4; // Positioned over the front of the tractor
        }
        
        const auraX = tractorX + Math.sin(tractorAngle) * offsetDistance;
        const auraY = tractorY - Math.cos(tractorAngle) * offsetDistance;
        
        // Include both the tractor angle and the aura's own angle
        const totalAngle = tractorAngle + this.angle;
        
        return {
            x: auraX,
            y: auraY,
            width: this.width,
            height: this.height,
            angle: totalAngle
        };
    }

    public getAngle(): number {
        return this.angle;
    }
    
    public isPlowLifted(): boolean {
        return this.isLifted;
    }
    
    public getHeight(): number {
        return this.currentHeight;
    }

    public getSize(): { width: number, height: number } {
        return {
            width: this.width,
            height: this.height
        };
    }

    public draw(ctx: CanvasRenderingContext2D, tractorWidth: number, tractorHeight: number): void {
        // Draw shadow for the plow when lifted
        if (this.isLifted) {
            ctx.save();
            // Position shadow at the front of the tractor, with shadow offset
            ctx.translate(0, -tractorHeight / 2 - this.height / 2 + 5); // Shadow is slightly below actual plow
            // Apply the aura's rotation
            ctx.rotate(this.angle);
            
            // Draw shadow with transparency
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            
            ctx.restore();
        }

        // Draw snow plow (aura) at the front with its own rotation
        ctx.save();
        
        // Calculate plow position based on lift state
        let plowYOffset = -tractorHeight / 2 - this.height / 2; // Base position at front
        let plowXOffset = 0;
        
        if (this.isLifted) {
            // When lifted, move plow back over the tractor
            plowYOffset = -tractorHeight / 4; // Move back over the front of the tractor
            plowXOffset = 0; // Keep centered
        }
        
        // Position the plow
        ctx.translate(plowXOffset, plowYOffset - this.currentHeight / 2);
        // Apply the aura's rotation
        ctx.rotate(this.angle);
        
        // Change color slightly when lifted to indicate it's not in contact with ground
        if (this.isLifted) {
            ctx.fillStyle = '#5A9AFF'; // Lighter blue when lifted
        } else {
            ctx.fillStyle = this.color;
        }
        
        // Main plow body
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw angled edges for the plow
        ctx.beginPath();
        ctx.moveTo(-this.width / 2, -this.height / 2);
        ctx.lineTo(-this.width / 2 - 10, this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.width / 2, -this.height / 2);
        ctx.lineTo(this.width / 2 + 10, this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();
        
        // Add some details to the plow
        ctx.strokeStyle = '#2667FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 5, 0);
        ctx.lineTo(this.width / 2 - 5, 0);
        ctx.stroke();
        
        // Draw hydraulic arms connecting the plow to the tractor
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Calculate arm connection points based on lift state
        let tractorConnectionY = this.height * 2;
        if (this.isLifted) {
            tractorConnectionY = this.height * 1.5;
        }
        
        // Left arm - adjust for lift height
        ctx.moveTo(-this.width / 3, this.height / 2);
        ctx.lineTo(-tractorWidth / 3, tractorConnectionY);
        // Right arm - adjust for lift height
        ctx.moveTo(this.width / 3, this.height / 2);
        ctx.lineTo(tractorWidth / 3, tractorConnectionY);
        ctx.stroke();
        
        // When lifted, add visual indicators for hydraulic pistons
        if (this.isLifted) {
            // Draw hydraulic pistons (visible when lifted)
            ctx.strokeStyle = '#777';
            ctx.lineWidth = 4;
            
            // Left piston
            ctx.beginPath();
            ctx.moveTo(-this.width / 3 + 2, this.height / 2 + 2);
            ctx.lineTo(-tractorWidth / 3 + 2, tractorConnectionY - 5);
            ctx.stroke();
            
            // Right piston
            ctx.beginPath();
            ctx.moveTo(this.width / 3 - 2, this.height / 2 + 2);
            ctx.lineTo(tractorWidth / 3 - 2, tractorConnectionY - 5);
            ctx.stroke();
        }
        
        ctx.restore();
    }
} 