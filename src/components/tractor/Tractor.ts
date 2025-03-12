import { Position, Size, AuraPosition, MovementDirection, TurningDirection } from './TractorTypes';
import { Wheels } from './Wheels';
import { SnowPlow } from './SnowPlow';
import { TractorBody } from './TractorBody';
import { Movement } from './Movement';

export class Tractor {
    private movement: Movement;
    private wheels: Wheels;
    private snowPlow: SnowPlow;
    private body: TractorBody;

    constructor(x: number, y: number) {
        this.movement = new Movement(x, y);
        this.wheels = new Wheels();
        this.snowPlow = new SnowPlow();
        this.body = new TractorBody();
    }

    public setMovement(direction: MovementDirection, state: boolean): void {
        this.movement.setMovement(direction, state);
        // Update body smoke generation based on movement
        this.body.setMoving(this.movement.isMoving());
    }

    public setTurning(direction: TurningDirection, state: boolean): void {
        this.wheels.setTurning(direction, state);
    }
    
    public setAuraTurning(direction: TurningDirection, state: boolean): void {
        this.snowPlow.setTurning(direction, state);
    }
    
    public toggleAuraLift(): void {
        this.snowPlow.toggleLift();
    }
    
    public setAuraLift(lifted: boolean): void {
        this.snowPlow.setLift(lifted);
    }

    public update(): void {
        // Update wheel steering
        this.wheels.updateSteering();
        
        // Update snow plow angle
        this.snowPlow.updateAngle();
        
        // Update snow plow height
        this.snowPlow.updateHeight();
        
        // Update movement using wheel angle
        this.movement.update(this.wheels.getWheelAngle());
        
        // Update body (warning light, smoke, etc.)
        this.body.update();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        
        // Get current position and angle
        const position = this.movement.getPosition();
        const angle = this.movement.getAngle();
        
        // Translate to the tractor's position
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);
        
        // Get sizes
        const bodySize = this.body.getSize();
        
        // Draw the snow plow shadow first (if lifted)
        this.snowPlow.draw(ctx, bodySize.width, bodySize.height);
        
        // Draw wheels
        this.wheels.draw(ctx, bodySize.width, bodySize.height);
        
        // Draw tractor body
        this.body.draw(ctx, this.snowPlow.isPlowLifted());
        
        ctx.restore();
    }

    public getAuraPosition(): AuraPosition {
        const position = this.movement.getPosition();
        const angle = this.movement.getAngle();
        const bodySize = this.body.getSize();
        
        return this.snowPlow.getPosition(
            position.x, 
            position.y, 
            angle, 
            bodySize.height
        );
    }

    public getPosition(): Position {
        return this.movement.getPosition();
    }

    public getSize(): Size {
        return this.body.getSize();
    }
    
    public getAuraAngle(): number {
        return this.snowPlow.getAngle();
    }
    
    public isPlowLifted(): boolean {
        return this.snowPlow.isPlowLifted();
    }
    
    public getAuraHeight(): number {
        return this.snowPlow.getHeight();
    }
} 