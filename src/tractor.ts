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
    private stationaryTurnSpeed: number; // Turn speed when not moving
    private movingTurnSpeed: number; // Turn speed when moving
    private color: string;
    private cabinColor: string; // Color for the tractor cabin
    private warningLightAngle: number; // Angle for rotating warning light
    private smokeInterval: number; // Interval for smoke emission
    private lastSmokeTime: number; // Last time smoke was emitted
    private smokeParticles: Array<{x: number, y: number, size: number, opacity: number, speed: number}>; // Smoke particles
    private auraWidth: number; // Width of the snow plow (aura)
    private auraHeight: number; // Height of the snow plow (aura)
    private auraColor: string; // Color of the snow plow (aura)
    private auraAngle: number; // Angle of the snow plow relative to tractor
    private maxAuraAngle: number; // Maximum angle the snow plow can rotate
    private auraTurnSpeed: number; // How fast the snow plow turns
    private isAuraTurningLeft: boolean; // Is the snow plow turning left
    private isAuraTurningRight: boolean; // Is the snow plow turning right
    private isAuraLifted: boolean; // Is the snow plow lifted up
    private auraLiftHeight: number; // How high the snow plow can be lifted
    private auraCurrentHeight: number; // Current lift height of the snow plow
    private auraLiftSpeed: number; // Speed at which the plow lifts/lowers
    private isMovingForward: boolean;
    private isMovingBackward: boolean;
    private isTurningLeft: boolean;
    private isTurningRight: boolean;
    private rearWheelWidth: number; // Width of rear wheels
    private rearWheelHeight: number; // Height of rear wheels
    private frontWheelWidth: number; // Width of front wheels
    private frontWheelHeight: number; // Height of front wheels
    
    // Simple movement properties
    private moveSpeed: number; // Base movement speed
    private turnSpeed: number; // Base turning speed
    private wheelBase: number; // Distance between front and rear wheels

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.speed = 3; // Movement speed
        this.angle = 0; // in radians
        this.wheelAngle = 0; // in radians
        this.maxWheelAngle = Math.PI / 4; // 45 degrees
        this.wheelTurnSpeed = 0.1; // Base turn speed
        this.stationaryTurnSpeed = 0.12; // Faster turning when stationary
        this.movingTurnSpeed = 0.07; // Slower, smoother turning when moving
        this.color = '#FF6B00'; // Orange color for the tractor
        this.cabinColor = '#222222'; // Dark color for the cabin roof
        this.warningLightAngle = 0;
        this.smokeInterval = 500; // Emit smoke every 500ms
        this.lastSmokeTime = 0;
        this.smokeParticles = [];
        this.auraWidth = 60; // Wider than the tractor
        this.auraHeight = 15; // Height of the snow plow
        this.auraColor = '#3A86FF'; // Blue color for the snow plow
        this.auraAngle = 0; // Initial angle of snow plow (straight ahead)
        this.maxAuraAngle = Math.PI / 6; // 30 degrees maximum rotation
        this.auraTurnSpeed = 0.05; // How fast the snow plow turns
        this.isAuraTurningLeft = false;
        this.isAuraTurningRight = false;
        this.isAuraLifted = false; // Plow starts in down position
        this.auraLiftHeight = 20; // Maximum height the plow can be lifted
        this.auraCurrentHeight = 0; // Current lift height (0 = fully down)
        this.auraLiftSpeed = 1; // Speed at which the plow lifts/lowers
        this.isMovingForward = false;
        this.isMovingBackward = false;
        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.rearWheelWidth = 14; // Wider rear wheels
        this.rearWheelHeight = 20; // Taller rear wheels
        this.frontWheelWidth = 10; // Front wheels width
        this.frontWheelHeight = 14; // Front wheels height
        
        // Simple movement properties
        this.moveSpeed = 3.0; // Base movement speed
        this.turnSpeed = 0.05; // Base turning speed
        this.wheelBase = 40.0; // Distance between front and rear wheels - matches the height of the tractor
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
    
    public setAuraTurning(direction: 'left' | 'right' | 'none', state: boolean): void {
        if (direction === 'left') {
            this.isAuraTurningLeft = state;
        } else if (direction === 'right') {
            this.isAuraTurningRight = state;
        }
    }
    
    public toggleAuraLift(): void {
        // Toggle between lifted and lowered states
        this.isAuraLifted = !this.isAuraLifted;
    }
    
    public setAuraLift(lifted: boolean): void {
        // Directly set the lift state
        this.isAuraLifted = lifted;
    }

    public update(): void {
        // Update wheel angle based on turning input
        this.updateSteering();
        
        // Update snow plow angle
        this.updateAuraAngle();
        
        // Update snow plow height
        this.updateAuraHeight();
        
        // Calculate speed based on input
        let currentSpeed = 0;
        if (this.isMovingForward) {
            currentSpeed = this.moveSpeed;
        } else if (this.isMovingBackward) {
            currentSpeed = -this.moveSpeed; // Negative speed for reverse
        }
        
        // Only update position if moving
        if (currentSpeed !== 0) {
            // BICYCLE MODEL PHYSICS (6 lines as described in the article)
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
            frontWheel.x += currentSpeed * Math.sin(this.angle + this.wheelAngle);
            frontWheel.y -= currentSpeed * Math.cos(this.angle + this.wheelAngle);
            
            // 3. Calculate new car position and heading from new wheel positions
            this.x = (frontWheel.x + backWheel.x) / 2;
            this.y = (frontWheel.y + backWheel.y) / 2;
            this.angle = Math.atan2(frontWheel.y - backWheel.y, frontWheel.x - backWheel.x) + Math.PI/2;
        }
        
        // Update warning light - just rotate, no blinking
        this.warningLightAngle += 0.1;
        if (this.warningLightAngle > Math.PI * 2) {
            this.warningLightAngle -= Math.PI * 2;
        }

        // Update smoke particles
        const now = Date.now();
        if ((this.isMovingForward || this.isMovingBackward) && now - this.lastSmokeTime > this.smokeInterval) {
            this.smokeParticles.push({
                x: 0,
                y: 0,
                size: 3 + Math.random() * 3,
                opacity: 0.7 + Math.random() * 0.3,
                speed: 0.2 + Math.random() * 0.3
            });
            this.lastSmokeTime = now;
        }
        
        // Update existing smoke particles
        for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
            const particle = this.smokeParticles[i];
            
            // Move particle upward and slightly to the side
            particle.y -= particle.speed;
            particle.x += (Math.random() - 0.5) * 0.5;
            
            // Increase size and reduce opacity as it rises
            particle.size += 0.1;
            particle.opacity -= 0.01;
            
            // Remove particles that have faded out
            if (particle.opacity <= 0) {
                this.smokeParticles.splice(i, 1);
            }
        }
    }
    
    private updateSteering(): void {
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
    
    private updateAuraAngle(): void {
        // Update snow plow angle based on turning input
        if (this.isAuraTurningLeft) {
            this.auraAngle = Math.max(this.auraAngle - this.auraTurnSpeed, -this.maxAuraAngle);
        } else if (this.isAuraTurningRight) {
            this.auraAngle = Math.min(this.auraAngle + this.auraTurnSpeed, this.maxAuraAngle);
        } else {
            // Optionally, return snow plow to center when not turning
            // Uncomment the following code if you want the plow to auto-center
            /*
            if (this.auraAngle > 0) {
                this.auraAngle = Math.max(0, this.auraAngle - this.auraTurnSpeed / 2);
            } else if (this.auraAngle < 0) {
                this.auraAngle = Math.min(0, this.auraAngle + this.auraTurnSpeed / 2);
            }
            */
        }
    }
    
    private updateAuraHeight(): void {
        // Update snow plow height based on lift state
        if (this.isAuraLifted && this.auraCurrentHeight < this.auraLiftHeight) {
            // Lift the plow - slower speed for more subtle movement
            this.auraCurrentHeight = Math.min(this.auraCurrentHeight + this.auraLiftSpeed * 0.5, this.auraLiftHeight);
        } else if (!this.isAuraLifted && this.auraCurrentHeight > 0) {
            // Lower the plow - slower speed for more subtle movement
            this.auraCurrentHeight = Math.max(this.auraCurrentHeight - this.auraLiftSpeed * 0.5, 0);
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        
        // Translate to the tractor's position
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw shadow for the plow when lifted
        if (this.isAuraLifted) {
            ctx.save();
            // Position shadow at the front of the tractor, with shadow offset
            ctx.translate(0, -this.height / 2 - this.auraHeight / 2 + 5); // Shadow is slightly below actual plow
            // Apply the aura's rotation
            ctx.rotate(this.auraAngle);
            
            // Draw shadow with transparency
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(-this.auraWidth / 2, -this.auraHeight / 2, this.auraWidth, this.auraHeight);
            
            ctx.restore();
        }
        
        // Draw rear wheels (fixed orientation) - now bigger
        ctx.fillStyle = '#333';
        
        // Left rear wheel
        ctx.fillRect(-this.width / 2 - this.rearWheelWidth/2, this.height / 4 - this.rearWheelHeight/2, 
                    this.rearWheelWidth, this.rearWheelHeight);
        
        // Add wheel rim details for left wheel - rectangular pattern for top-down view
        ctx.strokeStyle = '#777';
        ctx.lineWidth = 1;
        // Horizontal lines for tread pattern
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.width / 2 - this.rearWheelWidth/2, this.height / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.lineTo(-this.width / 2 + this.rearWheelWidth/2, this.height / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.stroke();
        }
        
        // Right rear wheel
        ctx.fillRect(this.width / 2 - this.rearWheelWidth/2, this.height / 4 - this.rearWheelHeight/2, 
                    this.rearWheelWidth, this.rearWheelHeight);
        
        // Add wheel rim details for right wheel - rectangular pattern for top-down view
        // Horizontal lines for tread pattern
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(this.width / 2 - this.rearWheelWidth/2, this.height / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.lineTo(this.width / 2 + this.rearWheelWidth/2, this.height / 4 - this.rearWheelHeight/2 + i * (this.rearWheelHeight/4));
            ctx.stroke();
        }
        
        // Draw front wheels (with steering)
        ctx.save();
        // Front left wheel
        ctx.translate(-this.width / 2, -this.height / 4);
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
        ctx.translate(this.width / 2, -this.height / 4);
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
        
        // Draw tractor body
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        // Draw cabin (roof from top-down view) - smaller and between rear tires
        ctx.fillStyle = this.cabinColor;
        const cabinWidth = this.width * 0.5; // Smaller width
        const cabinHeight = this.height * 0.3; // Smaller height
        const cabinX = -cabinWidth / 2;
        const cabinY = this.height / 8; // Position between rear tires
        
        // Main cabin roof (simple rectangle for top-down view)
        ctx.fillRect(cabinX, cabinY, cabinWidth, cabinHeight);
        
        // Add some detail lines to the roof to show panels
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Cross lines on roof
        ctx.moveTo(cabinX, cabinY + cabinHeight / 2);
        ctx.lineTo(cabinX + cabinWidth, cabinY + cabinHeight / 2);
        ctx.moveTo(cabinX + cabinWidth / 2, cabinY);
        ctx.lineTo(cabinX + cabinWidth / 2, cabinY + cabinHeight);
        ctx.stroke();
        
        // Draw warning light on top of cabin - always on
        // Warning light base
        ctx.fillStyle = '#333';
        const lightBaseSize = 6; // Slightly smaller
        ctx.fillRect(cabinX + cabinWidth/2 - lightBaseSize/2, cabinY + cabinHeight/2 - lightBaseSize/2, 
                    lightBaseSize, lightBaseSize);
        
        // Rotating warning light beam
        ctx.fillStyle = '#FFAA00'; // Amber color for warning light
        ctx.beginPath();
        ctx.moveTo(cabinX + cabinWidth/2, cabinY + cabinHeight/2);
        ctx.arc(cabinX + cabinWidth/2, cabinY + cabinHeight/2, 10, 
                this.warningLightAngle - Math.PI/4, this.warningLightAngle + Math.PI/4);
        ctx.closePath();
        ctx.fill();
        
        // Light dome
        ctx.fillStyle = '#FF5500'; // Orange-red for the light itself
        ctx.beginPath();
        ctx.arc(cabinX + cabinWidth/2, cabinY + cabinHeight/2, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw smoke pipe (circular from top-down view)
        const pipeRadius = 5;
        const pipeX = 0; // Center horizontally (between front tires)
        const pipeY = -this.height / 4; // Position at the same level as front tires
        
        // Pipe outline (circle for top-down view)
        ctx.fillStyle = '#444';
        ctx.beginPath();
        ctx.arc(pipeX, pipeY, pipeRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Pipe inner circle
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.arc(pipeX, pipeY, pipeRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw smoke particles
        for (const particle of this.smokeParticles) {
            ctx.fillStyle = `rgba(200, 200, 200, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(pipeX + particle.x, pipeY + particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw a small indicator for the front of the tractor
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(0, -this.height / 2 - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw a "lifted" indicator when plow is up
        if (this.isAuraLifted) {
            ctx.fillStyle = '#FFCC00';
            ctx.beginPath();
            ctx.arc(cabinX + cabinWidth/2, cabinY - 10, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#FF6600';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Draw snow plow (aura) at the front with its own rotation
        // When lifted, draw it over the tractor (after tractor body)
        ctx.save();
        
        // Calculate plow position based on lift state
        let plowYOffset = -this.height / 2 - this.auraHeight / 2; // Base position at front
        let plowXOffset = 0;
        
        if (this.isAuraLifted) {
            // When lifted, move plow back over the tractor
            plowYOffset = -this.height / 4; // Move back over the front of the tractor
            plowXOffset = 0; // Keep centered
        }
        
        // Position the plow
        ctx.translate(plowXOffset, plowYOffset - this.auraCurrentHeight / 2);
        // Apply the aura's rotation
        ctx.rotate(this.auraAngle);
        
        // Change color slightly when lifted to indicate it's not in contact with ground
        if (this.isAuraLifted) {
            ctx.fillStyle = '#5A9AFF'; // Lighter blue when lifted
        } else {
            ctx.fillStyle = this.auraColor;
        }
        
        // Main plow body
        ctx.fillRect(-this.auraWidth / 2, -this.auraHeight / 2, this.auraWidth, this.auraHeight);
        
        // Draw angled edges for the plow
        ctx.beginPath();
        ctx.moveTo(-this.auraWidth / 2, -this.auraHeight / 2);
        ctx.lineTo(-this.auraWidth / 2 - 10, this.auraHeight / 2);
        ctx.lineTo(-this.auraWidth / 2, this.auraHeight / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.auraWidth / 2, -this.auraHeight / 2);
        ctx.lineTo(this.auraWidth / 2 + 10, this.auraHeight / 2);
        ctx.lineTo(this.auraWidth / 2, this.auraHeight / 2);
        ctx.closePath();
        ctx.fill();
        
        // Add some details to the plow
        ctx.strokeStyle = '#2667FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-this.auraWidth / 2 + 5, 0);
        ctx.lineTo(this.auraWidth / 2 - 5, 0);
        ctx.stroke();
        
        // Draw hydraulic arms connecting the plow to the tractor
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        // Calculate arm connection points based on lift state
        let tractorConnectionY = this.auraHeight * 2;
        if (this.isAuraLifted) {
            tractorConnectionY = this.auraHeight * 1.5;
        }
        
        // Left arm - adjust for lift height
        ctx.moveTo(-this.auraWidth / 3, this.auraHeight / 2);
        ctx.lineTo(-this.width / 3, tractorConnectionY);
        // Right arm - adjust for lift height
        ctx.moveTo(this.auraWidth / 3, this.auraHeight / 2);
        ctx.lineTo(this.width / 3, tractorConnectionY);
        ctx.stroke();
        
        // When lifted, add visual indicators for hydraulic pistons
        if (this.isAuraLifted) {
            // Draw hydraulic pistons (visible when lifted)
            ctx.strokeStyle = '#777';
            ctx.lineWidth = 4;
            
            // Left piston
            ctx.beginPath();
            ctx.moveTo(-this.auraWidth / 3 + 2, this.auraHeight / 2 + 2);
            ctx.lineTo(-this.width / 3 + 2, tractorConnectionY - 5);
            ctx.stroke();
            
            // Right piston
            ctx.beginPath();
            ctx.moveTo(this.auraWidth / 3 - 2, this.auraHeight / 2 + 2);
            ctx.lineTo(this.width / 3 - 2, tractorConnectionY - 5);
            ctx.stroke();
        }
        
        ctx.restore(); // Restore after drawing the rotated plow
        
        ctx.restore();
    }

    public getAuraPosition(): { x: number, y: number, width: number, height: number, angle: number } {
        // Calculate the position of the aura based on the tractor's position and angle
        let offsetDistance = this.height / 2 + this.auraHeight / 2;
        
        // When lifted, the plow is positioned differently
        if (this.isAuraLifted) {
            offsetDistance = this.height / 4; // Positioned over the front of the tractor
        }
        
        const auraX = this.x + Math.sin(this.angle) * offsetDistance;
        const auraY = this.y - Math.cos(this.angle) * offsetDistance;
        
        // Include both the tractor angle and the aura's own angle
        const totalAngle = this.angle + this.auraAngle;
        
        return {
            x: auraX,
            y: auraY,
            width: this.auraWidth,
            height: this.auraHeight,
            angle: totalAngle
        };
    }

    public getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }

    public getSize(): { width: number, height: number } {
        return {
            width: this.width,
            height: this.height
        };
    }
    
    public getAuraAngle(): number {
        return this.auraAngle;
    }
    
    public isPlowLifted(): boolean {
        return this.isAuraLifted;
    }
    
    public getAuraHeight(): number {
        return this.auraCurrentHeight;
    }
} 