let widthScr;
let heightScr;

let returnBtn;
let panelMainMenu;
let panelOptions;
let panelControls;
let panelCredits;

let isMuted = false;

export class Menu extends Phaser.Scene {    

    constructor(){
        super({ key: 'Menu' });
    }

    create(){
        widthScr = this.game.config.width;      // Saca el ancho y alto de la ventana del juego para ser usado de
        heightScr = this.game.config.height;    // manera proporcional en ubicación y dimensiones de los objetos
        this.input.setDefaultCursor('default');

        // Imagen de fondo
        this.fondoMenu = this.add.image(0, 0, 'fondoMenu').setDisplaySize(widthScr * 1.5, heightScr).setDepth(0).setOrigin(0, 0);

        returnBtn = this.add.image(widthScr * 0.08, heightScr * 0.89, 'regresarBtn').setScale(0.09).setInteractive().setDepth(6).setVisible(false).on('pointerover', () => this.input.setDefaultCursor('pointer')).on('pointerout', () => this.input.setDefaultCursor('default'));


        // Panel del menú principal
        panelMainMenu = {
            logo: this.add.image(widthScr * 0.5, heightScr * 0.23, 'logoImg').setScale(0.29),

            playBtn: this.add.image(widthScr * 0.5, heightScr * 0.54, 'jugarNoPress').setScale(0.3).setInteractive().setDepth(6),
            
            optionBtn: this.add.image(widthScr * 0.22, heightScr * 0.77, 'opcionesNoPress').setScale(0.22).setInteractive().setDepth(6),     
            
            controlBtn: this.add.image(widthScr * 0.5, heightScr * 0.77, 'jugarNoPress').setScale(0.22).setInteractive().setDepth(6),

            creditBtn: this.add.image(widthScr * 0.78, heightScr * 0.77, 'creditosNoPress').setScale(0.22).setInteractive().setDepth(6),
        }
        
        // Funciones del menú principal
        panelMainMenu.playBtn.on('pointerdown', this.play, this);
        panelMainMenu.playBtn.on('pointerover', () => {
            panelMainMenu.playBtn.setTexture('jugarPress');
            this.input.setDefaultCursor('pointer');
        });
        panelMainMenu.playBtn.on('pointerout', () => {
            panelMainMenu.playBtn.setTexture('jugarNoPress');
            this.input.setDefaultCursor('default');
        });

        panelMainMenu.optionBtn.on('pointerdown', this.options, this);
        panelMainMenu.optionBtn.on('pointerover', () => {
            panelMainMenu.optionBtn.setTexture('opcionesPress');
            this.input.setDefaultCursor('pointer');
        });
        panelMainMenu.optionBtn.on('pointerout', () => {
            panelMainMenu.optionBtn.setTexture('opcionesNoPress');
            this.input.setDefaultCursor('default');
        });

        panelMainMenu.controlBtn.on('pointerdown', this.controls, this);
        panelMainMenu.controlBtn.on('pointerover', () => {
            panelMainMenu.controlBtn.setTexture('jugarPress');
            this.input.setDefaultCursor('pointer');
        });
        panelMainMenu.controlBtn.on('pointerout', () => {
            panelMainMenu.controlBtn.setTexture('jugarNoPress');
            this.input.setDefaultCursor('default');
        });

        panelMainMenu.creditBtn.on('pointerdown', this.credits, this);
        panelMainMenu.creditBtn.on('pointerover', () => {
            panelMainMenu.creditBtn.setTexture('creditosPress');
            this.input.setDefaultCursor('pointer');
        });
        panelMainMenu.creditBtn.on('pointerout', () => {
            panelMainMenu.creditBtn.setTexture('creditosNoPress');
            this.input.setDefaultCursor('default');
        });

        // Panel de opciones
        panelOptions = {
            muteBtn: this.add.image(widthScr * 0.505, heightScr * 0.32, 'unmuteBtn').setScale(0.15).setInteractive().setDepth(6),
            
            fullScrBtn: this.add.image(widthScr * 0.5, heightScr * 0.68, 'fullScrBtn').setScale(0.1).setInteractive().setDepth(6),

            returnBtn: returnBtn.setVisible(true),
        }
        // Funciones de opciones
        panelOptions.muteBtn.on('pointerdown', this.silenciar, this);
        panelOptions.fullScrBtn.on('pointerdown', this.fullScreen, this);
        panelOptions.returnBtn.on('pointerdown', this.returnToMenu, this);

        for (let objeto in panelOptions) {
            panelOptions[objeto].setVisible(false).on('pointerover', () => this.input.setDefaultCursor('pointer'))
            .on('pointerout', () => this.input.setDefaultCursor('default'));
        }

        // Panel controles
        panelControls = {
            player1Txt: this.add.image(widthScr * 0.28, heightScr * 0.14, 'jugadorP1Txt').setScale(0.25).setDepth(6),
            player2Txt: this.add.image(widthScr * 0.72, heightScr * 0.14, 'jugadorP2Txt').setScale(0.25).setDepth(6),
            pausarTxt: this.add.image(widthScr * 0.5, heightScr * 0.635, 'pausarTxt').setScale(0.2).setDepth(6),
            player1Img: this.add.image(widthScr * 0.28, heightScr * 0.39, 'victP1').setScale(0.17).setDepth(6),
            player2Img: this.add.image(widthScr * 0.72, heightScr * 0.39, 'victP2').setScale(0.17).setDepth(6),
            wasdImg:this.add.image(widthScr * 0.28, heightScr * 0.74, 'wasdTeclado').setScale(0.55).setDepth(6),
            arrowsImg: this.add.image(widthScr * 0.72, heightScr * 0.74, 'flechasTeclado').setScale(0.55).setDepth(6),
            pImg: this.add.image(widthScr * 0.5, heightScr * 0.74, 'pTeclado').setScale(0.15).setDepth(6),

            returnBtn: returnBtn.setVisible(true),
        }

        for (let objeto in panelControls) {
            panelControls[objeto].setVisible(false);
        }

        // Panel creditos
        panelCredits = {
            creditosTxt: this.add.text(widthScr * 0.5, heightScr * 0.25, 'Hecho por Santiago Maldonado y Juan Navia',{
                fontFamily: 'Japab',
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            returnBtn: returnBtn.setVisible(true),
        }
        for (let objeto in panelCredits) {
            panelCredits[objeto].setVisible(false);
        }
        
        if (isMuted){
            panelOptions.muteBtn.setTexture('muteBtn');
        } else {
            panelOptions.muteBtn.setTexture('unmuteBtn');
        }
        
    }

    update(){
        this.fondoMenu.x += 0.4;

        if (this.fondoMenu.x >= 0){
            this.fondoMenu.x = -(widthScr * 0.5);
        }
        
        if (!this.scale.isFullscreen) {
            panelOptions.fullScrBtn.setTexture('NofullScrBtn');
        } else {
            panelOptions.fullScrBtn.setTexture('fullScrBtn');
        }   
    }

    silenciar() {
        isMuted = !isMuted;
        if (isMuted){
            panelOptions.muteBtn.setTexture('muteBtn');
        } else {
            panelOptions.muteBtn.setTexture('unmuteBtn');
        }
        this.sound.mute = isMuted;
        console.log("aaaa");
    }

    fullScreen(){
        if (!this.scale.isFullscreen) {
            this.scale.startFullscreen();
        } else {
            this.scale.stopFullscreen();
        }        
    }
    

    play(){
        this.scene.start('Game');
    }

    // Al ir a opciones, se invisibiliza el panel principal y se hace visible el panel de opciones (con esta lógica se hacen los demás)
    options(){        
        for (let objeto in panelOptions) {
            panelOptions[objeto].setVisible(true);
        }

        for (let objeto in panelMainMenu) {
            panelMainMenu[objeto].setVisible(false);
        }
    }

    controls(){        
        for (let objeto in panelControls) {
            panelControls[objeto].setVisible(true);
        }

        for (let objeto in panelMainMenu) {
            panelMainMenu[objeto].setVisible(false);
        }
    }

    credits(){
        for (let objeto in panelCredits) {
            panelCredits[objeto].setVisible(true);
        }

        for (let objeto in panelMainMenu) {
            panelMainMenu[objeto].setVisible(false);
        }
    }

    // Al regresar al menú, se invisibilizan todos los paneles y se hace visible el panel principal
    returnToMenu(){
        for (let objeto in panelOptions) {
            panelOptions[objeto].setVisible(false);
        }

        for (let objeto in panelControls) {
            panelControls[objeto].setVisible(false);
        }

        for (let objeto in panelCredits) {
            panelCredits[objeto].setVisible(false);
        }

        for (let objeto in panelMainMenu) {
            panelMainMenu[objeto].setVisible(true);
        }
    }

}