let widthScr;
let heightScr;

export class Menu extends Phaser.Scene {    

    constructor(){
        super({ key: 'Menu' });
    }

    create(){
        widthScr = this.scene.settings.data.widthScreen;
        heightScr = this.scene.settings.data.heightScreen;

        // Imagen de fondo
        this.add.image(0, 0, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        this.add.image(0, heightScr * 0.5, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        this.add.image(widthScr * 0.5, 0, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        this.add.image(widthScr * 0.5, heightScr * 0.5, 'fondoMenu').setDisplaySize(widthScr * 0.5, heightScr * 0.5).setDepth(0).setOrigin(0, 0);
        

        this.add.image(widthScr * 0.5, heightScr * 0.3, 'logoImg').setScale(0.55);

        let playBtn = this.add.image(widthScr * 0.5, heightScr * 0.5, 'menuBtn').setScale(0.35).setInteractive().setDepth(6);
        playBtn.on('pointerdown', () => this.play());

        
        let optionBtn = this.add.image(widthScr * 0.3, heightScr * 0.75, 'menuBtn').setScale(0.25).setInteractive().setDepth(6);
        optionBtn.on('pointerdown', () => this.options());


        let creditBtn = this.add.image(widthScr * 0.7, heightScr * 0.75, 'menuBtn').setScale(0.25).setInteractive().setDepth(6);
        creditBtn.on('pointerdown', () => this.credits());
    }

    play(){
        this.scene.start('Game');
        console.log("aaaa");
    }

    options(){
        this.scene.start('Options', {widthScreen: widthScr, heightScreen: heightScr});
    }

    credits(){
        this.scene.start('Credits', {widthScreen: widthScr, heightScreen: heightScr});
    }

}