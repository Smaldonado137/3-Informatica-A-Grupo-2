import { Preloads } from './preloads.js';
import { Game } from './game.js';
import { Pause } from './pause.js';
import { Winner } from './winner.js';

const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 850,
    parent: 'Preloads',
    scene: [Preloads, Game, Pause, Winner],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},        
            debug: true,
        }
    }
}

var game = new Phaser.Game(config);