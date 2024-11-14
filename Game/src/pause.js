let inPause;
let pausePulsable;
let widthScr;
let heightScr;
let pausePanel;
let canReset;

export class Pause extends Phaser.Scene {    
    
    constructor(){
        super({ key: 'Pause' });        
    }
    
    create(){
        widthScr = this.game.config.width;
        heightScr = this.game.config.height;

        canReset = false;
        inPause = false;
        pausePulsable = true;

        // Menu de Pausa
        pausePanel = {
            fondoNegroPantalla: this.add.graphics().fillStyle(0x000000, 0.4).fillRect(0, 0, widthScr, heightScr).setDepth(6),

            fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.47, 'panel').setScale(0.31).setDepth(7),
            
            pausaTxt: this.add.text(widthScr * 0.5, heightScr * 0.21, 'Pausa',{
                fontFamily: 'Japan',
                fontSize : '75px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            continuarBtn: this.add.image(widthScr * 0.5, heightScr * 0.35, 'continuarNoPress').setScale(0.25).setDepth(8).setInteractive(),

            reiniciarBtn: this.add.image(widthScr * 0.5, heightScr * 0.53, 'reiniciarNoPress').setScale(0.25).setDepth(8).setInteractive(),

            menuBtn: this.add.image(widthScr * 0.5, heightScr * 0.71, 'menuNoPress').setScale(0.25).setDepth(8).setInteractive(),

            fullScrBtn: this.add.image(widthScr * 0.92, heightScr * 0.88, 'fullScrBtn').setScale(0.09).setInteractive().setDepth(6),
        }        
        for (let objeto in pausePanel) {
            pausePanel[objeto].setVisible(false).on('pointerover', () => this.input.setDefaultCursor('pointer'))
            .on('pointerout', () => this.input.setDefaultCursor('default'));
        }
        
        // Función del botón continuar
        pausePanel.continuarBtn.on('pointerdown', () => this.pause(pausePanel));
        pausePanel.continuarBtn.on('pointerover', () => {
            pausePanel.continuarBtn.setTexture('continuarPress');
        });
        pausePanel.continuarBtn.on('pointerout', () => {
            pausePanel.continuarBtn.setTexture('continuarNoPress');
        });
        
        // Función del botón reiniciar
        pausePanel.reiniciarBtn.on('pointerdown', () => this.resetGame());
        pausePanel.reiniciarBtn.on('pointerover', () => {
            pausePanel.reiniciarBtn.setTexture('reiniciarPress');
        });
        pausePanel.reiniciarBtn.on('pointerout', () => {
            pausePanel.reiniciarBtn.setTexture('reiniciarNoPress');
        });
        
        // Función del botón menú
        pausePanel.menuBtn.on('pointerdown', () => this.mainMenu());
        pausePanel.menuBtn.on('pointerover', () => {
            pausePanel.menuBtn.setTexture('menuPress');
        });
        pausePanel.menuBtn.on('pointerout', () => {
            pausePanel.menuBtn.setTexture('menuNoPress');
        });

        pausePanel.fullScrBtn.on('pointerdown', this.fullScreen, this);
        
        this.pauseKey = this.input.keyboard.createCursorKeys();
    }
    
    update(){
        if (this.pauseKey.escape.isDown || this.pauseKey.p.isDown) {
            if (pausePulsable){
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
    
    
    fullScreen(){
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
            inPause = false;
        } else {
            this.scene.pause('Game');
            inPause = true;
        }
    }

    resetGame(){
        this.scene.get('Game').scene.restart();
    }

    mainMenu(){
        this.scene.stop('Game');
        this.scene.start('Menu');
    }
}