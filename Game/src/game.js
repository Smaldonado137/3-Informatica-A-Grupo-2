let widthScr = 1450;
let heightScr = 850;

let speedPlayers = 600;
let jump = 1400;

let margenSalto = 10;

let gameOver;
let playerDeath;

let tiempoReal;

let contadorPlayers = 15 * 1000;

let contNumero1 = document.getElementById('num');
let contNumero2 = document.getElementById('num2');

let limMax = 15;
let widthMaxBarra = widthScr * 0.5;

let intervaloPuntos = 4;
let existingPoint;

let platformsScale = 0.12;

export class Game extends Phaser.Scene {    

    constructor(){
        super({ key: 'Game' });
    }
    
    create(){
        // Estandarizando variables al iniciar la escena
        gameOver = false;
        existingPoint = false;
        tiempoReal = 0;
        playerDeath = -1;

        // Imagen de fondo
        this.add.image(widthScr * 0.5, heightScr * 0.5, 'background').setDisplaySize(widthScr, heightScr);

        // Asignando teclas pulsables
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Creando Jugadores
        this.creatingPlayers();        
        
        // Creando grupo de plataformas
        this.creatingPlatforms();
        
        // Creando grupo de puntos
        this.creatingPoints();
        
        // Sistema de pausa
        this.scene.launch('Pause', { widthScreen: widthScr, heightScreen: heightScr});

    }
    
    update(){
        tiempoReal += 10;

        if (!gameOver){
            this.onPlayerNoMov(this.player1);
            this.onPlayerNoMov(this.player2);
        }

        this.player1.barraMov.setScrollFactor(0);
        this.player1.barraMov.displayWidth = this.player1.barraMov.cantidad;
        
        this.player2.barraMov.setScrollFactor(0);
        this.player2.barraMov.displayWidth = this.player2.barraMov.cantidad;
        
        //contNumero1.textContent = Math.round(this.player1.contador/100);
        //contNumero2.textContent = Math.round(this.player2.contador/100);

        this.movementPlayer(this.player1);
        this.movementPlayer(this.player2);
    }

    movementPlayer(player){        
        if (player.izquierda.isDown) {
            player.setVelocityX(-speedPlayers);
            player.setFlipX(false);
        }
        else if (player.derecha.isDown) {
            player.setVelocityX(speedPlayers);
            player.setFlipX(true);
        }
        else {
            player.setVelocityX(0);
            player.setFlipX(false);
        }

        this.jumpPlayer(player);
    }

    jumpPlayer(player){
        if (player.body.touching.down){
            player.tiempoEnAire = 0;
        } else {
            player.tiempoEnAire++;
        }
        
        if (player.arriba.isDown && !player.jumper && player.onGround){
            player.jumper = true;
            if (player.body.touching.down){
                player.setVelocityY(-jump);
                player.onGround = false;
            } else {
                if (player.tiempoEnAire < margenSalto){
                    player.setVelocityY(-jump);
                    player.onGround = false;
                }
            }
        }
        if (player.arriba.isUp){
            player.jumper = false;
        }
    }

    onPlayerNoMov(player){
        if (!player.body.touching.down || player.body.touching.left || player.body.touching.right || player.body.velocity.x == 0){
            player.barraMov.cantidad = this.changeNumberPlayer(-1, player, player.contador, player.tiempoPlaying);
        } else {
            player.barraMov.cantidad = this.changeNumberPlayer(1, player, player.contador, player.tiempoPlaying);
        }
    }
    
    changeNumberPlayer(negable_frecuency, player, contador, tiempoP) {
        if (tiempoReal > tiempoP) {
            player.contadorAuxP1 = tiempoReal - tiempoP;
            tiempoP = tiempoReal;
            player.contadorAuxP1 *= negable_frecuency;
            contador = contador + player.contadorAuxP1;
        }

        if ((contador/1000) >= limMax){
            contador = limMax * 1000;
        } else if ((contador/1000) <= 0){
            contador = 0;
            gameOver = true;   
            this.animPlayerDead(player, player.nameDead, gameOver, 0.25);   
            player.disableBody(true, true);
        }

        player.contador = contador;
        player.tiempoPlaying = tiempoP;

        return contador * limMax / widthMaxBarra;
    }

    animPlayerDead(player, name, gameOver, scale){
        if (gameOver && (playerDeath == -1 || playerDeath == 0)){
            this.bodyDead = this.physics.add.image(player.x, (player.y - 0.1), name).setScale(scale);
            this.physics.add.collider(this.bodyDead, this.platforms);
            this.physics.add.collider(this.bodyDead, this.player1);
            this.physics.add.collider(this.bodyDead, this.player2); 
            this.bodyDead.setCollideWorldBounds(true);
            this.bodyDead.body.setMass(1000);
            this.bodyDead.setDrag(2000);
            this.bodyDead.body.gravity.y = 2000;            
            playerDeath++;        
        }
    }

    createPoint() {        
        this.time.addEvent({
            delay: intervaloPuntos * 1000, // milisegundos * 1000 = segundos
            callback: this.randomPosPoints, // Funcion por llamar cada determinado tiempo
            callbackScope: this,
            paused: existingPoint, // Criterio para pausar o no el bucle
        });
    }

    randomPosPoints(){
        if (!gameOver){
            let randomPos = Math.floor(Math.random() * 9) + 1;
            let randomPossiblePos = {
                1:{
                    ranPosX: 0.15,
                    ranPosY: 0.0,
                },
    
                2:{
                    ranPosX: 0.15,
                    ranPosY: 0.3,
                },
    
                3:{
                    ranPosX: 0.15,
                    ranPosY: 0.6,
                },
                4:{
                    ranPosX: 0.5,
                    ranPosY: -0.15,
                },
    
                5:{
                    ranPosX: 0.5,
                    ranPosY: 0.15,
                },
    
                6:{
                    ranPosX: 0.5,
                    ranPosY: 0.45,
                },
                7:{
                    ranPosX: 0.85,
                    ranPosY: 0.0,
                },
    
                8:{
                    ranPosX: 0.85,
                    ranPosY: 0.3,
                },
    
                9:{
                    ranPosX: 0.85,
                    ranPosY: 0.6,
                },
            }
            
            let xR = randomPossiblePos[randomPos].ranPosX;
            let yR = randomPossiblePos[randomPos].ranPosY;
    
            this.pointsAppear(xR, yR);
        }

    }

    pointsAppear(porcentPosX, porcentPosY) {
        // Código para instanciar el objeto
        let pointPosX = widthScr * porcentPosX;
        let pointPosY = heightScr * (porcentPosY + 0.2);        
        this.point.create(pointPosX, pointPosY, 'point').setScale(0.05).refreshBody().setCircle(700, 65, 65);
        this.point.setDepth(1);
        existingPoint = true;
    }

    onCollectPoint(player, points){
        this.point.children.iterate(function (p) {
            p.destroy();
        });
        existingPoint = false;
        player.puntaje++;
        player.numeroContador.setText(player.puntaje);
        this.createPoint();
    }

    onTouchPlatformPlayer(player, platforms){
        if (player.body.touching.down) {
            player.onGround = true;
        }
    }

    creatingPlayers(){        
        //this.physics.add.collider(this.player1, this.border); 
        //this.physics.add.collider(this.player2, this.border);

        // Crear Player
        this.player1 = this.physics.add.image(widthScr * 0.45, heightScr * 0.87, 'player1').setScale(0.06);
        this.player1.body.setSize(1000, 1650);
        
        // Crear atributos del player respecto al contador de vida
        this.player1.contador = contadorPlayers;
        this.player1.nameDead = 'deadPlayer1';
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
        this.player1.barraMov = this.add.image(widthScr * 0.05, heightScr * 0.93, 'barraMovP1').setScale(0.55).setDepth(10);
        this.player1.barraMov.cantidad = this.player1.contador * limMax / widthMaxBarra;
        this.player1.barraMov.displayOriginX = 0;
        
        // Puntos
        this.player1.numeroContador = this.add.text(widthScr * 0.1, heightScr * 0.86, '0',{
            fontSize : '50px',
            fill: '#ffffff',
        }).setOrigin(0.5).setDepth(6).setVisible(true);
        this.player1.puntaje = 0;
        
        
        
        // Creando al segundo player con el mismo proceso que el primero
        this.player2 = this.physics.add.image(widthScr * 0.55, heightScr * 0.87, 'player2').setScale(0.06);
        this.player2.body.setSize(1000, 1650);        
        
        this.player2.contador = contadorPlayers;
        this.player2.nameDead = 'deadPlayer2';
        this.player2.tiempoPlaying = 0;
        
        this.player2.onGround = true;
        this.player2.tiempoEnAire = 0;
        this.player2.jumper = false;
        
        this.player2.arriba = this.cursors.up;
        this.player2.abajo = this.cursors.down;
        this.player2.izquierda = this.cursors.left;
        this.player2.derecha = this.cursors.right;
        
        this.player2.barraMov = this.add.image(widthScr * 0.95, heightScr * 0.93, 'barraMovP2').setScale(0.55).setDepth(10);
        this.player2.barraMov.cantidad = this.player2.contador * limMax / widthMaxBarra;
        this.player2.barraMov.displayOriginX = this.player2.barraMov.width;
        
        this.player2.numeroContador = this.add.text(widthScr * 0.9, heightScr * 0.86, '0',{
            fontSize : '50px',
            fill: '#ffffff',
        }).setOrigin(0.5).setDepth(6).setVisible(true);
        this.player2.puntaje = 0;
    }
    
    creatingPlatforms(){
        this.platforms = this.physics.add.group();
        
        // Plataformas Lateral Izquierdo
        this.platforms.create(widthScr * 0.15, heightScr * 0.3, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.15, heightScr * 0.6, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        
        // Plataformas Centrales
        this.platforms.create(widthScr * 0.5, heightScr * 0.15, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.5, heightScr * 0.45, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.5, heightScr * 0.75, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        
        // Plataformas Lateral Derecho
        this.platforms.create(widthScr * 0.85, heightScr * 0.3, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.85, heightScr * 0.6, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        
        // Tamaño de cada plataforma
        this.platforms.children.iterate(function (platform) {
            platform.body.setSize(2575, 300);
        });
        
        this.platforms.create(widthScr * 0.5, heightScr * 0.95, 'platformaMain').refreshBody().setImmovable().setSize(7680, 350).setOffset(0, 215).setDisplaySize(widthScr * 1.01, heightScr * 0.2);
        
        // Quitando gravedad a todas las plataformas
        this.platforms.children.iterate(function (platform) {
            platform.body.allowGravity = false;
        });
        
        // Añadiendo colisiones
        this.physics.add.collider(this.player1, this.platforms, this.onTouchPlatformPlayer, null, this);
        this.physics.add.collider(this.player2, this.platforms, this.onTouchPlatformPlayer, null, this);    
    }

    creatingPoints(){
        this.point = this.physics.add.group({
            allowGravity: false,
        });
        this.physics.add.collider(this.point, this.platforms);
        this.physics.add.overlap(this.player1, this.point, this.onCollectPoint, null, this);
        this.physics.add.overlap(this.player2, this.point, this.onCollectPoint, null, this);
        this.createPoint();
    }
}


