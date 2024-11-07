let inPause;
let pausePulsable;
let widthScr;
let heightScr;

export class Pause extends Phaser.Scene {    
    
    constructor(){
        super({ key: 'Pause' });        
    }
    
    create(){
        widthScr = this.game.config.width;
        heightScr = this.game.config.height;

        inPause = false;
        pausePulsable = true;

        // Menu de Pausa
        this.pausePanel = {
            fondoNegroPantalla: this.add.graphics().fillStyle(0x000000, 0.4).fillRect(0, 0, widthScr, heightScr).setDepth(6),

            fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.5, 'fondoPausa').setScale(0.3).setDepth(7),
            
            pausaTxt: this.add.text(widthScr * 0.5, heightScr * 0.2, 'Pausa',{
                fontFamily: 'Japan',
                fontSize : '60px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            continuarBtn: this.add.image(widthScr * 0.5, heightScr * 0.35, 'button').setScale(0.25).setDepth(8).setInteractive(),
            continuarTxt: this.add.text(widthScr * 0.5, heightScr * 0.35, 'Continuar',{
                fontFamily: 'Japan',
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            reiniciarBtn: this.add.image(widthScr * 0.5, heightScr * 0.53, 'button').setScale(0.25).setDepth(8).setInteractive(),
            reiniciarTxt: this.add.text(widthScr * 0.5, heightScr * 0.53, 'Reiniciar',{
                fontFamily: 'Japan',
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),

            menuBtn: this.add.image(widthScr * 0.5, heightScr * 0.71, 'button').setScale(0.25).setDepth(8).setInteractive(),
            menuTxt: this.add.text(widthScr * 0.5, heightScr * 0.71, 'Menu',{
                fontFamily: 'Japan',
                fontSize : '40px',
                fill: '#000000',
            }).setOrigin(0.5).setDepth(8),
        }        
        for (let objeto in this.pausePanel) {
            this.pausePanel[objeto].setVisible(false);
        }

        // Función del botón continuar
        this.pausePanel.continuarBtn.on('pointerdown', () => this.pause(this.pausePanel));
        this.pausePanel.continuarBtn.on('pointerover', () => {
            this.pausePanel.continuarBtn.setTexture('buttonPressed');
        });
        this.pausePanel.continuarBtn.on('pointerout', () => {
            this.pausePanel.continuarBtn.setTexture('button');
        });

        // Función del botón reiniciar
        this.pausePanel.reiniciarBtn.on('pointerdown', () => this.resetGame());
        this.pausePanel.reiniciarBtn.on('pointerover', () => {
            this.pausePanel.reiniciarBtn.setTexture('buttonPressed');
        });
        this.pausePanel.reiniciarBtn.on('pointerout', () => {
            this.pausePanel.reiniciarBtn.setTexture('button');
        });

        // Función del botón menú
        this.pausePanel.menuBtn.on('pointerdown', () => this.mainMenu());
        this.pausePanel.menuBtn.on('pointerover', () => {
            this.pausePanel.menuBtn.setTexture('buttonPressed');
        });
        this.pausePanel.menuBtn.on('pointerout', () => {
            this.pausePanel.menuBtn.setTexture('button');
        });

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

    mainMenu(){
        this.scene.start('Menu');
    }
}