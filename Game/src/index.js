import { Game } from './game.js';
import { Preloads } from './preloads.js';

const config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 800,
    parent: 'Preloads',
    scene: [Preloads, Game],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},        
            debug: true,
        }
    }
}

var game = new Phaser.Game(config);