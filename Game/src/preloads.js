export class Preloads extends Phaser.Scene {    

    constructor(){
        super ('Preloads');
    }
    
    preload(){
        this.load.image('background', 'assets/fondo.jpg');
        this.load.image('point', 'assets/moneda.png');
        this.load.image('player1', 'assets/tazaFrente.png');
        this.load.image('player2', 'assets/panFrente.png');
        this.load.image('deadPlayer1', 'assets/muerteRojo.png');
        this.load.image('deadPlayer2', 'assets/muerteAmarillo.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');
        this.load.image('platformDojo', 'assets/fondoPlataformaDojo.png');
        this.load.image('platformaMain', 'assets/fondoPisoTecho.png');
    }

    create(){
        this.scene.start('Game');
    }
}


