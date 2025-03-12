import { Game } from './Game';
import './styles.css';

// Wait for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('Snow Blow game starting...');
    
    try {
        // Initialize the game
        const game = new Game('gameCanvas');
        
        // Start the game loop
        game.start();
        
        console.log('Game started successfully!');
    } catch (error) {
        console.error('Failed to start the game:', error);
    }
}); 