let inPause;
let pausePulsable;

export class Pause extends Phaser.Scene {    
    
    constructor(){
        super({ key: 'Pause' });
        
    }
    
    create(){
        const widthScr = this.scene.settings.data.widthScreen;
        const heightScr = this.scene.settings.data.heightScreen;
        inPause = false;
        pausePulsable = true;

        // Menu de Pausa
        this.pausePanel = {
            fondoNegroPantalla: this.add.graphics().fillStyle(0x000000, 0.4).fillRect(0, 0, widthScr, heightScr).setDepth(6),

            fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.5, 'fondoPausa').setScale(0.3).setDepth(7),
            
            pausaTxt: this.add.text(widthScr * 0.5, heightScr * 0.2, 'Pausa',{
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            continuarBtn: this.add.image(widthScr * 0.5, heightScr * 0.35, 'botonContinuar').setScale(0.2).setDepth(8).setInteractive(),

            reiniciarBtn: this.add.image(widthScr * 0.5, heightScr * 0.53, 'botonReiniciar').setScale(0.2).setDepth(8).setInteractive(),

            menuBtn: this.add.image(widthScr * 0.5, heightScr * 0.71, 'botonMenu').setScale(0.2).setDepth(8).setInteractive(),
        }        
        for (let objeto in this.pausePanel) {
            this.pausePanel[objeto].setVisible(false);
        }

        // Función del botón de pausa
        let pauseButton = this.add.image(widthScr * 0.95, heightScr * 0.09, 'botonPausa').setScale(0.18).setInteractive().setDepth(6);        
        pauseButton.on('pointerdown', () => this.pause(this.pausePanel));

        // Función del botón continuar
        this.pausePanel.continuarBtn.on('pointerdown', () => this.pause(pausePanel));

        // Función del botón reiniciar
        this.pausePanel.reiniciarBtn.on('pointerdown', () => this.resetGame());

        this.pauseKey = this.input.keyboard.createCursorKeys();
    }

    update(){
        if (this.pauseKey.escape.isDown || this.pauseKey.p.isDown) {
            if (pausePulsable){
                this.pause(this.pausePanel);
                pausePulsable = false;
            }
        } else if (this.pauseKey.isUp || this.pauseKey.p.isUp){
            pausePulsable = true;
        }
    }


    pause(pausePanel){
        for (let objeto in pausePanel) {
            pausePanel[objeto].setVisible(!pausePanel[objeto].visible);
        }
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
}