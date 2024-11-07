let widthScr;
let heightScr;

let returnBtn;
let panelMainMenu;
let panelOptions;
let panelCredits;

let isMuted = false;

export class Menu extends Phaser.Scene {    

    constructor(){
        super({ key: 'Menu' });
    }

    create(){
        widthScr = this.game.config.width;
        heightScr = this.game.config.height;

        // Imagen de fondo
        this.fondoMenu = this.add.image(0, 0, 'fondoMenu').setDisplaySize(widthScr * 1.5, heightScr).setDepth(0).setOrigin(0, 0);

        returnBtn = this.add.image(widthScr * 0.05, heightScr * 0.92, 'botonPausa').setScale(0.2).setInteractive().setDepth(6).setVisible(false);


        // Panel del menú principal
        panelMainMenu = {
            logo: this.add.image(widthScr * 0.5, heightScr * 0.3, 'logoImg').setScale(0.55),

            playBtn: this.add.image(widthScr * 0.5, heightScr * 0.5, 'menuBtn').setScale(0.35).setInteractive().setDepth(6),
            
            optionBtn: this.add.image(widthScr * 0.3, heightScr * 0.75, 'menuBtn').setScale(0.25).setInteractive().setDepth(6),
                        
            creditBtn: this.add.image(widthScr * 0.7, heightScr * 0.75, 'menuBtn').setScale(0.25).setInteractive().setDepth(6),
        }
        
        panelMainMenu.playBtn.on('pointerdown', this.play, this);
        panelMainMenu.optionBtn.on('pointerdown', this.options, this);
        panelMainMenu.creditBtn.on('pointerdown', this.credits, this);


        // Panel de opciones
        panelOptions = {
            muteBtn: this.add.image(widthScr * 0.5, heightScr * 0.35, 'menuBtn').setScale(0.3).setInteractive().setDepth(6),
            
            fullScrBtn: this.add.image(widthScr * 0.5, heightScr * 0.65, 'menuBtn').setScale(0.3).setInteractive().setDepth(6),

            returnBtn: returnBtn.setVisible(true),
        }

        panelOptions.muteBtn.on('pointerdown', this.silenciar, this);
        panelOptions.fullScrBtn.on('pointerdown', this.fullScreen, this);
        panelOptions.returnBtn.on('pointerdown', this.returnToMenu, this);

        for (let objeto in panelOptions) {
            panelOptions[objeto].setVisible(false);
        }

        // Panel creditos
        panelCredits = {
            creditosTxt: this.add.text(widthScr * 0.5, heightScr * 0.25, 'Hecho',{
                fontFamily: 'Japanese Brush',
                fontSize : '100px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            returnBtn: returnBtn.setVisible(true),
        }

        for (let objeto in panelCredits) {
            panelCredits[objeto].setVisible(false);
        }
        
    }

    update(){
        this.fondoMenu.x += 0.4;

        if (this.fondoMenu.x >= 0){
            this.fondoMenu.x = -(widthScr * 0.5);
        }
    }

    silenciar() {
        isMuted = !isMuted;
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

    options(){        
        for (let objeto in panelOptions) {
            panelOptions[objeto].setVisible(true);
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

    returnToMenu(){
        for (let objeto in panelOptions) {
            panelOptions[objeto].setVisible(false);
        }

        for (let objeto in panelCredits) {
            panelCredits[objeto].setVisible(false);
        }

        for (let objeto in panelMainMenu) {
            panelMainMenu[objeto].setVisible(true);
        }
    }

}