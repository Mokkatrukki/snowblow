export class SnowParticle {
    public x: number;
    public y: number;
    public size: number;
    public color: string;
    public velocity: { x: number, y: number };
    public isMoving: boolean;
    public friction: number;
    public shadowColor: string;
    public borderColor: string;
    public isInParkingArea: boolean;
    public wasRemovedFromParkingArea: boolean;

    constructor(x: number, y: number, size: number = 8) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = '#FFFFFF';
        this.shadowColor = '#E8F0F8'; // Slight blue tint for shadow
        this.borderColor = '#CCCCCC'; // Light gray border
        this.velocity = { x: 0, y: 0 };
        this.isMoving = false;
        this.friction = 0.95; // Friction to slow down moving snow
        this.isInParkingArea = false;
        this.wasRemovedFromParkingArea = false;
    }

    public update(): void {
        if (this.isMoving) {
            // Apply velocity
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            // Apply friction to gradually slow down
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            
            // Stop if velocity is very small
            if (Math.abs(this.velocity.x) < 0.1 && Math.abs(this.velocity.y) < 0.1) {
                this.velocity.x = 0;
                this.velocity.y = 0;
                this.isMoving = false;
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        // Draw snow particle with a subtle border for better visibility against dark background
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        
        // Add a subtle border
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

export class SnowSystem {
    private particles: SnowParticle[];
    private maxParticles: number;
    private canvasWidth: number;
    private canvasHeight: number;
    private gridSize: number;
    private parkingArea: { x: number, y: number, width: number, height: number } | null = null;
    private onSnowRemovedFromParkingArea: (() => void) | null = null;

    constructor(canvasWidth: number, canvasHeight: number, density: number = 0.8) {
        this.particles = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gridSize = 15; // Smaller grid cells for more dense snow
        
        // Calculate number of particles based on canvas size and density
        const gridCellsX = Math.floor(canvasWidth / this.gridSize);
        const gridCellsY = Math.floor(canvasHeight / this.gridSize);
        this.maxParticles = Math.floor(gridCellsX * gridCellsY * density);
        
        // Generate initial snow
        this.generateSnow();
    }

    private generateSnow(): void {
        // Create a grid-based distribution of snow
        const gridCellsX = Math.floor(this.canvasWidth / this.gridSize);
        const gridCellsY = Math.floor(this.canvasHeight / this.gridSize);
        
        // Clear existing particles
        this.particles = [];
        
        // Create snow in every grid cell for complete coverage
        for (let gridY = 0; gridY < gridCellsY; gridY++) {
            for (let gridX = 0; gridX < gridCellsX; gridX++) {
                // Add some randomness within the cell
                const offsetX = Math.random() * this.gridSize;
                const offsetY = Math.random() * this.gridSize;
                
                // Calculate final position
                const x = gridX * this.gridSize + offsetX;
                const y = gridY * this.gridSize + offsetY;
                
                // Create snow particle with slightly varied size
                const size = 7 + Math.random() * 3;
                this.particles.push(new SnowParticle(x, y, size));
            }
        }
    }

    public update(): void {
        for (const particle of this.particles) {
            const wasInParkingArea = particle.isInParkingArea;
            
            // Update particle position
            particle.update();
            
            // Check if particle is in parking area
            if (this.parkingArea) {
                const isNowInParkingArea = this.isParticleInParkingArea(particle);
                
                // If particle was in parking area but now isn't, and hasn't been counted yet
                if (wasInParkingArea && !isNowInParkingArea && !particle.wasRemovedFromParkingArea) {
                    particle.wasRemovedFromParkingArea = true;
                    if (this.onSnowRemovedFromParkingArea) {
                        this.onSnowRemovedFromParkingArea();
                    }
                }
                
                particle.isInParkingArea = isNowInParkingArea;
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (const particle of this.particles) {
            particle.draw(ctx);
        }
    }

    public handleCollisionWithPlow(plowX: number, plowY: number, plowWidth: number, plowHeight: number, plowAngle: number): void {
        // Calculate the corners of the plow
        const cos = Math.cos(plowAngle);
        const sin = Math.sin(plowAngle);
        
        // Front edge of the plow (the part that pushes snow)
        const frontX = plowX + sin * plowHeight / 2;
        const frontY = plowY - cos * plowHeight / 2;
        
        // Check each snow particle
        for (const particle of this.particles) {
            // Simple distance check to avoid unnecessary calculations
            const dx = particle.x - plowX;
            const dy = particle.y - plowY;
            const distanceSquared = dx * dx + dy * dy;
            
            // Only check particles that are close enough
            if (distanceSquared < (plowWidth * plowWidth)) {
                // Transform particle position to plow's coordinate system
                const relX = dx * cos + dy * sin;
                const relY = -dx * sin + dy * cos;
                
                // Check if particle is in front of the plow and within its width
                if (relY < -plowHeight / 2 && relY > -plowHeight / 2 - particle.size &&
                    relX > -plowWidth / 2 - particle.size && relX < plowWidth / 2 + particle.size) {
                    
                    // Particle is being pushed by the plow
                    particle.isMoving = true;
                    
                    // Set velocity based on plow's direction and a bit of randomness
                    const pushForce = 2.0;
                    particle.velocity.x = sin * pushForce + (Math.random() * 0.4 - 0.2);
                    particle.velocity.y = -cos * pushForce + (Math.random() * 0.4 - 0.2);
                    
                    // Move the particle a bit to avoid getting stuck in the plow
                    particle.x += particle.velocity.x;
                    particle.y += particle.velocity.y;
                }
            }
        }
    }

    public resizeCanvas(width: number, height: number): void {
        this.canvasWidth = width;
        this.canvasHeight = height;
        
        // Regenerate snow for the new canvas size
        this.generateSnow();
    }

    public setParkingArea(area: { x: number, y: number, width: number, height: number }, callback: () => void): number {
        this.parkingArea = area;
        this.onSnowRemovedFromParkingArea = callback;
        
        // Count initial snow particles in the parking area
        let count = 0;
        for (const particle of this.particles) {
            if (this.isParticleInParkingArea(particle)) {
                particle.isInParkingArea = true;
                count++;
            }
        }
        
        return count;
    }
    
    private isParticleInParkingArea(particle: SnowParticle): boolean {
        if (!this.parkingArea) return false;
        
        return particle.x >= this.parkingArea.x && 
               particle.x <= this.parkingArea.x + this.parkingArea.width &&
               particle.y >= this.parkingArea.y && 
               particle.y <= this.parkingArea.y + this.parkingArea.height;
    }
} 