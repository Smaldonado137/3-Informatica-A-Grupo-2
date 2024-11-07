import { Preloads } from './preloads.js';
import { Menu } from './menu.js';
import { Game } from './game.js';
import { Pause } from './pause.js';

const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 850,
    parent: 'Preloads',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Preloads, Menu, Game, Pause],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},        
            debug: false,
        }
    }
}

var game = new Phaser.Game(config);