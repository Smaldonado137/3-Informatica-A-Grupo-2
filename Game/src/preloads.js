export class Preloads extends Phaser.Scene {    

    constructor(){
        super({ key: 'Preloads' });
    }
    
    preload(){
        this.load.image('fondoMenu', 'assets/fondoMenu.png');
        this.load.image('logoImg', 'assets/logo.png');
        this.load.image('menuBtn', 'assets/botonMenuPrincipal.png');
        this.load.image('fullScrBtn', 'assets/flechasPantalla.png');
        this.load.image('muteBtn', 'assets/muted.png');
        this.load.image('unmuteBtn', 'assets/noMuted.png');
        this.load.image('button', 'assets/botonNoPresionado.png');
        this.load.image('buttonPressed', 'assets/botonPresionado.png');


        this.load.image('background', 'assets/fondoDojo.png');
        this.load.image('platformDojo', 'assets/fondoPlataformaDojo.png');
        this.load.image('pisoDojo', 'assets/pisoDojo.png');
        this.load.image('dojoParedDer', 'assets/bambuDojoDer.png');
        this.load.image('dojoParedIzq', 'assets/bambuDojoIzq.png');

        this.load.spritesheet('queso', 'assets/c.png', {frameWidth: 400, frameHeight: 400});

        this.load.spritesheet('player1', 'assets/a.png', {frameWidth: 488, frameHeight: 489});
        this.load.spritesheet('player2', 'assets/b.png', {frameWidth: 488, frameHeight: 489});

        this.load.image('empateImg', 'assets/empateImg.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');
        this.load.image('cabezaTaza', 'assets/cabezaTaza.png');
        this.load.image('cabezaPan', 'assets/cabezaPan.png');
        
        this.load.image('fondoPausa', 'assets/menuFondo.png');
        this.load.image('botonPausa', 'assets/pausaBoton.png');
        this.load.image('botonContinuar', 'assets/botonContinuar.png');
        this.load.image('botonReiniciar', 'assets/botonReiniciar.png');
        this.load.image('botonMenu', 'assets/botonMenu.png');
        
    }

    create(){
        this.scene.start('Menu');
    }
}


