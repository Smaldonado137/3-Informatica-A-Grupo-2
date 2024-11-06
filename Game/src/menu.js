let widthScr;
let heightScr;

export class Menu extends Phaser.Scene {    

    constructor(){
        super({ key: 'Menu' });
    }

    create(){
        widthScr = this.game.config.width;
        heightScr = this.game.config.height;

        // Imagen de fondo
        this.fondoMenu = this.add.image(0, 0, 'fondoMenu').setDisplaySize(widthScr * 1.5, heightScr).setDepth(0).setOrigin(0, 0);

        this.add.image(widthScr * 0.5, heightScr * 0.3, 'logoImg').setScale(0.55);

        let playBtn = this.add.image(widthScr * 0.5, heightScr * 0.5, 'menuBtn').setScale(0.35).setInteractive().setDepth(6);
        playBtn.on('pointerdown', () => this.play());

        
        let optionBtn = this.add.image(widthScr * 0.3, heightScr * 0.75, 'menuBtn').setScale(0.25).setInteractive().setDepth(6);
        optionBtn.on('pointerdown', () => this.options());


        let creditBtn = this.add.image(widthScr * 0.7, heightScr * 0.75, 'menuBtn').setScale(0.25).setInteractive().setDepth(6);
        creditBtn.on('pointerdown', () => this.credits());
    }

    update(){
        this.fondoMenu.x += 0.4;

        if (this.fondoMenu.x >= 0){
            this.fondoMenu.x = -(widthScr * 0.5);
        }
    }

    play(){
        this.scene.start('Game');
        console.log("aaaa");
    }

    options(){
        
    }

    credits(){

    }

}