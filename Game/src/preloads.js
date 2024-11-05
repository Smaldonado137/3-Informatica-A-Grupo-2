export class Preloads extends Phaser.Scene {    

    constructor(){
        super({ key: 'Preloads' });
    }
    
    preload(){
        this.load.image('fondoMenu', 'assets/fondoMenu.png');
        this.load.image('logoImg', 'assets/logo.png');
        this.load.image('menuBtn', 'assets/botonMenuPrincipal.png');

        this.load.image('background', 'assets/fondoDojo.png');
        this.load.image('platformDojo', 'assets/fondoPlataformaDojo.png');
        this.load.image('platformaMain', 'assets/fondoPisoTecho.png');
        
        this.load.image('point', 'assets/moneda.png');
        
        this.load.image('player1', 'assets/tazaFrente.png');
        this.load.image('player2', 'assets/panFrente.png');
        this.load.image('deadPlayer1', 'assets/muerteRojo.png');
        this.load.image('deadPlayer2', 'assets/muerteAmarillo.png');
        this.load.image('empateImg', 'assets/empateImg.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');
        
        this.load.image('fondoPausa', 'assets/menuFondo.png');
        this.load.image('botonPausa', 'assets/pausaBoton.png');
        this.load.image('botonContinuar', 'assets/botonContinuar.png');
        this.load.image('botonReiniciar', 'assets/botonReiniciar.png');
        this.load.image('botonMenu', 'assets/botonMenu.png');
        
    }

    create(){
        this.scene.start('Game');
    }
}


