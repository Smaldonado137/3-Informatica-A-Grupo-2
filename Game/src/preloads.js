export class Preloads extends Phaser.Scene {    

    constructor(){
        super({ key: 'Preloads' });
    }
    
    // Se declara del directorio donde se sacan los assets y se les asigna un nombre identificador
    preload(){
        // Pantalla de carga
        this.loadScr();

        // Precarga de todos los demás assets por usar en el juego
        this.load.image('logoImg', 'assets/logo.png');
        
        this.load.image('NofullScrBtn', 'assets/flechasPantalla.png');
        this.load.image('fullScrBtn', 'assets/flechasPantallaMinimizar.png');
        this.load.image('muteBtn', 'assets/muted.png');
        this.load.image('unmuteBtn', 'assets/noMuted.png');
        this.load.image('jugadorP1Txt', 'assets/jugadorP1Txt.png');
        this.load.image('jugadorP2Txt', 'assets/jugadorP2Txt.png');
        this.load.image('pausarTxt', 'assets/pausarTxt.png');
        this.load.image('wasdTeclado', 'assets/wasdTeclado.png');
        this.load.image('flechasTeclado', 'assets/flechasTeclado.png');
        this.load.image('pTeclado', 'assets/pTeclado.png');
        
        this.load.image('panel', 'assets/panel.png');

        this.load.image('continuarPress', 'assets/continuarPress.png');
        this.load.image('continuarNoPress', 'assets/continuarNoPress.png');
        this.load.image('reiniciarPress', 'assets/reiniciarPress.png');
        this.load.image('reiniciarNoPress', 'assets/reiniciarNoPress.png');
        this.load.image('menuPress', 'assets/menuPress.png');
        this.load.image('menuNoPress', 'assets/menuNoPress.png');
        this.load.image('logoPhaser', 'assets/logoPhaser.png');

        this.load.image('jugarPress', 'assets/jugarPress.png');
        this.load.image('jugarNoPress', 'assets/jugarNoPress.png');
        this.load.image('opcionesPress', 'assets/opcionesPress.png');
        this.load.image('opcionesNoPress', 'assets/opcionesNoPress.png');
        this.load.image('controlesPress', 'assets/controlesPress.png');
        this.load.image('controlesNoPress', 'assets/controlesNoPress.png');
        this.load.image('creditosPress', 'assets/creditosPress.png');
        this.load.image('creditosNoPress', 'assets/creditosNoPress.png');

        this.load.image('regresarBtn', 'assets/flechaVolver.png');

        this.load.image('background', 'assets/fondoDojo.png');
        this.load.image('platformDojo', 'assets/fondoPlataformaDojo.png');
        this.load.image('pisoDojo', 'assets/pisoDojo.png');
        this.load.image('dojoParedDer', 'assets/bambuDojoDer.png');
        this.load.image('dojoParedIzq', 'assets/bambuDojoIzq.png');

        this.load.spritesheet('queso', 'assets/spritesheetQueso.png', {frameWidth: 700, frameHeight: 700});

        this.load.spritesheet('player1', 'assets/spritesheetTaza.png', {frameWidth: 700, frameHeight: 700});
        this.load.spritesheet('player2', 'assets/spritesheetPan.png', {frameWidth: 700, frameHeight: 700});

        this.load.image('victP1', 'assets/tazaFrente.png');
        this.load.image('victP2', 'assets/panFrente.png');
        this.load.image('empateImg', 'assets/empateImg.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');

        this.load.image('cabezaTaza', 'assets/cabezaTaza.png');
        this.load.image('cabezaPan', 'assets/cabezaPan.png');
        
        this.load.audio('sonidoPasos', 'assets/sonidoPasos.mp3');
        this.load.audio('sonidoCaida', 'assets/sonidoPreselectBtn.mp3');
        this.load.audio('sonidoGong', 'assets/sonidoGong.mp3');
        this.load.audio('sonidoTambor', 'assets/sonidoTambor.mp3');
        this.load.audio('sonidoAparecer', 'assets/sonidoAparecer.mp3');
        this.load.audio('sonidoObtener', 'assets/sonidoObtener.mp3');
        this.load.audio('sonidoPreselectBtn', 'assets/sonidoPreselectBtn.mp3');
        this.load.audio('sonidoSelectBtn', 'assets/sonidoSelectBtn.mp3');
        this.load.audio('musicaFondoMenu', 'assets/musicaFondoMenu.mp3');
        this.load.audio('musicaFondo', 'assets/musicaFondoDojo.mp3');
        this.load.audio('musicaGanar', 'assets/musicaGanar.mp3');
    }

    // Se direcciona a la escena del menú principal una vez que todos los elementos se han precargado
    create(){
        this.scene.start('Menu');
    }

    loadScr(){
        // Uso del ancho y alto de la pantalla del juego para tomar de referencia en ubicación y dimensiones de los objetos
        let widthScr = this.game.config.width;
        let heightScr = this.game.config.height;
        
        // Uso de los pocos assets precargados para hacer la ambientación
        this.fondoMenu = this.add.image(0, 0, 'fondoMenu').setDisplaySize(widthScr * 1.5, heightScr).setDepth(0).setOrigin(0, 0).setDepth(0);
        this.fondoBarra = this.add.image(widthScr * 0.5, heightScr * 0.55, 'marcoBarra').setScale(0.6).setDepth(8);
        this.fondoBarra.displayWidth = widthScr * 0.65;
        this.fondoBarra.displayHeight = heightScr * 0.3;

        // Dibujar la barra de carga
        const progressBar = this.add.graphics().setDepth(5);
        
        // Texto "Cargando..."
        const loadingText = this.add.text(widthScr * 0.5, heightScr * 0.4, 'Cargando...', {
            fontFamily: 'Japab',
            fontSize: '50px',
            color: '#DD992C'
        }).setOrigin(0.5).setDepth(6);

        // Texto con porcentaje de carga
        const percentText = this.add.text(widthScr * 0.5, heightScr * 0.555, '0%', {
            fontFamily: 'Japab',
            fontSize: '55px',
            color: '#ffffff'
        }).setOrigin(0.5).setDepth(7);
        
        // Actualización de la barra de carga
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%'); // Actualiza el porcentaje
            progressBar.clear();
            progressBar.fillStyle(0xD18E21, 1); // Color de la barra
            progressBar.fillRect(widthScr * 0.25, heightScr * 0.5, (widthScr * 0.509) * value, heightScr * 0.1);
        });
    }
}


