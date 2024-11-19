let widthScr;
let heightScr;

let speedPlayers = 600;
let jump = 1350;

let margenSalto = 10;

let canReset;

let gameOver;
let playerDeath;
let empate;

let tiempoReal;

let contadorPlayers = 3 * 1000;

// let contNumero1 = document.getElementById('num');
// let contNumero2 = document.getElementById('num2');

let limMax = 3;
let widthMaxBarra;

let intervaloPuntos = 2;
let existingPoint;
let firstAppear;
let instancePanWin;

let platformsScale = 0.12;

let contadorInicialTxt;
let contadorInicial;
let inCount;
let initialCountEvent;
let initialSoundEvent;

export class Game extends Phaser.Scene {    

    constructor(){
        super({ key: 'Game' });
    }
    
    create(){
        // Estandarizando variables al iniciar la escena
        widthScr = this.game.config.width;
        heightScr = this.game.config.height;
        canReset = false;
        gameOver = false;
        inCount = true
        empate = false;
        firstAppear = true;
        instancePanWin = 0;
        existingPoint = false;
        tiempoReal = 0;
        playerDeath = -1;
        widthMaxBarra = widthScr * 0.014;

        // Imagen de fondo
        this.add.image(widthScr * 0.5, heightScr * 0.5, 'background').setDisplaySize(widthScr, heightScr);

        this.creatingAudios();

        // Contador inicial
        contadorInicial = 3;
        contadorInicialTxt = this.add.text(widthScr * 0.5, heightScr * 0.5, contadorInicial,{
            fontFamily: 'Japab',
            fontSize : '450px',
            fill: '#ffffff',
        }).setOrigin(0.5).setDepth(7).setStroke('#000000', 30),

        this.sonidoConteo.play();
        this.initialCount();

        // Asignando teclas pulsables
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.setDefaultCursor('default');
        
        // Creando Jugadores
        this.creatingPlayers();        
        
        // Creando grupo de plataformas
        this.creatingPlatforms();
        
        // Creando grupo de puntos
        this.createPoint();
        
        // Creando animaciones
        this.creatingAnims();

        // Sistema de pausa
        this.scene.launch('Pause');        
            
    }
    
    update(time, delta){
        if (!inCount){      // Si está en la cuenta regresiva inicial no se ejecutará nada
            tiempoReal += delta;       // Se toma el tiempo que transcurre mientras la escena está activa y despausada

            if (!gameOver){     // Mientras el juego no se acabe se procesará lo siguiente
                this.onPlayerNoMov(this.player1);
                this.onPlayerNoMov(this.player2);
    
                // Victoria por puntos
                if (Math.abs(this.player1.puntaje - this.player2.puntaje) == 3){
                    if (this.player1.puntaje > this.player2.puntaje){
                        this.player2.lose = true;
                        this.animPlayerDead(this.player2, this.player2.nameDead, 0.036);
                    } else {
                        this.player1.lose = true;
                        this.animPlayerDead(this.player1, this.player1.nameDead, 0.036);
                    }
                    gameOver = true;
                    this.delaySysVictoria(this.player1, this.player2);                
                }
            }
            
            // Asignando que la barra de vida es estática y que se ajusta a la cantidad numérica del player relacionada con dicha barra
            this.player1.barraMov.setScrollFactor(0);
            this.player1.barraMov.displayWidth = this.player1.barraMov.cantidad;
            
            this.player2.barraMov.setScrollFactor(0);
            this.player2.barraMov.displayWidth = this.player2.barraMov.cantidad;
            
            //contNumero1.textContent = Math.round(this.player1.contador/100);
            //contNumero2.textContent = Math.round(this.player2.contador/100);

            // Atajo para reiniciar presionando R al terminar una partida
            if (canReset){
                if (this.cursors.r.isDown){
                    this.resetGame();
                }                
            }
            
            this.movementPlayer(this.player1);
            this.movementPlayer(this.player2);
        }        
    }

    initialCount(){     // Función con el contador inicial que disminuye la cuenta cada Cierto tiempo
        initialCountEvent = this.time.addEvent({
            delay: 650,     // <- "Cierto tiempo" en milisegundos
            callback: this.decreaseInitialCount, // Función a llamar
            callbackScope: this,
            loop: true,
            paused: !inCount,   // Se pausará el conteo si pausan la escena
        });

        initialSoundEvent = this.time.addEvent({
            delay: 1800,     // <- "Cierto tiempo" en milisegundos
            callback: this.soundInitialCount, // Función a llamar
            callbackScope: this,
            loop: false,
        });
    }
    
    decreaseInitialCount(){     // Disminuye el número del contador cada que es llamado
        contadorInicial--;
        contadorInicialTxt.setText(contadorInicial);
        if (contadorInicial > 0){
            this.sonidoConteo.play();
        }

        if (contadorInicial == 0){
            contadorInicialTxt.setText('¡YA!');     // En lugar de un "0" se coloca un "¡YA!" el cual es ligeramente más pequeño
            contadorInicialTxt.setStyle({ fontSize: `225px` });
            inCount = false;        
            initialCountEvent.paused = !inCount;    // Se deja de estar en contador
            this.musicaFondo.play();
            this.time.addEvent({        // Se llama una última vez
                delay: 675,
                callback: this.decreaseInitialCount,
                callbackScope: this,
            });
        } else if (contadorInicial < 0){       
            contadorInicialTxt.setVisible(false);     // Al llamarse por última vez desaparece el "¡YA!"
        }
    }
    
    soundInitialCount(){
        this.sonidoIniciar.play();
    }

    movementPlayer(player){         // Función que detecta los inputs y el movimiento del jugador
        if (player.izquierda.isDown) {      // Detecta inputs cuando va a la izquierda
            player.setVelocityX(-speedPlayers);     // Le asigna su respectiva velocidad
            player.setFlipX(false);     // Flipea o no la imagen
            player.anims.play(player.animMovName, true);    // Activa la animación 

            player.body.setOffset(100, 80);      // Para mejorar la jugabilidad hace el collider más pequeño y asi evitar choques inesperados
        }
        else if (player.derecha.isDown) {       // Detecta input a la derecha y hace el mismo proceso
            player.setVelocityX(speedPlayers);
            player.setFlipX(true);
            player.anims.play(player.animMovName, true);

            player.body.setOffset(300, 80);
        }
        else {      // Detecta cuando no hay inputs y se queda quieto
            player.setVelocityX(0);
            player.setFlipX(false);
            player.anims.play(player.animNoMovName);
            player.body.setOffset(
                (player.width - 300) / 2,
                (player.height - 575) / 2
            );
        }

        this.jumpPlayer(player);
    }

    jumpPlayer(player){     // Función que detecta el salto del jugador
        if (player.body.touching.down){     // Esta condición detecta cuánto tiempo lleva en el aire el player
            player.tiempoEnAire = 0;
        } else {
            player.tiempoEnAire++;          // Al tocar suelo la cuenta se reinicia
        }
        
        if (player.arriba.isDown && !player.jumper && player.onGround){      // Para poder saltar el jugador debe Recién Presionar la tecla de salto,
            player.jumper = true;                                            // tener contacto con un suelo 
            if (player.body.touching.down){                                  // y que el contacto físico sea con los pies del personaje
                player.setVelocityY(-jump);
                player.onGround = false;
            } else {
                if (player.tiempoEnAire < margenSalto){           // En caso de que no haya contacto con un suelo pero si con una plataforma
                    player.setVelocityY(-jump);                   // significará que está cayendo, y se le deja un margen de tiempo para,       
                    player.onGround = false;                      // según cuánto tiempo lleva en el aire, todavía poder saltar
                }                                                 // Esto crea un "Coyote Time", lo que mejora la experiencia de juego
            }
        }
        if (player.arriba.isUp){        // Detecta cuando se suelta la tecla de salto y está disponible para volver a efectuarla
            player.jumper = false;
        }
    }

    onPlayerNoMov(player){      // Función para detectar cuando el player no se está moviendo
        if (!player.body.touching.down || player.body.touching.left || player.body.touching.right || player.body.velocity.x == 0){ // Detecta si está moviendose o tocando una pared quieto
            player.barraMov.cantidad = this.changeNumberPlayer(-1, player, player.contador, player.tiempoPlaying, 0); // Si no se mueve disminuirá la vida
        } else {
            player.barraMov.cantidad = this.changeNumberPlayer(1, player, player.contador, player.tiempoPlaying, 10); // Si se mueve aumentará la vida
        }
    }
    
    changeNumberPlayer(negable_frecuency, player, contador, tiempoP, sumable) {     // Función para aumentar o disminuir la vida
        if (tiempoReal > tiempoP) {     // Si el tiempo que ha pasado es mayor que el tiempo del jugador
            player.contadorAuxP1 = tiempoReal - tiempoP;    // Se obtiene una unidad por la diferencia de tiempos
            tiempoP = tiempoReal;       // Se iguala el tiempo del jugador al tiempo que ha pasado
            player.contadorAuxP1 *= negable_frecuency;      // Se aplica esto según si se necesita aumentar o disminuir
            contador = contador + player.contadorAuxP1 + sumable;       // Se incrementea o decrementa el contador por unidad, 
        }                                                               // el sumable representa que se recupera más rápido de lo que pierde vida

        if ((contador/1000) >= limMax){     // Limita la vida en caso de excederse
            contador = limMax * 1000;       
        } else if ((contador/1000) <= 0){   // Activa los procesos de muerte en caso de que el contador de vida sea 0 o menos
            contador = 0;
            gameOver = true;        // Se terminó el juego
            player.lose = true;     // Determina cual player perdió
            this.animPlayerDead(player, player.nameDead, 0.036);
            this.delaySysVictoria(this.player1, this.player2);
        }

        player.contador = contador;
        player.tiempoPlaying = tiempoP;     // Se reasignan los valores pasados como parámetros

        return contador * limMax / widthMaxBarra;    // Se retorna una regla de 3 donde el ancho Máximo de Barra y el Límite Máximo son el tope
                                                     // y se coloca el equivalente del Contador actual como ancho de la barra
    }                                                

    animPlayerDead(player, name, scale){        // Activa la animación del jugador que pierde
        player.disableBody(true, true);         // Desactiva el cuerpo del personaje
        this.bodyDead = this.physics.add.image(player.x, (player.y - 30), name).setScale(scale);     
        this.bodyDead.setSize(1500, 1450);                                                 // Instancia el sprite de derrota y se le asignan
        this.physics.add.collider(this.bodyDead, this.platforms);                          // propiedades físicas
        this.physics.add.collider(this.bodyDead, this.player1);
        this.physics.add.collider(this.bodyDead, this.player2);
        this.bodyDead.setCollideWorldBounds(true);
        this.bodyDead.body.setMass(1000);
        this.bodyDead.setDrag(2000);
        this.bodyDead.body.gravity.y = 2000;          

        playerDeath++;      // Aumenta el conteo de jugadores muertos iniciando desde el -1

        if (playerDeath == 1){      // Si el conteo es 1 significa que los 2 murieron al mismo tiempo y que hay un empate
            empate = true;
        }
    }

    createPoint() {        // Función para el contador que instancia los puntos por conseguir
        this.time.addEvent({
            delay: intervaloPuntos * 1000, // milisegundos * 1000 = segundos
            callback: this.randomPosPoints, // Funcion por llamar cada determinado tiempo
            callbackScope: this,
            paused: existingPoint, // Criterio para pausar o no el bucle
        });
    }

    randomPosPoints(){      // Se genera un número aleatorio que representará la ubicación del punto por encima de una plataforma
        if (!gameOver){     // Los puntos se seguirán ubicando y posicionando mientras el juego no termine
            let randomPos = Phaser.Math.Between(1, 9);  // Se genera el número aleatorio entre 1 y 9 incluido
            
            if (firstAppear){
                randomPos = Phaser.Math.Between(4, 6);  // El primer punto en aparecer será en alguna parte del centro para que sea más justo
                firstAppear = false;
            }

            let randomPossiblePos = {
                1:{     // Plataforma arriba izquierda
                    ranPosX: 0.13,
                    ranPosY: 0.3,
                },
    
                2:{     // Plataforma medio izquierda
                    ranPosX: 0.13,
                    ranPosY: 0.6,
                },
    
                3:{     // Suelo abajo izquierda
                    ranPosX: 0.13,
                    ranPosY: 0.88,
                },
                4:{     // Plataforma arriba centro
                    ranPosX: 0.5,
                    ranPosY: 0.2,
                },
    
                5:{     // Plataforma medio centro
                    ranPosX: 0.5,
                    ranPosY: 0.45,
                },
    
                6:{     // Plataforma abajo centro
                    ranPosX: 0.5,
                    ranPosY: 0.7,
                },
                7:{     // Plataforma arriba derecha
                    ranPosX: 0.87,
                    ranPosY: 0.3,
                },
    
                8:{     // Plataforma medio derecha
                    ranPosX: 0.87,
                    ranPosY: 0.6,
                },
    
                9:{     // Suelo abajo derecha
                    ranPosX: 0.87,
                    ranPosY: 0.88,
                },
            }
            
            let xR = randomPossiblePos[randomPos].ranPosX;
            let yR = randomPossiblePos[randomPos].ranPosY;
    
            this.pointsAppear(xR, yR); // Se manda la ubicación del punto a manera de coordenadas
        }

    }

    pointsAppear(porcentPosX, porcentPosY) {    // Instancia un nuevo punto
        // Código para instanciar el punto
        let pointPosX = widthScr * porcentPosX;
        let pointPosY = heightScr * porcentPosY;  
        
        existingPoint = true;
        let queso = this.physics.add.sprite(pointPosX, pointPosY, 'queso').setScale(0.25).refreshBody().setSize(200, 250).setDepth(1);
        queso.body.allowGravity = false;

        this.physics.add.overlap(this.player1, queso, this.onCollectPoint, null, this);
        this.physics.add.overlap(this.player2, queso, this.onCollectPoint, null, this);

        queso.anims.play('quesoAnim', true);
    }

    onCollectPoint(player, point){      // Incrementa el puntaje al tocar un punto
        point.destroy();

        if (!gameOver){
            existingPoint = false;
            player.puntaje++;
            player.numeroContador.setText(player.puntaje);
            this.createPoint();
        }
    }

    onTouchPlatformPlayer(player, platforms){   // Detecta cuando se está pisando una plataforma
        if (player.body.touching.down) {
            player.onGround = true;
        }
    }
    
    delaySysVictoria(player1, player2){     // Pequeña diferencia de tiempo entre que ganas y sale el panel de victoria
        this.time.addEvent({
            delay: 2500,
            callback: this.sysVictory,
            args: [player1, player2],
            callbackScope: this
        });
    }

    sysVictory(player1, player2){       // Muestra el panel de victoria con los resultados obtenidos
        canReset = true;
        let player;
        let winTxt = 'Ganador';
        let winImg;
        let winImgScale = 0.21;
        
        if (player1.lose != true){      // Si el que perdió es el 1, se le dará la victoria al 2...
            player = player1;            
        } else {
            player = player2;
        }
        
        if (empate){        // Si mueren al mismo tiempo se busca cual tiene más puntos y ese gana
            if (player1.puntaje != player2.puntaje){
                empate = false;
                if (player1.puntaje > player2.puntaje){
                    player = player1;
                } else {
                    player = player2;
                }
            }
        }

        winImg = player.victoriaImg;

        if (empate){        // En caso de empate total se cambiará el texto y la imagen a una de empate
            winTxt = 'Empate';
            winImg = 'empateImg';
            winImgScale = 0.15;
        }

        this.scene.pause('Pause');  

        if (instancePanWin == 0){
            this.winPanel = {
                fondoNegroPantalla: this.add.graphics().fillStyle(0x000000, 0.3).fillRect(0, 0, widthScr, heightScr).setDepth(10),
    
                fondoPausa: this.add.image(widthScr * 0.5, heightScr * 0.5, 'panel').setDisplaySize(widthScr * 0.66, heightScr * 0.85).setDepth(11),
                
                ganadorTxt: this.add.text(widthScr * 0.5, heightScr * 0.2, winTxt,{
                    fontFamily: 'Japab',
                    fontSize : '45px',
                    fill: '#000000',
                }).setOrigin(0.5).setDepth(12),
    
                spriteGanador: this.add.image(widthScr * 0.5, heightScr * 0.46, winImg).setScale(winImgScale).setDepth(12),
    
                reiniciarBtn: this.add.image(widthScr * 0.35, heightScr * 0.76, 'reiniciarNoPress').setScale(0.23).setDepth(12).setInteractive(),
                
                menuBtn: this.add.image(widthScr * 0.65, heightScr * 0.76, 'menuNoPress').setScale(0.23).setDepth(12).setInteractive(),
            }        
    
            this.winPanel.reiniciarBtn.on('pointerdown', () => this.resetGame());
            this.winPanel.reiniciarBtn.on('pointerover', () => {
                this.winPanel.reiniciarBtn.setTexture('reiniciarPress');
                this.input.setDefaultCursor('pointer');
                this.preSelectBtn.play();
            });
            this.winPanel.reiniciarBtn.on('pointerout', () => {
                this.winPanel.reiniciarBtn.setTexture('reiniciarNoPress');
                this.input.setDefaultCursor('default');
            });
    
            this.winPanel.menuBtn.on('pointerdown', () => this.mainMenu());
            this.winPanel.menuBtn.on('pointerover', () => {
                this.winPanel.menuBtn.setTexture('menuPress');
                this.input.setDefaultCursor('pointer');
                this.preSelectBtn.play();
            });
            this.winPanel.menuBtn.on('pointerout', () => {
                this.winPanel.menuBtn.setTexture('menuNoPress');
                this.input.setDefaultCursor('default');
            });
        }
        instancePanWin++;
    }

    resetGame(){        // Reinicia esta escena
        this.sound.sounds.forEach((audio) => {
            audio.stop();
        });
        this.selectBtn.play();
        this.scene.restart();
    }

    mainMenu(){        // Dirige al menú
        this.sound.sounds.forEach((audio) => {
            audio.stop();
        });
        this.selectBtn.play();
        this.scene.start('Menu');
    }

    creatingAudios(){
        this.sonidoIniciar = this.sound.add('sonidoGong', {loop: false}).setVolume(0.5);
        this.sonidoConteo = this.sound.add('sonidoTambor', {loop: false}).setVolume(0.5);
        this.preSelectBtn = this.sound.add('sonidoPreselectBtn', {loop: false}).setVolume(0.2);
        this.selectBtn = this.sound.add('sonidoSelectBtn', {loop: false}).setVolume(0.9);
        this.musicaFondo = this.sound.add('musicaFondo', {loop: true}).setVolume(0.8);
    }

    creatingPlayers(){     // Función para crear a los jugadores y asignarles sus atributos
        // Crear Player
        this.player1 = this.physics.add.sprite(widthScr * 0.45, heightScr * 0.87, 'player1').setScale(0.18).setDepth(4);
        this.player1.body.setSize(300, 575);
        
        this.player1.name = 'player1';
        this.player1.animMovName = 'movP1';
        this.player1.animNoMovName = 'noMovP1';
        
        // Crear atributos del player respecto al contador de vida
        this.player1.contador = contadorPlayers;
        this.player1.nameDead = 'cabezaTaza';
        this.player1.tiempoPlaying = 0;
        
        // Atributos de salto
        this.player1.onGround = true;
        this.player1.tiempoEnAire = 0;
        this.player1.jumper = false;
        
        // Atributo de teclas de dirección
        this.player1.arriba = this.cursors.w;
        this.player1.abajo = this.cursors.s;
        this.player1.izquierda = this.cursors.a;
        this.player1.derecha = this.cursors.d;
        
        // Asignando la imagen y tamaño de la barra con su respectivo jugador
        this.player1.barraMov = this.add.image(widthScr * 0.05, heightScr * 0.07, 'barraMovP1').setScale(0.55).setDepth(8);
        this.player1.barraMov.cantidad = this.player1.contador * limMax / widthMaxBarra;
        this.player1.barraMov.displayOriginX = 0;
        this.player1.barraMov.displayWidth = this.player1.barraMov.cantidad;
        this.player1.marco = this.add.image(widthScr * 0.005, heightScr * 0.07, 'marcoBarra').setScale(0.5).setDepth(9);
        this.player1.marco.displayOriginX = 0;
        this.player1.marco.setDisplaySize(this.player1.barraMov.displayWidth * 1.28, this.player1.marco.displayHeight);
        this.player1.fondoBarra = this.add.image(widthScr * 0.005, heightScr * 0.07, 'fondoBarra').setScale(0.5).setDepth(7);
        this.player1.fondoBarra.displayOriginX = 0;
        this.player1.fondoBarra.setDisplaySize(this.player1.barraMov.displayWidth * 1.28, this.player1.marco.displayHeight);
        this.player1.icon = this.add.image(widthScr * 0.035, heightScr * 0.1, 'cabezaTaza').setScale(0.045).setDepth(10);


        // Puntos
        this.player1.numeroContador = this.add.text(widthScr * 0.07, heightScr * 0.18, '0',{
            fontFamily: 'Japab',
            fontSize : '75px',
            fill: '#ffffff',
        }).setOrigin(0.5).setDepth(6).setVisible(true);
        this.player1.puntaje = 0;
        
        this.player1.lose = false;
        this.player1.victoriaImg = 'victP1';      
        
        this.player1.setCollideWorldBounds(true);
            
        
        // Creando al segundo player con el mismo proceso que el primero
        this.player2 = this.physics.add.sprite(widthScr * 0.55, heightScr * 0.87, 'player2').setScale(0.18).setDepth(4);
        this.player2.body.setSize(300, 575);
        this.player2.name = 'player2';
        this.player2.animMovName = 'movP2';
        this.player2.animNoMovName = 'noMovP2';  
        
        this.player2.contador = contadorPlayers;
        this.player2.nameDead = 'cabezaPan';
        this.player2.tiempoPlaying = 0;
        
        this.player2.onGround = true;
        this.player2.tiempoEnAire = 0;
        this.player2.jumper = false;
        
        this.player2.arriba = this.cursors.up;
        this.player2.abajo = this.cursors.down;
        this.player2.izquierda = this.cursors.left;
        this.player2.derecha = this.cursors.right;
        
        this.player2.barraMov = this.add.image(widthScr * 0.946, heightScr * 0.07, 'barraMovP2').setScale(0.55).setDepth(8);
        this.player2.barraMov.cantidad = this.player2.contador * limMax / widthMaxBarra;
        this.player2.barraMov.displayOriginX = this.player2.barraMov.width;
        this.player2.barraMov.displayWidth = this.player2.barraMov.cantidad;
        this.player2.marco = this.add.image(widthScr * 0.986, heightScr * 0.07, 'marcoBarra').setScale(0.5).setDepth(9);
        this.player2.marco.displayOriginX = this.player2.marco.width;
        this.player2.marco.setDisplaySize(this.player2.barraMov.displayWidth * 1.28, this.player2.marco.displayHeight);
        this.player2.fondoBarra = this.add.image(widthScr * 0.986, heightScr * 0.07, 'fondoBarra').setScale(0.5).setDepth(7);
        this.player2.fondoBarra.displayOriginX = this.player2.marco.width;
        this.player2.fondoBarra.setDisplaySize(this.player2.barraMov.displayWidth * 1.28, this.player2.marco.displayHeight);
        this.player2.icon = this.add.image(widthScr * 0.965, heightScr * 0.1, 'cabezaPan').setScale(0.045).setDepth(10);
        
        this.player2.numeroContador = this.add.text(widthScr * 0.93, heightScr * 0.18, '0',{
            fontFamily: 'Japab',
            fontSize : '75px',
            fill: '#ffffff',
        }).setOrigin(0.5).setDepth(6).setVisible(true);
        this.player2.puntaje = 0;
        
        this.player2.lose = false;
        this.player2.victoriaImg = 'victP2';
        this.player2.setCollideWorldBounds(true);
    }
    
    creatingPlatforms(){    // Función para crear las plataformas, paredes, suelo y techo
        this.platforms = this.physics.add.group();
        
        // Plataformas Lateral Izquierdo
        this.platforms.create(widthScr * 0.13, heightScr * 0.39, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable().setDepth(1);
        this.platforms.create(widthScr * 0.13, heightScr * 0.69, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable().setDepth(3);
        
        // Plataformas Centrales
        this.platforms.create(widthScr * 0.5, heightScr * 0.29, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.5, heightScr * 0.54, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.5, heightScr * 0.79, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        
        // Plataformas Lateral Derecho
        this.platforms.create(widthScr * 0.87, heightScr * 0.39, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable().setDepth(1);
        this.platforms.create(widthScr * 0.87, heightScr * 0.69, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable().setDepth(3);
        
        // Tamaño de cada plataforma
        this.platforms.children.iterate(function (platform) {
            platform.body.setSize(2575, 300);
        });
        
        this.platforms.create(widthScr * 0.5, heightScr * 0.99, 'pisoDojo').refreshBody().setImmovable().setSize(1920, 88).setOffset(0, 10).setDisplaySize(widthScr * 1.01, heightScr * 0.1).setDepth(3);

        this.platforms.create(widthScr * 0.5, -10, 'pisoDojo').refreshBody().setImmovable().setSize(1920, 88).setOffset(0, -10).setDisplaySize(widthScr * 1.01, heightScr * 0.1).setFlipY(true).setDepth(3);

        this.platforms.create(widthScr * 0.945, heightScr * 0.5, 'dojoParedDer').refreshBody().setImmovable().setSize(125, 1080).setOffset(160, 0).setScale(0.75).setDepth(2);
        this.platforms.create(widthScr * 0.047, heightScr * 0.5, 'dojoParedIzq').refreshBody().setImmovable().setSize(125, 1080).setOffset(-75, 0).setScale(0.75).setDepth(2);
        
        // Quitando gravedad a todas las plataformas
        this.platforms.children.iterate(function (platform) {
            platform.body.allowGravity = false;
        });
        
        // Añadiendo colisiones
        this.physics.add.collider(this.player1, this.platforms, this.onTouchPlatformPlayer, null, this);
        this.physics.add.collider(this.player2, this.platforms, this.onTouchPlatformPlayer, null, this);    
    }

    creatingAnims(){        // Función para crear todas las animaciones usadas en la escena
        if (!this.anims.exists('movP1')) {
            this.anims.create({
                key: 'movP1',
                frames: this.anims.generateFrameNumbers(this.player1.name, {start: 0, end: 7}),
                frameRate: 20,
                repeat: -1,
            });
    
            this.anims.create({
                key: 'noMovP1',
                frames: [{ key: this.player1.name, frame: 8}],
                frameRate: 1,
            });
    
            this.anims.create({
                key: 'movP2',
                frames: this.anims.generateFrameNumbers(this.player2.name, {start: 0, end: 7}),
                frameRate: 20,
                repeat: -1,
            });
    
            this.anims.create({
                key: 'noMovP2',
                frames: [{ key: this.player2.name, frame: 8}],
                frameRate: 1,
            });
            
            this.anims.create({
                key: 'quesoAnim',
                frames: this.anims.generateFrameNumbers('queso', {start: 0, end: 10}),
                frameRate: 17,
                repeat: -1,
            });

        }
        this.player1.anims.play(this.player1.animNoMovName);
        this.player2.anims.play(this.player2.animNoMovName);
    }

}