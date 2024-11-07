import { Preloads } from './preloads.js';
import { Game } from './game.js';
import { Pause } from './pause.js';
import { Menu } from './menu.js';

const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 850,
    parent: 'Preloads',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Preloads, Game, Pause, Menu],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},        
            debug: true,
        }
    }
}

var game = new Phaser.Game(config);