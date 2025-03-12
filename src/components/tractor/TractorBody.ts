import { SmokeParticle } from './TractorTypes';

export class TractorBody {
    private width: number;
    private height: number;
    private color: string;
    private cabinColor: string;
    private warningLightAngle: number;
    private smokeInterval: number;
    private lastSmokeTime: number;
    private smokeParticles: SmokeParticle[];
    private isMoving: boolean;

    constructor() {
        this.width = 40;
        this.height = 60;
        this.color = '#FF6B00'; // Orange color for the tractor
        this.cabinColor = '#222222'; // Dark color for the cabin roof
        this.warningLightAngle = 0;
        this.smokeInterval = 500; // Emit smoke every 500ms
        this.lastSmokeTime = 0;
        this.smokeParticles = [];
        this.isMoving = false;
    }

    public setMoving(isMoving: boolean): void {
        this.isMoving = isMoving;
    }

    public update(): void {
        // Update warning light - just rotate, no blinking
        this.warningLightAngle += 0.1;
        if (this.warningLightAngle > Math.PI * 2) {
            this.warningLightAngle -= Math.PI * 2;
        }

        // Update smoke particles
        const now = Date.now();
        if (this.isMoving && now - this.lastSmokeTime > this.smokeInterval) {
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

    public getSize(): { width: number, height: number } {
        return {
            width: this.width,
            height: this.height
        };
    }

    public draw(ctx: CanvasRenderingContext2D, isPlowLifted: boolean): void {
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
        if (isPlowLifted) {
            ctx.fillStyle = '#FFCC00';
            ctx.beginPath();
            ctx.arc(cabinX + cabinWidth/2, cabinY - 10, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#FF6600';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
} 