let inPause;
let pausePulsable;
let widthScr;
let heightScr;
let pausePanel;
let canReset;
let isMuted;

export class Pause extends Phaser.Scene {    
    
    constructor(){
        super({ key: 'Pause' });        
    }
    
    create(){
        widthScr = this.game.config.width;
        heightScr = this.game.config.height;
        isMuted = this.sound.mute;
        canReset = false;
        inPause = false;
        pausePulsable = true;
        
        // Menu de Pausa
        pausePanel = {
            fondoNegroPantalla: this.add.graphics().fillStyle(0x000000, 0.4).fillRect(0, 0, widthScr, heightScr).setDepth(6),

            fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.47, 'panel').setScale(0.31).setDepth(7),
            
            pausaTxt: this.add.text(widthScr * 0.5, heightScr * 0.21, 'Pausa',{
                fontFamily: 'Japab',
                fontSize : '75px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            continuarBtn: this.add.image(widthScr * 0.5, heightScr * 0.35, 'continuarNoPress').setScale(0.23).setDepth(8).setInteractive(),

            reiniciarBtn: this.add.image(widthScr * 0.5, heightScr * 0.53, 'reiniciarNoPress').setScale(0.23).setDepth(8).setInteractive(),

            menuBtn: this.add.image(widthScr * 0.5, heightScr * 0.71, 'menuNoPress').setScale(0.23).setDepth(8).setInteractive(),

            muteBtn: this.add.image(widthScr * 0.92, heightScr * 0.62, 'unmuteBtn').setScale(0.15).setInteractive().setDepth(6),

            fullScrBtn: this.add.image(widthScr * 0.92, heightScr * 0.88, 'fullScrBtn').setScale(0.09).setInteractive().setDepth(6),
        }        
        for (let objeto in pausePanel) {
            pausePanel[objeto].setVisible(false).on('pointerover', () => this.input.setDefaultCursor('pointer'))
            .on('pointerout', () => this.input.setDefaultCursor('default'));
        }

        pausePanel.continuarBtn.on('pointerdown', () => this.scene.get('Game').selectBtn.play());

        // Asegurando el sprite correcto para el botón del sonido
        if (isMuted){
            pausePanel.muteBtn.setTexture('muteBtn');
        } else {
            pausePanel.muteBtn.setTexture('unmuteBtn');
        }
        
        // Función del botón continuar
        pausePanel.continuarBtn.on('pointerdown', () => this.pause(pausePanel));
        pausePanel.continuarBtn.on('pointerover', () => {
            pausePanel.continuarBtn.setTexture('continuarPress');
            this.scene.get('Game').preSelectBtn.play();
        });
        pausePanel.continuarBtn.on('pointerout', () => {
            pausePanel.continuarBtn.setTexture('continuarNoPress');
        });
        
        // Función del botón reiniciar
        pausePanel.reiniciarBtn.on('pointerdown', () => this.resetGame());
        pausePanel.reiniciarBtn.on('pointerover', () => {
            pausePanel.reiniciarBtn.setTexture('reiniciarPress');
            this.scene.get('Game').preSelectBtn.play();
        });
        pausePanel.reiniciarBtn.on('pointerout', () => {
            pausePanel.reiniciarBtn.setTexture('reiniciarNoPress');
        });
        
        // Función del botón menú
        pausePanel.menuBtn.on('pointerdown', () => this.mainMenu());
        pausePanel.menuBtn.on('pointerover', () => {
            pausePanel.menuBtn.setTexture('menuPress');
            this.scene.get('Game').preSelectBtn.play();
        });
        pausePanel.menuBtn.on('pointerout', () => {
            pausePanel.menuBtn.setTexture('menuNoPress');
        });

        pausePanel.fullScrBtn.on('pointerdown', this.fullScreen, this);
        pausePanel.muteBtn.on('pointerdown', this.silenciar, this);

        this.pauseKey = this.input.keyboard.createCursorKeys();
    }
    
    update(){
        if (this.pauseKey.escape.isDown || this.pauseKey.p.isDown) {
            if (pausePulsable){
                this.scene.get('Game').preSelectBtn.play()
                this.pause(pausePanel);
                pausePulsable = false;
            }
        } else if (this.pauseKey.isUp || this.pauseKey.p.isUp){
            pausePulsable = true;
        }

        if (!this.scale.isFullscreen) {
            pausePanel.fullScrBtn.setTexture('NofullScrBtn');
        } else {
            pausePanel.fullScrBtn.setTexture('fullScrBtn');
        } 

        if (canReset){
            if (this.pauseKey.r.isDown){
                this.resetGame();
            }             
        }
    }
    
    silenciar() {
        this.scene.get('Game').preSelectBtn.play()
        isMuted = !isMuted;
        if (isMuted){
            pausePanel.muteBtn.setTexture('muteBtn');
        } else {
            pausePanel.muteBtn.setTexture('unmuteBtn');
        }
        this.sound.mute = isMuted;
    }
    
    fullScreen(){
        this.scene.get('Game').preSelectBtn.play()
        if (!this.scale.isFullscreen) {
            this.scale.startFullscreen();
        } else {
            this.scale.stopFullscreen();
        }        
    }
    
    pause(pausePanel){        
        for (let objeto in pausePanel) {
            pausePanel[objeto].setVisible(!pausePanel[objeto].visible);
        }
        canReset = pausePanel.fondoPausa.visible;
        if (inPause){
            this.scene.resume('Game'); 
            this.scene.get('Game').musicaFondo.resume();
            inPause = false;
        } else {
            this.scene.pause('Game');
            this.scene.get('Game').musicaFondo.pause();
            inPause = true;
        }
    }

    resetGame(){
        this.scene.get('Game').sound.sounds.forEach((audio) => {
            audio.stop();
        });
        this.scene.get('Game').scene.restart();
        this.scene.get('Game').selectBtn.play()
    }

    mainMenu(){
        this.scene.get('Game').sound.sounds.forEach((audio) => {
            audio.stop();
        });
        this.scene.stop('Game');
        this.scene.start('Menu');
        this.scene.get('Game').selectBtn.play()
    }
}