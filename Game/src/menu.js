export class Menu extends Phaser.Scene {    

    constructor(){
        super({ key: 'Menu' });
    }

    create(){
        const widthScr = this.scene.settings.data.widthScreen;
        const heightScr = this.scene.settings.data.heightScreen;

        // Imagen de fondo
        this.add.image(widthScr * 0.5, heightScr * 0.5, 'background').setDisplaySize(widthScr, heightScr);
    }

}