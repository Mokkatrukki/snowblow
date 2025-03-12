/**
 * Tractor Component Module
 * 
 * This module implements a modular snow plow tractor for a snow clearing game.
 * The implementation follows a composition pattern where the main Tractor class
 * composes several specialized components, each with a single responsibility.
 * 
 * Component Structure:
 * 
 * - Tractor: The main class that composes all other components and provides the public API
 *   for controlling the tractor (movement, turning, plow control).
 * 
 * - TractorTypes: Shared interfaces and types used across all tractor components
 *   (Position, Size, MovementDirection, TurningDirection, etc.).
 * 
 * - Wheels: Handles wheel rendering and steering logic, including wheel angles and
 *   turning mechanics.
 * 
 * - SnowPlow: Manages the snow plow (aura) functionality, including lifting/lowering,
 *   angle adjustments, and rendering.
 * 
 * - TractorBody: Handles the tractor body rendering, cabin, warning lights, and
 *   smoke particle effects.
 * 
 * - Movement: Implements the movement physics using a bicycle model for realistic
 *   steering and position tracking.
 * 
 * Usage:
 * - Import the Tractor class to create and control a tractor instance
 * - Use setMovement() to control forward/backward motion
 * - Use setTurning() to control left/right steering
 * - Use setAuraTurning() to control snow plow angle
 * - Use toggleAuraLift() or setAuraLift() to control snow plow height
 */

export * from './Tractor';
export * from './TractorTypes';
export * from './Wheels';
export * from './SnowPlow';
export * from './TractorBody';
export * from './Movement'; 