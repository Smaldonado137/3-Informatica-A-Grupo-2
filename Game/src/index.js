import { Preloads } from './preloads.js';
import { Game } from './game.js';
import { Pause } from './pause.js';

const config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 800,
    parent: 'Preloads',
    scene: [Preloads, Game, Pause],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},        
            debug: true,
        }
    }
}

var game = new Phaser.Game(config);