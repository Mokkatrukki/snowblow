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
    private isMovingForward: boolean;
    private isMovingBackward: boolean;
    private isTurningLeft: boolean;
    private isTurningRight: boolean;
    private rearWheelWidth: number; // Width of rear wheels
    private rearWheelHeight: number; // Height of rear wheels
    private frontWheelWidth: number; // Width of front wheels
    private frontWheelHeight: number; // Height of front wheels
    
    // New physics-based steering properties
    private wheelBase: number; // Distance between front and rear wheels
    private velocity: { x: number, y: number }; // Current velocity vector
    private acceleration: number; // Forward acceleration
    private enginePower: number; // Forward acceleration force
    private braking: number; // Braking force
    private friction: number; // Friction force (proportional to velocity)
    private drag: number; // Drag force (proportional to velocity squared)
    private maxSpeedReverse: number; // Maximum reverse speed
    private slipSpeed: number; // Speed where traction is reduced
    private tractionFast: number; // High-speed traction
    private tractionSlow: number; // Low-speed traction

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
        this.speed = 0; // Initial speed is 0
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
        this.isMovingForward = false;
        this.isMovingBackward = false;
        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.rearWheelWidth = 14; // Wider rear wheels
        this.rearWheelHeight = 20; // Taller rear wheels
        this.frontWheelWidth = 10; // Front wheels width
        this.frontWheelHeight = 14; // Front wheels height
        
        // Initialize new physics properties
        this.wheelBase = 40; // Distance from front to rear wheel
        this.velocity = { x: 0, y: 0 }; // Start with zero velocity
        this.acceleration = 0;
        this.enginePower = 300; // Forward acceleration force
        this.braking = -150; // Braking force
        this.friction = -0.9; // Friction force coefficient
        this.drag = -0.001; // Drag force coefficient
        this.maxSpeedReverse = 100; // Maximum reverse speed
        this.slipSpeed = 200; // Speed where traction is reduced
        this.tractionFast = 0.02; // High-speed traction (lower = more drift)
        this.tractionSlow = 0.05; // Low-speed traction (higher = less drift)
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
        // Calculate acceleration based on input
        this.acceleration = 0;
        
        // Get steering input
        this.updateSteering();
        
        // Apply acceleration based on input
        if (this.isMovingForward) {
            this.acceleration = this.enginePower;
        } else if (this.isMovingBackward) {
            this.acceleration = this.braking;
        }
        
        // Apply friction and drag
        this.applyFriction();
        
        // Calculate steering based on wheel positions
        this.calculateSteering();
        
        // Update position based on velocity
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        // Calculate speed from velocity
        this.speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
        
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
        // Use different turn speeds based on whether the tractor is moving or stationary
        const isMoving = this.speed > 0.5;
        const currentTurnSpeed = isMoving ? this.movingTurnSpeed : this.stationaryTurnSpeed;
        
        // Update wheel angle based on turning input
        if (this.isTurningLeft) {
            this.wheelAngle = Math.max(this.wheelAngle - currentTurnSpeed, -this.maxWheelAngle);
        } else if (this.isTurningRight) {
            this.wheelAngle = Math.min(this.wheelAngle + currentTurnSpeed, this.maxWheelAngle);
        } else {
            // Return wheels to center when not turning
            if (this.wheelAngle > 0) {
                this.wheelAngle = Math.max(0, this.wheelAngle - currentTurnSpeed / 2);
            } else if (this.wheelAngle < 0) {
                this.wheelAngle = Math.min(0, this.wheelAngle + currentTurnSpeed / 2);
            }
        }
    }
    
    private applyFriction(): void {
        // If no acceleration and very low speed, stop completely
        if (this.acceleration === 0 && this.speed < 0.5) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
        
        // Calculate friction force (proportional to velocity)
        const frictionForce = {
            x: this.velocity.x * this.friction,
            y: this.velocity.y * this.friction
        };
        
        // Calculate drag force (proportional to velocity squared)
        const dragForce = {
            x: this.velocity.x * this.speed * this.drag,
            y: this.velocity.y * this.speed * this.drag
        };
        
        // Apply forces to velocity
        this.velocity.x += frictionForce.x + dragForce.x;
        this.velocity.y += frictionForce.y + dragForce.y;
    }
    
    private calculateSteering(): void {
        // Find the wheel positions
        const rearWheel = {
            x: this.x - Math.sin(this.angle) * (this.wheelBase / 2),
            y: this.y + Math.cos(this.angle) * (this.wheelBase / 2)
        };
        
        const frontWheel = {
            x: this.x + Math.sin(this.angle) * (this.wheelBase / 2),
            y: this.y - Math.cos(this.angle) * (this.wheelBase / 2)
        };
        
        // Apply acceleration in the direction the tractor is facing
        const accelerationVector = {
            x: Math.sin(this.angle) * this.acceleration,
            y: -Math.cos(this.angle) * this.acceleration
        };
        
        // Add acceleration to velocity
        this.velocity.x += accelerationVector.x;
        this.velocity.y += accelerationVector.y;
        
        // Move wheels forward
        rearWheel.x += this.velocity.x;
        rearWheel.y += this.velocity.y;
        
        // Calculate front wheel position with steering
        const steeringDirection = this.angle + this.wheelAngle;
        frontWheel.x += this.velocity.x * Math.cos(this.wheelAngle) + 
                        this.velocity.y * Math.sin(this.wheelAngle);
        frontWheel.y += this.velocity.y * Math.cos(this.wheelAngle) - 
                        this.velocity.x * Math.sin(this.wheelAngle);
        
        // Find new heading direction
        const newHeading = Math.atan2(
            frontWheel.x - rearWheel.x,
            -(frontWheel.y - rearWheel.y)
        );
        
        // Choose traction based on speed
        const traction = this.speed > this.slipSpeed ? this.tractionFast : this.tractionSlow;
        
        // Check if we're moving forward or backward
        const velocityMagnitude = this.speed;
        const velocityDirection = Math.atan2(this.velocity.x, -this.velocity.y);
        const headingDot = Math.cos(velocityDirection - this.angle);
        
        if (headingDot >= 0) {
            // Moving forward - gradually adjust velocity toward new heading
            const newVelocityDirection = newHeading;
            const newVelocity = {
                x: Math.sin(newVelocityDirection) * velocityMagnitude,
                y: -Math.cos(newVelocityDirection) * velocityMagnitude
            };
            
            // Interpolate between current velocity and new velocity based on traction
            this.velocity.x = this.velocity.x * (1 - traction) + newVelocity.x * traction;
            this.velocity.y = this.velocity.y * (1 - traction) + newVelocity.y * traction;
        } else {
            // Moving backward - reverse steering
            const newVelocityDirection = newHeading + Math.PI;
            const newVelocity = {
                x: Math.sin(newVelocityDirection) * Math.min(velocityMagnitude, this.maxSpeedReverse),
                y: -Math.cos(newVelocityDirection) * Math.min(velocityMagnitude, this.maxSpeedReverse)
            };
            
            // Interpolate between current velocity and new velocity based on traction
            this.velocity.x = this.velocity.x * (1 - traction) + newVelocity.x * traction;
            this.velocity.y = this.velocity.y * (1 - traction) + newVelocity.y * traction;
        }
        
        // Update tractor angle to match new heading
        this.angle = newHeading;
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

    public getSize(): { width: number, height: number } {
        return {
            width: this.width,
            height: this.height
        };
    }
} 