
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            
            debug: true
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update,
        extend: {
            movementP1: movementP1,
            movementP2: movementP2,
        }
    }
};

var game = new Phaser.Game(config);

let speedPlayers = 500;
let playersGravity = 2500;

function preload(){
    this.load.image('background', 'assets/fondo.jpg');
    this.load.spritesheet('player1', 'assets/Rojo.png', {frameWidth: 69, frameHeight: 89});
    this.load.spritesheet('player2', 'assets/Amarillo.png', {frameWidth: 70, frameHeight: 89});
    this.load.image('platform', 'assets/plataforma.png');
}

function create(){
    this.add.image(500, 400, 'background');
    
    let platforms = this.physics.add.staticGroup();
    platforms.create(500, 775, 'platform').setScale(1.35).refreshBody();

    platforms.create(200, 500, 'platform').setScale(0.25).refreshBody();
    platforms.create(500, 250, 'platform').setScale(0.25).refreshBody();
    platforms.create(800, 500, 'platform').setScale(0.25).refreshBody();
    
    player1 = this.physics.add.sprite(450, 150, 'player1').setGravityY(playersGravity);
    player2 = this.physics.add.sprite(550, 150, 'player2').setGravityY(playersGravity);
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);

    this.physics.add.collider(player1, player2);
    console.log(this.physics.add.collider(player1, player2));

    this.physics.add.overlap(player1, player2, onTrigger, null, true)
    cursor = this.input.keyboard.createCursorKeys();
}

function update(){
    
    movementP1();
    movementP2();
}

function movementP1(){
    if (cursor.a.isDown) {
        player1.setVelocityX(-speedPlayers);
    } else if (cursor.d.isDown) {
        player1.setVelocityX(speedPlayers);
    } else {
        player1.setVelocityX(0);
    }

    if (cursor.w.isDown && player1.body.touching.down){
        player1.setVelocityY(-1500);
    }

    if (cursor.s.isDown){
        player1.setVelocityY(2000);
    }
    
}

function movementP2(){
    if (cursor.left.isDown) {
        player2.setVelocityX(-speedPlayers);
    } else if (cursor.right.isDown) {
        player2.setVelocityX(speedPlayers);
    } else {
        player2.setVelocityX(0);
    }

    if (cursor.up.isDown && player2.body.touching.down){
        player2.setVelocityY(-1500);
    }

    if (cursor.down.isDown){
        player2.setVelocityY(2000);
    }   
}

function onTrigger(){
    let parrafo = document.getElementById('pe');
    parrafo.textContent = "Sobrepuestos";
}


