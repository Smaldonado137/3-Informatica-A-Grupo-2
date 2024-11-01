let inPause;


export class Pause extends Phaser.Scene {    
    
    constructor(){
        super({ key: 'Pause' });
        
    }
    
    create(){
        const widthScr = this.scene.settings.data.widthScreen;
        const heightScr = this.scene.settings.data.heightScreen;
        inPause = false;

        // Menu de Pausa
        let pausePanel = {
            fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.5, 'fondoPausa').setScale(0.3).setDepth(6),
            
            pausaTxt: this.add.text(widthScr * 0.5, heightScr * 0.2, 'Pausa',{
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(7),

            continuarBtn: this.add.image(widthScr * 0.5, heightScr * 0.35, 'botonContinuar').setScale(0.2).setDepth(7).setInteractive(),

            reiniciarBtn: this.add.image(widthScr * 0.5, heightScr * 0.53, 'botonReiniciar').setScale(0.2).setDepth(7).setInteractive(),

            menuBtn: this.add.image(widthScr * 0.5, heightScr * 0.71, 'botonMenu').setScale(0.2).setDepth(7).setInteractive(),
        }        
        for (let objeto in pausePanel) {
            pausePanel[objeto].setVisible(false);
        }

        // Función del botón de pausa
        let pauseButton = this.add.image(widthScr * 0.95, heightScr * 0.09, 'botonPausa').setScale(0.18).setInteractive().setDepth(6);        
        pauseButton.on('pointerdown', () => this.pause(pausePanel));

        // Función del botón continuar
        pausePanel.continuarBtn.on('pointerdown', () => this.pause(pausePanel));

        // Función del botón reiniciar
        pausePanel.reiniciarBtn.on('pointerdown', () => this.resetGame());
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