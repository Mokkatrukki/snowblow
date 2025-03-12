// Common types and interfaces for tractor components

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface SmokeParticle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
}

export interface AuraPosition {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
}

export type MovementDirection = 'forward' | 'backward' | 'none';
export type TurningDirection = 'left' | 'right' | 'none'; 