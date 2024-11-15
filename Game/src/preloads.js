export class Preloads extends Phaser.Scene {    

    constructor(){
        super({ key: 'Preloads' });
    }
    
    // Se declara del directorio donde se sacan los assets y se les asigna un nombre
    preload(){
        this.load.image('fondoMenu', 'assets/fondoMenu1.png');
        this.load.image('logoImg', 'assets/logo.png');
        
        this.load.image('NofullScrBtn', 'assets/flechasPantalla.png');
        this.load.image('fullScrBtn', 'assets/flechasPantallaMinimizar.png');
        this.load.image('muteBtn', 'assets/muted.png');
        this.load.image('unmuteBtn', 'assets/noMuted.png');
        this.load.image('jugadorP1Txt', 'assets/jugadorP1Txt.png');
        this.load.image('jugadorP2Txt', 'assets/jugadorP2Txt.png');
        this.load.image('pausarTxt', 'assets/pausarTxt.png');
        this.load.image('wasdTeclado', 'assets/wasdTeclado.png');
        this.load.image('flechasTeclado', 'assets/flechasTeclado.png');
        this.load.image('pTeclado', 'assets/pTeclado.png');

        this.load.image('continuarPress', 'assets/continuarPress.png');
        this.load.image('continuarNoPress', 'assets/continuarNoPress.png');
        this.load.image('reiniciarPress', 'assets/reiniciarPress.png');
        this.load.image('reiniciarNoPress', 'assets/reiniciarNoPress.png');
        this.load.image('menuPress', 'assets/menuPress.png');
        this.load.image('menuNoPress', 'assets/menuNoPress.png');

        this.load.image('jugarPress', 'assets/jugarPress.png');
        this.load.image('jugarNoPress', 'assets/jugarNoPress.png');
        this.load.image('opcionesPress', 'assets/opcionesPress.png');
        this.load.image('opcionesNoPress', 'assets/opcionesNoPress.png');
        this.load.image('creditosPress', 'assets/creditosPress.png');
        this.load.image('creditosNoPress', 'assets/creditosNoPress.png');

        this.load.image('regresarBtn', 'assets/flechaVolver.png');

        this.load.image('background', 'assets/fondoDojo.png');
        this.load.image('platformDojo', 'assets/fondoPlataformaDojo.png');
        this.load.image('pisoDojo', 'assets/pisoDojo.png');
        this.load.image('dojoParedDer', 'assets/bambuDojoDer.png');
        this.load.image('dojoParedIzq', 'assets/bambuDojoIzq.png');

        this.load.spritesheet('queso', 'assets/spritesheetQueso.png', {frameWidth: 700, frameHeight: 700});

        this.load.spritesheet('player1', 'assets/spritesheetTaza.png', {frameWidth: 700, frameHeight: 700});
        this.load.spritesheet('player2', 'assets/spritesheetPan.png', {frameWidth: 700, frameHeight: 700});

        this.load.image('victP1', 'assets/tazaFrente.png');
        this.load.image('victP2', 'assets/panFrente.png');
        this.load.image('empateImg', 'assets/empateImg.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');
        this.load.image('marcoBarra', 'assets/marcoVida.png');
        this.load.image('cabezaTaza', 'assets/cabezaTaza.png');
        this.load.image('cabezaPan', 'assets/cabezaPan.png');
        
        this.load.image('panel', 'assets/panel.png');
        
    }

    // Inmediatamente se direcciona a la escena del menú principal
    create(){
        this.scene.start('Menu');
    }
}


