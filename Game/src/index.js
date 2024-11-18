import { Preloads } from './preloads.js';
import { Menu } from './menu.js';
import { Game } from './game.js';
import { Pause } from './pause.js';
import { LoadBar } from './loadBar.js';

const config = {
    type: Phaser.AUTO,
    width: 1450,
    height: 850,
    parent: 'LoadBar',
    scale: {        // Propiedades de la escala de la ventana
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [LoadBar, Preloads, Menu, Game, Pause],   // Escenas del juego
    physics: {      // Sistema de físicas por aplicar
        default: 'arcade',
        arcade: {    
            gravity: { y: 5000},     // Gravedad   
            debug: false,       // Visibilidad de los colliders
        }
    }
}

const game = new Phaser.Game(config);     // Instancia el juego con esas configuraciones