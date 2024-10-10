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

let limMax = 5;
let widthMaxBarra = 600;

export class Game extends Phaser.Scene {

    constructor(){
        super ({ key: 'game'});
    }
    
    preload(){
        this.load.image('background', 'assets/fondo.jpg');
        this.load.image('player1', 'assets/tazaFrente.png');
        this.load.image('player2', 'assets/panFrente.png');
        this.load.image('deadPlayer1', 'assets/muerteRojo.png');
        this.load.image('deadPlayer2', 'assets/muerteAmarillo.png');
        this.load.image('barraMovP1', 'assets/barraMovP1.png');
        this.load.image('barraMovP2', 'assets/barraMovP2.png');
        this.load.image('platform', 'assets/plataforma.png');
    }
    
    create(){        
        this.add.image(500, 400, 'background');
        
        this.platforms = this.physics.add.group();
        this.platforms.create(200, 500, 'platform').setScale(0.25).refreshBody().setImmovable();
        this.platforms.create(500, 250, 'platform').setScale(0.25).refreshBody().setImmovable();
        this.platforms.create(800, 500, 'platform').setScale(0.25).refreshBody().setImmovable();
        this.platforms.create(500, 750, 'platform').setScale(1.75).refreshBody().setImmovable();
        
        this.platforms.children.iterate(function (platform) {
            platform.body.allowGravity = false;
        });
        
        
        this.player1 = this.physics.add.image(450, 150, 'player1').setScale(0.07);
        this.player1.body.setSize(1000, 1650);
        this.player2 = this.physics.add.image(550, 150, 'player2').setScale(0.07);
        this.player2.body.setSize(1000, 1650);
        
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);        
        
        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);
        
        this.barraMovP1 = this.add.image(50, 750, 'barraMovP1').setScale(0.55);
        this.barraMovP1.cantidad = contadorP1 * limMax / widthMaxBarra;
        this.barraMovP1.displayOriginX = 0;
        this.barraMovP2 = this.add.image(950, 750, 'barraMovP2').setScale(0.55);
        this.barraMovP2.cantidad = contadorP2 * limMax / widthMaxBarra;
        this.barraMovP2.displayOriginX = this.barraMovP2.width;

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.barraMovP1.setScrollFactor(0);
        this.barraMovP1.displayWidth = this.barraMovP1.cantidad;
        
        this.barraMovP2.setScrollFactor(0);
        this.barraMovP2.displayWidth = this.barraMovP2.cantidad;
        
        contNumero1.textContent = Math.round(contadorP1/100);
        contNumero2.textContent = Math.round(contadorP2/100);
        
        this.movementP1(this.cursors, this.player1);
        this.movementP2(this.cursors, this.player2);
        if (!gameOver){
            this.onPlayer1NoMov(this.player1);
            this.onPlayer2NoMov(this.player2);
        }
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


}


