let widthScr = 1300;
let heightScr = 800;

let speedPlayers = 600;
let gameOver = false;
let playerDeath = -1;

let tiempoP1 = performance.now();
let tiempoP2 = performance.now();
let contadorP1 = 15 * 1000;
let contadorP2 = 15 * 1000;
let contadorAuxP1;
let contadorAuxP2;
let contNumero1 = document.getElementById('num');
let contNumero2 = document.getElementById('num2');

let limMax = 15;
let widthMaxBarra = widthScr * 0.5;

let intervaloPuntos = 5;
let tiempoPuntos = 0;
let auxPuntos;
let tiempoTranscurridoPuntos = 0;
let existingPoint = false;

let platformsScale = 0.12;

export class Game extends Phaser.Scene {    

    constructor(){
        super ({ key: 'game'});
    }
    
    preload(){
        this.load.image('background', 'assets/fondo.jpg');
        this.load.image('point', 'assets/moneda.png');
        this.load.image('player1', 'assets/tazaFrente.png');
        this.load.image('player2', 'assets/panFrente.png');
        this.load.image('deadPlayer1', 'assets/muerteRojo.png');
        this.load.image('deadPlayer2', 'assets/muerteAmarillo.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');
        this.load.image('platform', 'assets/plataforma.png');
        this.load.image('platformDojo', 'assets/fondoPlataformaDojo.png');
        this.load.image('platformaMain', 'assets/fondoPisoTecho.png');
    }
    
    create(){
        this.add.image(widthScr * 0.5, heightScr * 0.5, 'background').setDisplaySize(1300, 800);;

        this.platforms = this.physics.add.group();
        
        // Plataformas Lateral Derecho
        this.platforms.create(widthScr * 0.15, heightScr * 0.3, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.15, heightScr * 0.6, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();

        // Plataformas Centrales
        this.platforms.create(widthScr * 0.5, heightScr * 0.15, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.5, heightScr * 0.45, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.5, heightScr * 0.75, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();

        // Plataformas Lateral Izquierdo
        this.platforms.create(widthScr * 0.85, heightScr * 0.3, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();
        this.platforms.create(widthScr * 0.85, heightScr * 0.6, 'platformDojo').setScale(platformsScale).refreshBody().setImmovable();

        // Tamaño de cada plataforma
        this.platforms.children.iterate(function (platform) {
            //platform.displayWidth = widthScr * 0.6;
            //platform.displayHeight = heightScr * 0.5;
            platform.body.setSize(2600, 300);
        });
        
        this.platforms.create(widthScr * 0.5, heightScr * 0.95, 'platformaMain').setScale(0.18).refreshBody().setImmovable().setSize(7680, 350).setOffset(0, 215);
        
        // Quitando gravedad a todas las plataformas
        this.platforms.children.iterate(function (platform) {
            platform.body.allowGravity = false;
        });

        // Creando grupo de puntos
        this.point = this.physics.add.group();
        

        this.player1 = this.physics.add.image(widthScr * 0.45, heightScr * 0.85, 'player1').setScale(0.06);
        this.player1.body.setSize(1000, 1650);
        this.player2 = this.physics.add.image(widthScr * 0.55, heightScr * 0.85, 'player2').setScale(0.06);
        this.player2.body.setSize(1000, 1650);
        
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);        
        this.physics.add.collider(this.player1, this.border); 
        this.physics.add.collider(this.player2, this.border);
        this.physics.add.collider(this.point, this.platforms);
        this.physics.add.overlap(this.point, this.player1, this.onCollectPoint, null, this);
        this.physics.add.overlap(this.point, this.player2, this.onCollectPoint, null, this);

        this.player1.setCollideWorldBounds(false, true, true, true);
        this.player2.setCollideWorldBounds(false, true, true, true);
        
        this.barraMovP1 = this.add.image(widthScr * 0.05, heightScr * 0.93, 'barraMovP1').setScale(0.55);
        this.barraMovP1.cantidad = contadorP1 * limMax / widthMaxBarra;
        this.barraMovP1.displayOriginX = 0;
        this.barraMovP2 = this.add.image(widthScr * 0.95, heightScr * 0.93, 'barraMovP2').setScale(0.55);
        this.barraMovP2.cantidad = contadorP2 * limMax / widthMaxBarra;
        this.barraMovP2.displayOriginX = this.barraMovP2.width;
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.createPoint();

    }
    
    update(){
        if (!gameOver){
            this.onPlayer1NoMov(this.player1);
            this.onPlayer2NoMov(this.player2);
        }
        this.barraMovP1.setScrollFactor(0);
        this.barraMovP1.displayWidth = this.barraMovP1.cantidad;
        
        this.barraMovP2.setScrollFactor(0);
        this.barraMovP2.displayWidth = this.barraMovP2.cantidad;
        
        contNumero1.textContent = Math.round(contadorP1/100);
        contNumero2.textContent = Math.round(contadorP2/100);
        
        this.movementP1(this.cursors, this.player1);
        this.movementP2(this.cursors, this.player2);
    }

    movementP1(cursors, player1){
        if (cursors.a.isDown) {
            player1.setVelocityX(-speedPlayers);
            player1.setFlipX(false);
        }
        else if (cursors.d.isDown) {
            player1.setVelocityX(speedPlayers);
            player1.setFlipX(true);
        }
        else {
            player1.setVelocityX(0);
            player1.setFlipX(false);
        }
        
        if (cursors.w.isDown && player1.body.touching.down){
            player1.setVelocityY(-700);
        }
        
    }
    
    movementP2(cursors, player2){
        if (cursors.left.isDown) {
            player2.setVelocityX(-speedPlayers);
            player2.setFlipX(false);
        }
        else if (cursors.right.isDown) {
            player2.setVelocityX(speedPlayers);
            player2.setFlipX(true);
        }
        else {
            player2.setVelocityX(0);
            player2.setFlipX(false);
        }
    
        if (cursors.up.isDown && player2.body.touching.down){
            player2.setVelocityY(-700);
        } 
    }
    
    onPlayer1NoMov(player){
        if (!player.body.touching.down || player.body.touching.left || player.body.touching.right || player.body.velocity.x == 0){
            this.changeNumberP1(-1, this.barraMovP1);
        } else {
            this.changeNumberP1(1, this.barraMovP1);
        }
    }
    
    onPlayer2NoMov(player){
        if (!player.body.touching.down || player.body.touching.left || player.body.touching.right || player.body.velocity.x == 0){
            this.changeNumberP2(-1, this.barraMovP2);
        } else {
            this.changeNumberP2(1, this.barraMovP2);
        }
    }
    
    changeNumberP1(negable_frecuency, barraMov) {
        if (performance.now() > tiempoP1) {
            contadorAuxP1 = performance.now() - tiempoP1;
            tiempoP1 = performance.now();
            contadorAuxP1 *= negable_frecuency;
            contadorP1 = contadorP1 + contadorAuxP1;
        }
    
        if ((contadorP1/1000) >= limMax){
            contadorP1 = limMax * 1000;
        } else if ((contadorP1/1000) <= 0){
            contadorP1 = 0;
            gameOver = true
            this.animDead(this.player1, "deadPlayer1", gameOver, 0.1);   
            this.player1.disableBody(true, true);
        }

        barraMov.cantidad = contadorP1 * limMax / widthMaxBarra;
    }
    
    changeNumberP2(negable_frecuency, barraMov) {
        if (performance.now() > tiempoP2) {
            contadorAuxP2 = performance.now() - tiempoP2;
            tiempoP2 = performance.now();
            contadorAuxP2 *= negable_frecuency;
            contadorP2 = contadorP2 + contadorAuxP2;
        }
    
        if ((contadorP2/1000) >= limMax){
            contadorP2 = limMax * 1000;
        } else if ((contadorP2/1000) <= 0){
            contadorP2 = 0;
            gameOver = true
            this.animDead(this.player2, "deadPlayer2", gameOver, 0.5);   
            this.player2.disableBody(true, true);
        }

        barraMov.cantidad = contadorP2 * limMax / widthMaxBarra;
    }

    animDead(player, name, gameOver, scale){
        if (gameOver && (playerDeath == -1 || playerDeath == 0)){
            this.bodyDead = this.physics.add.image(player.x, (player.y - 0.1), name).setScale(scale);
            this.physics.add.collider(this.bodyDead, this.platforms);
            this.physics.add.collider(this.bodyDead, this.player2); 
            this.physics.add.collider(this.bodyDead, this.player1);
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

    pointsAppear(porcentPosX, porcentPosY) {
        // Código para instanciar el objeto
        let pointPosX = widthScr * porcentPosX;
        let pointPosY = heightScr * (porcentPosY + 0.2);        
        this.point.create(pointPosX, pointPosY, 'point').setScale(0.05).refreshBody().setCircle(700, 65, 65);
        //this.point.body.setCircle(50);
        existingPoint = true;
    }

    onCollectPoint(){
        this.point.children.iterate(function (p) {
            p.destroy();
        });
        existingPoint = false;
        this.createPoint();
    }
}


