export class ParkingArea {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private borderColor: string;
    private borderWidth: number;
    private clearThreshold: number; // Percentage of area that needs to be cleared to win
    private totalSnowParticles: number; // Total number of snow particles in the area initially
    private currentSnowParticles: number; // Current number of snow particles in the area
    
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.borderColor = '#FF4500'; // Orange-red border
        this.borderWidth = 4;
        this.clearThreshold = 1.0; // 100% of the area needs to be cleared to win
        this.totalSnowParticles = 0;
        this.currentSnowParticles = 0;
    }
    
    public draw(ctx: CanvasRenderingContext2D): void {
        // Draw the border of the parking area
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Draw the completion percentage
        const clearPercentage = this.getClearPercentage();
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px Arial';
        ctx.fillText(`Cleared: ${Math.floor(clearPercentage * 100)}%`, this.x + 10, this.y - 10);
        
        // Draw progress bar
        const progressBarWidth = this.width - 20;
        const progressBarHeight = 15;
        const progressX = this.x + 10;
        const progressY = this.y - 35;
        
        // Background
        ctx.fillStyle = '#555555';
        ctx.fillRect(progressX, progressY, progressBarWidth, progressBarHeight);
        
        // Progress
        ctx.fillStyle = this.getProgressColor(clearPercentage);
        ctx.fillRect(progressX, progressY, progressBarWidth * clearPercentage, progressBarHeight);
        
        // Border
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(progressX, progressY, progressBarWidth, progressBarHeight);
    }
    
    public isInside(x: number, y: number): boolean {
        return x >= this.x && x <= this.x + this.width && 
               y >= this.y && y <= this.y + this.height;
    }
    
    public setTotalSnowParticles(count: number): void {
        this.totalSnowParticles = count;
        this.currentSnowParticles = count;
    }
    
    public removeSnowParticle(): void {
        if (this.currentSnowParticles > 0) {
            this.currentSnowParticles--;
        }
    }
    
    public getClearPercentage(): number {
        if (this.totalSnowParticles === 0) return 0;
        return 1 - (this.currentSnowParticles / this.totalSnowParticles);
    }
    
    public isCleared(): boolean {
        return this.getClearPercentage() >= this.clearThreshold;
    }
    
    private getProgressColor(percentage: number): string {
        if (percentage < 0.5) return '#FF4500'; // Red-orange
        if (percentage < 0.8) return '#FFA500'; // Orange
        if (percentage < 1.0) return '#FFFF00'; // Yellow
        return '#00FF00'; // Green - only when 100% complete
    }
    
    public getPosition(): { x: number, y: number, width: number, height: number } {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
} 