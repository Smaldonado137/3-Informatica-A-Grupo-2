export class Options extends Phaser.Scene {    

    constructor(){
        super({ key: 'Options' });
    }

    create (){
        // Imagen de fondo
        this.add.image(0, 0, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        this.add.image(0, heightScr * 0.5, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        this.add.image(widthScr * 0.5, 0, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        this.add.image(widthScr * 0.5, heightScr * 0.5, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
    }

}