export class LoadBar extends Phaser.Scene {    

    constructor(){
        super({ key: 'LoadBar' });
    }
    
    // Se declaran los pocos assets por usar en la pantalla de carga
    preload(){
        this.load.image('fondoMenu', 'assets/fondoMenu1.png');
        this.load.image('marcoBarra', 'assets/marcoVida.png');
        this.load.image('fondoBarra', 'assets/barraVidaFondo.png');
    }

    // Inmediatamente se direcciona al preload para empezar la carga de los demás elementos
    create(){
        document.fonts.load('0pt "Japab"').then(() => {     // Empezará una vez que la tipografía Japab esté cargada
            this.scene.start('Preloads');
        });

        
    }
}


