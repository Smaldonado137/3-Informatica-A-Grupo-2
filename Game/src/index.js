import { Preloads } from './preloads.js';
import { Game } from './game.js';
import { Pause } from './pause.js';
import { Menu } from './menu.js';
import { Options } from './options.js';
import { Credits } from './credits.js';

const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 850,
    parent: 'Preloads',
    scene: [Preloads, Game, Pause, Menu, Options, Credits],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},        
            debug: true,
        }
    }
}

var game = new Phaser.Game(config);