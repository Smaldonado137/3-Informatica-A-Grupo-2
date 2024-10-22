import { Game } from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 800,
    parent: 'Preloads',
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {    
            gravity: { y: 700},        
            debug: true,
        }
    }
}

var game = new Phaser.Game(config);