let speedPlayers = 600;

export class Game extends Phaser.Scene {

    constructor(){
        super ({ key: 'game'});
    }
    
    preload(){
        this.load.image('background', 'assets/fondo.jpg');
        this.load.image('player1', 'assets/Rojo.png');
        this.load.image('player2', 'assets/Amarillo.png');
        this.load.image('platform', 'assets/plataforma.png');
    }
    
    create(){
        
        this.add.image(500, 400, 'background');

        this.platforms = this.physics.add.group();
        
        this.platforms.create(200, 500, 'platform').setScale(0.25).refreshBody().setImmovable();
        this.platforms.create(500, 250, 'platform').setScale(0.25).refreshBody().setImmovable();
        this.platforms.create(800, 500, 'platform').setScale(0.25).refreshBody().setImmovable();
        this.platforms.create(500, 775, 'platform').setScale(1.35).refreshBody().setImmovable();
        
        this.platforms.children.iterate(function (platform) {
            platform.body.allowGravity = false;
        });
        
        this.player1 = this.physics.add.image(450, 150, 'player1');
        this.player2 = this.physics.add.image(550, 150, 'player2');

        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        this.physics.add.collider(this.player1, this.player2);

        this.player1.setCollideWorldBounds(true);
        this.player2.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update(){
        if (this.cursors.a.isDown) {
            this.player1.setVelocityX(-speedPlayers);
        }
        else if (this.cursors.d.isDown) {
            this.player1.setVelocityX(speedPlayers);
        }
        else {
            this.player1.setVelocityX(0);
        }
    
        if (this.cursors.w.isDown && this.player1.body.touching.down){
            this.player1.setVelocityY(-500);
        }
        
        
        
        if (this.cursors.left.isDown) {
            this.player2.setVelocityX(-speedPlayers);
        }
        else if (this.cursors.right.isDown) {
            this.player2.setVelocityX(speedPlayers);
        }
        else {
            this.player2.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown && this.player2.body.touching.down){
            this.player2.setVelocityY(-500);
        }


    }
    

}
