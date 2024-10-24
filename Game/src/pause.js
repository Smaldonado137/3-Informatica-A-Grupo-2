let widthScr = 1300;
let heightScr = 800;
let inPause = false;

export class Pause extends Phaser.Scene {    

    constructor(){
        super({ key: 'Pause' });
    }

    create(){
        // Menu de Pausa
        let pausePanel = {
            fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.5, 'fondoPausa').setScale(0.3).setDepth(6),
            pausaTxt: this.add.text(widthScr * 0.5, heightScr * 0.5, 'HOLA',{
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(7),
        }        
        for (let objeto in pausePanel) {
            pausePanel[objeto].setVisible(false);
        }

        let pauseButton = this.add.image(widthScr - 75, heightScr - 730, 'botonPausa').setScale(0.2).setInteractive().setDepth(6);;
        pauseButton.on('pointerdown', () => this.pause(pausePanel));
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
}